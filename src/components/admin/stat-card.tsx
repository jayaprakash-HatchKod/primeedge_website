import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="size-4.5" aria-hidden />
        </div>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
    </div>
  );
}
