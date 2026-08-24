import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(140),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  description: z.string().trim().min(20, "Add a longer description"),
  techStack: z.array(z.string().trim().min(1)).max(15).default([]),
  category: z.string().trim().max(60).optional().or(z.literal("")),
  thumbnail: z.string().trim().url().optional().or(z.literal("")),
  demoLink: z.string().trim().url().optional().or(z.literal("")),
  isActive: z.coerce.boolean().default(true),
});

export type ProjectInput = z.infer<typeof projectSchema>;
