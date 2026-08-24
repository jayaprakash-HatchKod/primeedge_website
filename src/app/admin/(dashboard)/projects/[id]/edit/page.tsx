import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data/projects";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Edit Project" };

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Edit Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">{project.title}</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-7">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
