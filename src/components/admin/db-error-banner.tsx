import { DatabaseZap } from "lucide-react";

export function DbErrorBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-card p-6">
      <DatabaseZap className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
      <div>
        <p className="text-sm font-semibold text-foreground">Database not connected</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add <code className="rounded bg-muted px-1 py-0.5 text-xs">DATABASE_URL</code> and your
          Supabase keys to <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>,
          then run <code className="rounded bg-muted px-1 py-0.5 text-xs">npx prisma migrate deploy</code> and
          reload this page.
        </p>
      </div>
    </div>
  );
}
