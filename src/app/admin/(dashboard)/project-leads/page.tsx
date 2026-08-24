import type { Metadata } from "next";
import { Users } from "lucide-react";
import { getProjectLeadsForAdmin } from "@/lib/data/projects";
import { DbErrorBanner } from "@/components/admin/db-error-banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Project Leads" };

export default async function AdminProjectLeadsPage() {
  let leads: Awaited<ReturnType<typeof getProjectLeadsForAdmin>> | null = null;
  try {
    leads = await getProjectLeadsForAdmin();
  } catch (error) {
    console.error("[admin project-leads]", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Project Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Students who requested a sample project — follow up and add them to the delivery group.
        </p>
      </div>

      {!leads ? (
        <DbErrorBanner />
      ) : leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <Users className="size-9 text-muted-foreground" aria-hidden />
          <p className="mt-4 font-medium text-foreground">No leads yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Requests submitted on the Projects page will show up here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>College / Branch</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Requested</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{lead.email}</div>
                    <div className="text-sm text-muted-foreground">{lead.mobile}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{lead.college || "—"}</div>
                    <div className="text-sm text-muted-foreground">{lead.branch || "—"}</div>
                  </TableCell>
                  <TableCell>{lead.project.title}</TableCell>
                  <TableCell>{lead.createdAt.toLocaleDateString("en-IN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
