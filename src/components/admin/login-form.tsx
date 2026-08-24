"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { loginAdmin, type LoginState } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="xl" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" placeholder="admin@primeedge.in" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />
      </div>

      {state.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
