"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { Project } from "@prisma/client";
import { createProject, updateProject, type ProjectFormState } from "@/app/actions/projects";
import { ProjectAssetUploadField } from "@/components/admin/project-asset-upload-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const initialState: ProjectFormState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="xl" disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Saving..." : label}
    </Button>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" name="title" required defaultValue={project?.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required placeholder="smart-attendance-system" defaultValue={project?.slug} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={4} defaultValue={project?.description} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="techStack">Tech Stack (one per line)</Label>
        <Textarea
          id="techStack"
          name="techStack"
          rows={4}
          defaultValue={project?.techStack.join("\n")}
          placeholder={"React\nNode.js\nMongoDB"}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" placeholder="Web Development" defaultValue={project?.category ?? ""} />
        </div>
        <ProjectAssetUploadField name="thumbnail" label="Thumbnail Image" defaultValue={project?.thumbnail} accept="image/*" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="demoLink">Demo Link (video or live URL)</Label>
        <Input id="demoLink" name="demoLink" placeholder="https://..." defaultValue={project?.demoLink ?? ""} />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <input type="checkbox" name="isActive" defaultChecked={project?.isActive ?? true} className="size-4 rounded border-border" />
        Published (visible to students)
      </label>

      {state.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <SubmitButton label={project ? "Save Changes" : "Create Project"} />
    </form>
  );
}
