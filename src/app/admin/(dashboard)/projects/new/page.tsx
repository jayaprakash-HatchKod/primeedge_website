import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Add Project" };

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Add Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create a new sample project listing.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-7">
        <ProjectForm />
      </div>
    </div>
  );
}
