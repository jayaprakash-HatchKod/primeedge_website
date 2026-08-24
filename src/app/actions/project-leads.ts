"use server";

import { prisma } from "@/lib/prisma";
import { projectLeadSchema } from "@/lib/validations/project-lead";

export type ProjectLeadActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  telegramLink?: string;
};

export async function submitProjectLead(
  _prev: ProjectLeadActionState,
  formData: FormData,
): Promise<ProjectLeadActionState> {
  const parsed = projectLeadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    college: formData.get("college"),
    branch: formData.get("branch"),
    projectId: formData.get("projectId"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const project = await prisma.project.findUnique({ where: { id: parsed.data.projectId } });
  if (!project) {
    return { status: "error", message: "This project is no longer available." };
  }

  await prisma.projectLead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      mobile: parsed.data.mobile,
      college: parsed.data.college || null,
      branch: parsed.data.branch || null,
      projectId: project.id,
    },
  });

  const telegramLink = process.env.TELEGRAM_PROJECTS_LINK;

  return {
    status: "success",
    message: telegramLink
      ? "You're in! Join the Telegram group below to get the project."
      : "Thanks — our team will reach out with the project shortly.",
    telegramLink,
  };
}
