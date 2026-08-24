import type { MetadataRoute } from "next";
import { getActiveCourses } from "@/lib/data/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primeedge.example.com";
  const courses = await getActiveCourses();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/courses`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${siteUrl}/courses/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];
}
