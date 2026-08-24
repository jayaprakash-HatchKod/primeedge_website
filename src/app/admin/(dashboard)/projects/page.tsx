import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, FolderKanban } from "lucide-react";
import { getAllProjectsForAdmin } from "@/lib/data/projects";
import { DbErrorBanner } from "@/components/admin/db-error-banner";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  let projects: Awaited<ReturnType<typeof getAllProjectsForAdmin>> | null = null;
  try {
    projects = await getAllProjectsForAdmin();
  } catch (error) {
    console.error("[admin projects]", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sample final-year projects for BTECH 4th-year students.
          </p>
        </div>
        <Button asChild variant="accent" size="lg">
          <Link href="/admin/projects/new">
            <Plus className="size-4" /> Add Project
          </Link>
        </Button>
      </div>

      {!projects ? (
        <DbErrorBanner />
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <FolderKanban className="size-9 text-muted-foreground" aria-hidden />
          <p className="mt-4 font-medium text-foreground">No projects yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add your first sample project to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category || "—"}</TableCell>
                  <TableCell>{project._count.leads}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={project.isActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                      {project.isActive ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button asChild variant="ghost" size="icon" aria-label={`Edit ${project.title}`}>
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <DeleteProjectButton id={project.id} title={project.title} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
