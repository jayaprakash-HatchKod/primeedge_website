import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getStudentsForAdmin } from "@/lib/data/students";
import { formatDateTime } from "@/lib/format";

function escapeCsv(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const students = await getStudentsForAdmin({
    q: searchParams.get("q") ?? undefined,
    courseId: searchParams.get("courseId") ?? undefined,
    status: (searchParams.get("status") as "pending" | "success" | "failed" | null) ?? undefined,
  });

  const header = [
    "Student ID",
    "Name",
    "Email",
    "Mobile",
    "City",
    "University",
    "College",
    "Branch",
    "Course",
    "Payment Status",
    "Amount",
    "Payment ID",
    "Date",
  ];

  const rows = students.map((s) =>
    [
      s.studentId,
      s.name,
      s.email,
      s.mobile,
      s.city,
      s.university ?? "",
      s.college ?? "",
      s.branch ?? "",
      s.course.title,
      s.paymentStatus,
      String(s.amount ?? ""),
      s.paymentId ?? "",
      formatDateTime(s.createdAt),
    ]
      .map((cell) => escapeCsv(cell))
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="primeedge-students-${Date.now()}.csv"`,
    },
  });
}
