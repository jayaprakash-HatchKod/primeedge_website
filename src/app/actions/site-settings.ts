"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteSettingSchema } from "@/lib/validations/site-settings";

export type SiteSettingFormState = { error?: string; success?: boolean };

export async function updateSiteSettings(
  _prev: SiteSettingFormState,
  formData: FormData,
): Promise<SiteSettingFormState> {
  const parsed = siteSettingSchema.safeParse({
    heroVideoUrl: formData.get("heroVideoUrl"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  await prisma.siteSetting.upsert({
    where: { id: "site" },
    create: { id: "site", heroVideoUrl: parsed.data.heroVideoUrl || null },
    update: { heroVideoUrl: parsed.data.heroVideoUrl || null },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}

export async function uploadHeroVideo(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { error: "Invalid upload request" };
  }

  const path = `hero/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const supabase = createAdminClient();

  const { error } = await supabase.storage.from("course-videos").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabase.storage.from("course-videos").getPublicUrl(path);
  return { url: data.publicUrl };
}
