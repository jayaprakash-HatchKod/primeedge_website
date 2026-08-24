import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/data/courses";
import { CourseForm } from "@/components/admin/course-form";

export const metadata: Metadata = { title: "Edit Course" };

type Props = { params: Promise<{ id: string }> };

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Edit Course</h1>
        <p className="mt-1 text-sm text-muted-foreground">{course.title}</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-7">
        <CourseForm course={course} />
      </div>
    </div>
  );
}
