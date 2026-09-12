import { prisma } from "@/lib/prisma";
import type { SiteSetting } from "@prisma/client";

/** Read-path calls fail soft (null) so the site renders before the DB is connected. */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[data/site-settings]", error);
    return fallback;
  }
}

export function getSiteSettings(): Promise<SiteSetting | null> {
  return safe(() => prisma.siteSetting.findUnique({ where: { id: "site" } }), null);
}
