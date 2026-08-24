import type { Metadata } from "next";
import Link from "next/link";
import { Users, IndianRupee, BookOpen, Sparkles } from "lucide-react";
import { getDashboardStats } from "@/lib/data/students";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { StatCard } from "@/components/admin/stat-card";
import { DbErrorBanner } from "@/components/admin/db-error-banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminOverviewPage() {
  let stats: Awaited<ReturnType<typeof getDashboardStats>> | null = null;
  try {
    stats = await getDashboardStats();
  } catch (error) {
    console.error("[admin overview]", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of enrollments, revenue, and course activity.
        </p>
      </div>

      {!stats ? (
        <DbErrorBanner />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Users} label="Total Students" value={stats.totalStudents.toLocaleString("en-IN")} />
            <StatCard icon={IndianRupee} label="Total Revenue" value={formatCurrency(stats.totalRevenue)} />
            <StatCard icon={BookOpen} label="Total Courses" value={String(stats.totalCourses)} />
            <StatCard icon={Sparkles} label="Active Courses" value={String(stats.activeCourses)} />
          </div>

          <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-foreground">Recent Enrollments</h2>
              <Link href="/admin/students" className="text-sm font-medium text-accent hover:underline">
                View all
              </Link>
            </div>

            {stats.recentEnrollments.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                No enrollments yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentEnrollments.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-mono text-xs">{student.studentId}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.course.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            {formatCurrency(student.amount ?? 0)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDateTime(student.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
