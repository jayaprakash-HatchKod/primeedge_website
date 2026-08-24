"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { submitContactForm, type ContactActionState } from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState: ContactActionState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="xl" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.status === "success" && state.message) toast.success(state.message);
    if (state.status === "error" && state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile Number</Label>
          <Input
            id="phone"
            name="phone"
            required
            inputMode="numeric"
            autoComplete="tel"
            placeholder="98765 43210"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us which course you're interested in, or what you'd like to know."
        />
      </div>

      <SubmitButton />
    </form>
  );
}
