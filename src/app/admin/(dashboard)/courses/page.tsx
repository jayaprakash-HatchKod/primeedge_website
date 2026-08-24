import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, BookOpen } from "lucide-react";
import { getAllCoursesForAdmin } from "@/lib/data/courses";
import { formatCurrency } from "@/lib/format";
import { DbErrorBanner } from "@/components/admin/db-error-banner";
import { DeleteCourseButton } from "@/components/admin/delete-course-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Courses" };

export default async function AdminCoursesPage() {
  let courses: Awaited<ReturnType<typeof getAllCoursesForAdmin>> | null = null;
  try {
    courses = await getAllCoursesForAdmin();
  } catch (error) {
    console.error("[admin courses]", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Courses</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your course catalog.</p>
        </div>
        <Button asChild variant="accent" size="lg">
          <Link href="/admin/courses/new">
            <Plus className="size-4" /> Add Course
          </Link>
        </Button>
      </div>

      {!courses ? (
        <DbErrorBanner />
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <BookOpen className="size-9 text-muted-foreground" aria-hidden />
          <p className="mt-4 font-medium text-foreground">No courses yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add your first course to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{formatCurrency(course.price)}</TableCell>
                  <TableCell>{course._count.students}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={course.isActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                      {course.isActive ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button asChild variant="ghost" size="icon" aria-label={`Edit ${course.title}`}>
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <DeleteCourseButton id={course.id} title={course.title} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
