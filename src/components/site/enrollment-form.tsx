"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import type { Course } from "@prisma/client";
import { enrollmentSchema, type EnrollmentInput } from "@/lib/validations/enrollment";
import { formatCurrency } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RazorpaySuccessResponse } from "@/types/razorpay";

// Dev-only bypass for testing before the client has a real Razorpay account.
// Must be unset (or "false") before accepting real payments.
const MOCK_MODE = process.env.NEXT_PUBLIC_PAYMENTS_MOCK_MODE === "true";

export function EnrollmentForm({
  courses,
  preselectedCourseId,
}: {
  courses: Course[];
  preselectedCourseId?: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnrollmentInput>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      courseId: preselectedCourseId ?? courses[0]?.id ?? "",
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      university: "",
      college: "",
      branch: "",
      qualification: "",
    },
  });

  const selectedCourseId = watch("courseId");
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  async function confirmPayment(response: RazorpaySuccessResponse, values: EnrollmentInput) {
    try {
      const verifyRes = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...response, enrollment: values }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        toast.error(verifyData.error ?? "Payment verification failed.");
        setSubmitting(false);
        return;
      }

      router.push(`/enrollment/success?paymentId=${verifyData.paymentId}`);
    } catch {
      toast.error("Something went wrong while confirming your payment.");
      setSubmitting(false);
    }
  }

  async function onSubmit(values: EnrollmentInput) {
    if (!MOCK_MODE && !scriptReady) {
      toast.error("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    setSubmitting(true);
    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: values.courseId }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        toast.error(orderData.error ?? "Could not start payment. Please try again.");
        setSubmitting(false);
        return;
      }

      if (MOCK_MODE) {
        toast("Test mode: skipping real Razorpay checkout.");
        await confirmPayment(
          {
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `mock_pay_${Date.now()}`,
            razorpay_signature: "mock_signature",
          },
          values,
        );
        return;
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PrimeEdge Software Institute",
        description: orderData.courseName,
        order_id: orderData.orderId,
        prefill: {
          name: values.fullName,
          email: values.email,
          contact: values.mobile,
        },
        theme: { color: "#2563EB" },
        handler: (response: RazorpaySuccessResponse) => confirmPayment(response, values),
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });

      razorpay.open();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      {!MOCK_MODE && (
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          onLoad={() => setScriptReady(true)}
          strategy="lazyOnload"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="courseId">Course</Label>
          <Select
            value={selectedCourseId}
            onValueChange={(value) => setValue("courseId", value ?? "", { shouldValidate: true })}
          >
            <SelectTrigger id="courseId" className="w-full">
              <SelectValue placeholder="Select a course">
                {() =>
                  selectedCourse
                    ? `${selectedCourse.title} — ${formatCurrency(selectedCourse.price)}`
                    : "Select a course"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title} — {formatCurrency(course.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.courseId && <p className="text-sm text-destructive">{errors.courseId.message}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" autoComplete="name" placeholder="Your full name" {...register("fullName")} />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="98765 43210"
              {...register("mobile")}
            />
            {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input id="university" placeholder="JNTU Hyderabad" {...register("university")} />
            {errors.university && <p className="text-sm text-destructive">{errors.university.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="college">College</Label>
            <Input id="college" placeholder="Your college name" {...register("college")} />
            {errors.college && <p className="text-sm text-destructive">{errors.college.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="branch">Branch / Field of Study</Label>
            <Input id="branch" placeholder="CSE, ECE, MBA, etc." {...register("branch")} />
            {errors.branch && <p className="text-sm text-destructive">{errors.branch.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" autoComplete="address-level2" placeholder="Bengaluru" {...register("city")} />
            {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="qualification">Highest Qualification (optional)</Label>
          <Input id="qualification" placeholder="B.Tech, B.Sc, etc." {...register("qualification")} />
        </div>

        {selectedCourse && (
          <div className="flex items-center justify-between rounded-xl bg-muted px-5 py-4">
            <span className="text-sm font-medium text-foreground">{selectedCourse.title}</span>
            <span className="text-lg font-semibold text-foreground">
              {formatCurrency(selectedCourse.price)}
            </span>
          </div>
        )}

        <Button type="submit" variant="accent" size="xl" className="w-full" disabled={submitting}>
          {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
          {submitting ? "Processing..." : "Proceed to Payment"}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" aria-hidden />
          Secured by Razorpay — cards, UPI, netbanking & wallets accepted
        </p>
      </form>
    </>
  );
}
