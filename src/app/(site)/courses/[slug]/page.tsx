import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, IndianRupee, FileText, ArrowRight, CheckCircle2, Flame } from "lucide-react";
import { getCourseBySlug } from "@/lib/data/courses";
import { formatCurrency } from "@/lib/format";
import { toEmbeddableVideoUrl } from "@/lib/video-embed";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) return { title: "Course Not Found" };

  return {
    title: course.title,
    description: course.description.slice(0, 160),
    openGraph: {
      title: course.title,
      description: course.description.slice(0, 160),
      images: course.thumbnail ? [{ url: course.thumbnail }] : undefined,
    },
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  const demoVideos = [course.demoVideo1, course.demoVideo2]
    .filter(Boolean)
    .map((url) => toEmbeddableVideoUrl(url as string));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "PrimeEdge Software Institute",
      sameAs: process.env.NEXT_PUBLIC_SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent/25 blur-[120px]"
          aria-hidden
        />
        <div className="container-edge relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <FadeIn>
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">Course</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              {course.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-accent" aria-hidden />
                {course.duration}
              </span>
              <span className="flex items-center gap-2">
                <IndianRupee className="size-4 text-accent" aria-hidden />
                {formatCurrency(course.price)}
              </span>
            </div>

            <Button asChild variant="accent" size="xl" className="mt-8">
              <Link href={`/enroll?course=${course.slug}`}>
                Enroll Now <ArrowRight className="size-4" />
              </Link>
            </Button>
          </FadeIn>

          {demoVideos.length > 0 ? (
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                {demoVideos.map((src, i) => (
                  <div key={i}>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-accent uppercase">
                      {i === 0 ? "High-Level Overview" : "Course Demo"}
                    </p>
                    <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                      <iframe
                        src={src}
                        title={`${course.title} ${i === 0 ? "high-level overview" : "course demo"}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          ) : (
            course.thumbnail && (
              <FadeIn delay={0.1}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" priority />
                </div>
              </FadeIn>
            )
          )}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-edge grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-16">
            {course.highlights.length > 0 && (
              <FadeIn>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Course Highlights
                </h2>
                <ul className="mt-6 space-y-4">
                  {course.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <FadeIn delay={0.05}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <p className="text-sm font-medium text-muted-foreground">Course Fee</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">
                  {formatCurrency(course.price)}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-600">
                  <Flame className="size-3.5" aria-hidden />
                  Only few seats available
                </p>
                <Button asChild variant="accent" size="xl" className="mt-6 w-full">
                  <Link href={`/enroll?course=${course.slug}`}>Enroll Now</Link>
                </Button>

                {course.syllabusPdf && (
                  <a
                    href={course.syllabusPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <FileText className="size-4" aria-hidden />
                    Download Syllabus (PDF)
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
