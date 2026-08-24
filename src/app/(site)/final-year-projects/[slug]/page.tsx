import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getProjectBySlug } from "@/lib/data/projects";
import { FadeIn } from "@/components/shared/fade-in";
import { ProjectLeadForm } from "@/components/site/project-lead-form";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 160),
      images: project.thumbnail ? [{ url: project.thumbnail }] : undefined,
    },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent/25 blur-[120px]"
          aria-hidden
        />
        <div className="container-edge relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <FadeIn>
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">
              {project.category || "Sample Project"}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              {project.description}
            </p>
          </FadeIn>

          {project.thumbnail && (
            <FadeIn delay={0.1}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority />
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-edge grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-16">
            {project.techStack.length > 0 && (
              <FadeIn>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Tech Stack</h2>
                <ul className="mt-6 space-y-4">
                  {project.techStack.map((tech, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                      {tech}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}

            {project.demoLink && (
              <FadeIn delay={0.1}>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Demo</h2>
                <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-border bg-black">
                  <iframe
                    src={project.demoLink}
                    title={`${project.title} demo`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <FadeIn delay={0.05}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <p className="text-sm font-medium text-muted-foreground">Want this project?</p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  Fill the form and we&apos;ll get it to you.
                </p>
                <div className="mt-6">
                  <ProjectLeadForm projectId={project.id} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
