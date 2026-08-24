import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

/** Atomically issues the next Student ID for the current year, e.g. PE-2026-001. */
export async function generateStudentId(tx: Prisma.TransactionClient = prisma): Promise<string> {
  const year = new Date().getFullYear();

  const counter = await tx.studentIdCounter.upsert({
    where: { year },
    create: { year, lastNumber: 1 },
    update: { lastNumber: { increment: 1 } },
  });

  return `PE-${year}-${String(counter.lastNumber).padStart(3, "0")}`;
}

export type StudentFilters = {
  q?: string;
  courseId?: string;
  status?: "pending" | "success" | "failed";
};

function buildStudentWhere(filters: StudentFilters): Prisma.StudentWhereInput {
  const where: Prisma.StudentWhereInput = {};

  if (filters.courseId) where.courseId = filters.courseId;
  if (filters.status) where.paymentStatus = filters.status;
  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: "insensitive" } },
      { email: { contains: filters.q, mode: "insensitive" } },
      { mobile: { contains: filters.q } },
      { studentId: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  return where;
}

export function getStudentsForAdmin(filters: StudentFilters = {}) {
  return prisma.student.findMany({
    where: buildStudentWhere(filters),
    orderBy: { createdAt: "desc" },
    include: { course: { select: { title: true } } },
  });
}

export async function getStudentByPaymentId(paymentId: string) {
  try {
    return await prisma.student.findFirst({
      where: { paymentId },
      include: { course: true },
    });
  } catch (error) {
    console.error("[data/students]", error);
    return null;
  }
}

export async function getDashboardStats() {
  const [totalStudents, totalCourses, activeCourses, revenue, recent] = await Promise.all([
    prisma.student.count({ where: { paymentStatus: "success" } }),
    prisma.course.count(),
    prisma.course.count({ where: { isActive: true } }),
    prisma.student.aggregate({
      where: { paymentStatus: "success" },
      _sum: { amount: true },
    }),
    prisma.student.findMany({
      where: { paymentStatus: "success" },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { course: { select: { title: true } } },
    }),
  ]);

  return {
    totalStudents,
    totalCourses,
    activeCourses,
    totalRevenue: revenue._sum.amount ?? 0,
    recentEnrollments: recent,
  };
}
