"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { courseSchema } from "@/lib/validations/course";

export type CourseFormState = { error?: string };

const ASSET_BUCKETS = {
  thumbnail: "course-thumbnails",
  trainerAvatar: "course-thumbnails",
  demoVideo1: "course-videos",
  demoVideo2: "course-videos",
  syllabusPdf: "course-syllabus",
} as const;

function parseCourseForm(formData: FormData) {
  return courseSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    highlights: String(formData.get("highlights") ?? "")
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean),
    duration: formData.get("duration"),
    price: formData.get("price"),
    thumbnail: formData.get("thumbnail"),
    demoVideo1: formData.get("demoVideo1"),
    demoVideo2: formData.get("demoVideo2"),
    syllabusPdf: formData.get("syllabusPdf"),
    trainerName: formData.get("trainerName"),
    trainerBio: formData.get("trainerBio"),
    trainerAvatar: formData.get("trainerAvatar"),
    isActive: formData.get("isActive") === "on",
  });
}

export async function createCourse(_prev: CourseFormState, formData: FormData): Promise<CourseFormState> {
  const parsed = parseCourseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    await prisma.course.create({ data: parsed.data });
  } catch {
    return { error: "A course with this slug already exists." };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}

export async function updateCourse(
  id: string,
  _prev: CourseFormState,
  formData: FormData,
): Promise<CourseFormState> {
  const parsed = parseCourseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    await prisma.course.update({ where: { id }, data: parsed.data });
  } catch {
    return { error: "Could not update course. The slug may already be in use." };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${parsed.data.slug}`);
  redirect("/admin/courses");
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function uploadCourseAsset(formData: FormData) {
  const file = formData.get("file") as File | null;
  const field = formData.get("field") as keyof typeof ASSET_BUCKETS | null;

  if (!file || !field || !(field in ASSET_BUCKETS)) {
    return { error: "Invalid upload request" };
  }

  const bucket = ASSET_BUCKETS[field];
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const supabase = createAdminClient();

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl };
}
