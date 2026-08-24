"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { submitProjectLead, type ProjectLeadActionState } from "@/app/actions/project-leads";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState: ProjectLeadActionState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="xl" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
      {pending ? "Submitting..." : "Get This Project"}
    </Button>
  );
}

export function ProjectLeadForm({ projectId }: { projectId: string }) {
  const [state, formAction] = useActionState(submitProjectLead, initialState);

  useEffect(() => {
    if (state.status === "error" && state.message) toast.error(state.message);
  }, [state]);

  return (
    <div className="space-y-5">
      <form action={formAction} className="space-y-5" noValidate>
        <input type="hidden" name="projectId" value={projectId} />

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            name="mobile"
            required
            inputMode="numeric"
            autoComplete="tel"
            placeholder="98765 43210"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="college">College</Label>
            <Input id="college" name="college" placeholder="Your college name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Input id="branch" name="branch" placeholder="CSE / ECE / IT..." />
          </div>
        </div>

        <SubmitButton />
      </form>

      {state.status === "success" && (
        <div className="rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
          <p>{state.message}</p>
          {state.telegramLink && (
            <Button asChild variant="accent" size="lg" className="mt-3 w-full">
              <a href={state.telegramLink} target="_blank" rel="noopener noreferrer">
                Join Telegram Group
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
