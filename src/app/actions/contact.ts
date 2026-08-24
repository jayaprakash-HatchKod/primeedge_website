"use server";

import { contactSchema } from "@/lib/validations/contact";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// The institute team follows up manually (email / call), so this action only
// validates and logs the enquiry — wire in an email provider (e.g. Resend)
// here when one is available.
export async function submitContactForm(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  console.log("[contact enquiry]", parsed.data);

  return {
    status: "success",
    message: "Thanks for reaching out — our team will get back to you within 24 hours.",
  };
}
