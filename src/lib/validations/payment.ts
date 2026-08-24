import { z } from "zod";
import { enrollmentSchema } from "@/lib/validations/enrollment";

export const createOrderSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  enrollment: enrollmentSchema,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
