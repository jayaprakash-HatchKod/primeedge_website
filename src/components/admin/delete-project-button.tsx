"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteProject(id);
      toast.success("Project deleted");
    });
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} disabled={pending} aria-label={`Delete ${title}`}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4 text-destructive" />}
    </Button>
  );
}
