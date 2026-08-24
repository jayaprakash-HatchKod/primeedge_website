import type { Metadata } from "next";
import { CourseForm } from "@/components/admin/course-form";

export const metadata: Metadata = { title: "Add Course" };

export default function NewCoursePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Add Course</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create a new course listing.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-7">
        <CourseForm />
      </div>
    </div>
  );
}
