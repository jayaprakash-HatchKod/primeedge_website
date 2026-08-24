import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpayInstance } from "@/lib/razorpay";
import { createOrderSchema } from "@/lib/validations/payment";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const course = await prisma.course.findFirst({
    where: { id: parsed.data.courseId, isActive: true },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // Dev-only bypass for testing before the client has a real Razorpay account.
  // Must be unset (or "false") before accepting real payments.
  if (process.env.NEXT_PUBLIC_PAYMENTS_MOCK_MODE === "true") {
    return NextResponse.json({
      orderId: `mock_order_${Date.now()}`,
      amount: course.price * 100,
      currency: "INR",
      keyId: "mock",
      courseName: course.title,
    });
  }

  try {
    const order = await getRazorpayInstance().orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt: `pe_${course.slug}_${Date.now()}`,
      notes: { courseId: course.id, courseSlug: course.slug },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      courseName: course.title,
    });
  } catch (error) {
    console.error("[api/orders]", error);
    return NextResponse.json({ error: "Unable to create payment order" }, { status: 502 });
  }
}
