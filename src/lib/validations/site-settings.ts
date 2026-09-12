import { z } from "zod";

export const siteSettingSchema = z.object({
  heroVideoUrl: z.string().trim().url().optional().or(z.literal("")),
});

export type SiteSettingInput = z.infer<typeof siteSettingSchema>;
