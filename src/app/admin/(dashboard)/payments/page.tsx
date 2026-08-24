import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { getStudentsForAdmin } from "@/lib/data/students";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { DbErrorBanner } from "@/components/admin/db-error-banner";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Payments" };

const statusStyles: Record<string, string> = {
  success: "bg-success/10 text-success",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-destructive/10 text-destructive",
};

export default async function AdminPaymentsPage() {
  let students: Awaited<ReturnType<typeof getStudentsForAdmin>> | null = null;
  try {
    students = await getStudentsForAdmin();
  } catch (error) {
    console.error("[admin payments]", error);
  }

  const payments = students?.filter((s) => s.paymentId) ?? null;
  const totalRevenue = payments
    ?.filter((p) => p.paymentStatus === "success")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {payments ? `${formatCurrency(totalRevenue ?? 0)} collected across ${payments.length} transaction${payments.length === 1 ? "" : "s"}` : "—"}
        </p>
      </div>

      {!payments ? (
        <DbErrorBanner />
      ) : payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <CreditCard className="size-9 text-muted-foreground" aria-hidden />
          <p className="mt-4 font-medium text-foreground">No payments yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Payments will appear here once students enroll.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.paymentId}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.course.title}</TableCell>
                  <TableCell>{formatCurrency(p.amount ?? 0)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusStyles[p.paymentStatus]}>
                      {p.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(p.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
