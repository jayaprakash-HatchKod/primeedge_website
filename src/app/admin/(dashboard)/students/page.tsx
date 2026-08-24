import type { Metadata } from "next";
import { Users, Download } from "lucide-react";
import { getStudentsForAdmin } from "@/lib/data/students";
import { getCourseFilterOptions } from "@/lib/data/courses";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { DbErrorBanner } from "@/components/admin/db-error-banner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Students" };

const statusStyles: Record<string, string> = {
  success: "bg-success/10 text-success",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-destructive/10 text-destructive",
};

type Props = {
  searchParams: Promise<{ q?: string; courseId?: string; status?: string }>;
};

export default async function AdminStudentsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const courseId = params.courseId && params.courseId !== "all" ? params.courseId : "";
  const rawStatus = params.status && params.status !== "all" ? params.status : undefined;
  const status = rawStatus as "pending" | "success" | "failed" | undefined;

  let students: Awaited<ReturnType<typeof getStudentsForAdmin>> | null = null;
  let courses: Awaited<ReturnType<typeof getCourseFilterOptions>> = [];

  try {
    [students, courses] = await Promise.all([
      getStudentsForAdmin({ q: q || undefined, courseId: courseId || undefined, status }),
      getCourseFilterOptions(),
    ]);
  } catch (error) {
    console.error("[admin students]", error);
  }

  const exportQuery = new URLSearchParams();
  if (q) exportQuery.set("q", q);
  if (courseId) exportQuery.set("courseId", courseId);
  if (status) exportQuery.set("status", status);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Students</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {students ? `${students.length} student${students.length === 1 ? "" : "s"}` : "—"}
          </p>
        </div>
        <Button asChild variant="outline" size="lg">
          <a href={`/api/admin/students/export?${exportQuery.toString()}`}>
            <Download className="size-4" /> Export CSV
          </a>
        </Button>
      </div>

      <form className="flex flex-wrap gap-3" method="get">
        <Input name="q" defaultValue={q} placeholder="Search name, email, mobile, or Student ID" className="max-w-xs" />
        <select
          name="courseId"
          defaultValue={courseId || "all"}
          className="h-8 w-[200px] rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="all">All courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status || "all"}
          className="h-8 w-[160px] rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="all">All statuses</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <Button type="submit" variant="secondary">
          Apply Filters
        </Button>
      </form>

      {!students ? (
        <DbErrorBanner />
      ) : students.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <Users className="size-9 text-muted-foreground" aria-hidden />
          <p className="mt-4 font-medium text-foreground">No students found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>College / Branch</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-mono text-xs">{student.studentId}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.email}</TableCell>
                  <TableCell className="text-muted-foreground">{student.mobile}</TableCell>
                  <TableCell>
                    <div className="text-sm">{student.college || "—"}</div>
                    <div className="text-xs text-muted-foreground">
                      {[student.branch, student.university].filter(Boolean).join(" · ") || "—"}
                    </div>
                  </TableCell>
                  <TableCell>{student.course.title}</TableCell>
                  <TableCell>{formatCurrency(student.amount ?? 0)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusStyles[student.paymentStatus]}>
                      {student.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(student.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
