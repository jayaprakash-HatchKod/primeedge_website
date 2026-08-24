import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

/** Read-path calls fail soft (empty result) so the site renders before the DB is connected. */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[data/projects]", error);
    return fallback;
  }
}

export function getActiveProjects(): Promise<Project[]> {
  return safe(
    () =>
      prisma.project.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      }),
    [],
  );
}

export function getProjectBySlug(slug: string): Promise<Project | null> {
  return safe(
    () =>
      prisma.project.findFirst({
        where: { slug, isActive: true },
      }),
    null,
  );
}

export function getAllProjectsForAdmin() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { leads: true } } },
  });
}

export function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export function getProjectLeadsForAdmin() {
  return prisma.projectLead.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { title: true } } },
  });
}
