import { prisma } from "@/lib/prisma";
import type { Course } from "@prisma/client";

/** Read-path calls fail soft (empty result) so the site renders before the DB is connected. */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[data/courses]", error);
    return fallback;
  }
}

export function getActiveCourses(): Promise<Course[]> {
  return safe(
    () =>
      prisma.course.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      }),
    [],
  );
}

export function getFeaturedCourses(limit = 3): Promise<Course[]> {
  return safe(
    () =>
      prisma.course.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
    [],
  );
}

export function getCourseBySlug(slug: string): Promise<Course | null> {
  return safe(
    () =>
      prisma.course.findFirst({
        where: { slug, isActive: true },
      }),
    null,
  );
}

export function getAllCoursesForAdmin() {
  return prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { students: true } } },
  });
}

export function getCourseById(id: string) {
  return prisma.course.findUnique({ where: { id } });
}

export function getCourseFilterOptions() {
  return prisma.course.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });
}
