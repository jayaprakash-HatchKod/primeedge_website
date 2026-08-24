import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      href={`/final-year-projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.18)] focus-visible:-translate-y-1 focus-visible:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            priority={index < 3}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No thumbnail
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {project.category && (
          <span className="text-xs font-medium text-muted-foreground">{project.category}</span>
        )}

        <h3 className="text-lg font-semibold tracking-tight text-foreground">{project.title}</h3>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="bg-muted font-semibold text-foreground">
            Sample Project
          </Badge>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
            View details
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
