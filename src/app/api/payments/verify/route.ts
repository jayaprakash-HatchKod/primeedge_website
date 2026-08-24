import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpayInstance } from "@/lib/razorpay";
import { generateStudentId } from "@/lib/data/students";
import { verifyPaymentSchema } from "@/lib/validations/payment";
import { sendEnrollmentConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = verifyPaymentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, enrollment } = parsed.data;

  // Dev-only bypass for testing before the client has a real Razorpay account.
  // Must be unset (or "false") before accepting real payments.
  const mockMode = process.env.NEXT_PUBLIC_PAYMENTS_MOCK_MODE === "true";

  if (!mockMode) {
    const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }
  }

  const course = await prisma.course.findUnique({ where: { id: enrollment.courseId } });
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  if (!mockMode) {
    // Re-confirm the order against Razorpay so a tampered client payload can't
    // shortcut the amount charged or the order it was charged against.
    const order = await getRazorpayInstance().orders.fetch(razorpay_order_id);
    if (order.status !== "paid" || Number(order.amount) !== course.price * 100) {
      return NextResponse.json({ error: "Payment could not be confirmed" }, { status: 400 });
    }
  }

  const existing = await prisma.student.findFirst({ where: { paymentId: razorpay_payment_id } });
  if (existing) {
    return NextResponse.json({ studentId: existing.studentId, paymentId: existing.paymentId });
  }

  const student = await prisma.$transaction(async (tx) => {
    const studentId = await generateStudentId(tx);
    return tx.student.create({
      data: {
        studentId,
        name: enrollment.fullName,
        email: enrollment.email,
        mobile: enrollment.mobile,
        city: enrollment.city,
        university: enrollment.university,
        college: enrollment.college,
        branch: enrollment.branch,
        qualification: enrollment.qualification || null,
        courseId: course.id,
        razorpayOrderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        paymentStatus: "success",
        amount: course.price,
      },
    });
  });

  // Best-effort — a failed email must never fail an already-successful payment.
  await sendEnrollmentConfirmationEmail({
    to: student.email,
    studentName: student.name,
    courseName: course.title,
    studentId: student.studentId,
    paymentId: student.paymentId!,
    amount: student.amount!,
  });

  return NextResponse.json({ studentId: student.studentId, paymentId: student.paymentId });
}
