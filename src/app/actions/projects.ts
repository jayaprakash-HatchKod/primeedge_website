"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { projectSchema } from "@/lib/validations/project";

export type ProjectFormState = { error?: string };

const ASSET_BUCKETS = {
  thumbnail: "course-thumbnails",
} as const;

function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    techStack: String(formData.get("techStack") ?? "")
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean),
    category: formData.get("category"),
    thumbnail: formData.get("thumbnail"),
    demoLink: formData.get("demoLink"),
    isActive: formData.get("isActive") === "on",
  });
}

export async function createProject(_prev: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    await prisma.project.create({ data: parsed.data });
  } catch {
    return { error: "A project with this slug already exists." };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/final-year-projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    await prisma.project.update({ where: { id }, data: parsed.data });
  } catch {
    return { error: "Could not update project. The slug may already be in use." };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/final-year-projects");
  revalidatePath(`/final-year-projects/${parsed.data.slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/final-year-projects");
}

export async function uploadProjectAsset(formData: FormData) {
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
