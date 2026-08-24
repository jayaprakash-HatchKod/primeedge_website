import type { Metadata } from "next";
import { Logo } from "@/components/site/logo";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <h1 className="text-xl font-semibold text-foreground">Admin Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Restricted access. Authorized administrators only.
          </p>
          <div className="mt-6">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
