import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Mail, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Final Year Projects",
  description:
    "Final year projects for B.Tech, M.Tech, MCA, MBA, BBA, B.ED/M.ED, M.A. Journalism, and Biotechnology projects for B.Sc, M.Sc & M.Tech — from PrimeEdge Software Institute.",
};

export const revalidate = 60;

const programs = [
  "B.Tech",
  "M.Tech",
  "MCA",
  "MBA",
  "BBA",
  "B.ED / M.ED",
  "M.A. Journalism",
];

export default function FinalYearProjectsPage() {
  const email =
    process.env.NEXT_PUBLIC_PROJECT_SUPPORT_EMAIL ?? "projectsupport@theprimeedgetechnologies.com";
  const whatsapp = process.env.NEXT_PUBLIC_PROJECT_SUPPORT_PHONE ?? "";
  const whatsappDigits = whatsapp.replace(/[^\d]/g, "");

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent/25 blur-[120px]"
          aria-hidden
        />
        <div className="container-edge relative py-16 sm:py-20">
          <FadeIn>
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">
              Final Year Projects
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Available final year projects for every stream
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
              Ready-to-deliver academic projects with source code, documentation, and guidance —
              built for final year students across engineering, management, education, and science
              programs.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-edge">
          <FadeIn>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Projects available for
            </h2>
            <p className="mt-2 text-muted-foreground">
              Tell us your program through WhatsApp or email only — no calls — and we&apos;ll share
              the matching project list.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
              <FadeIn key={program} delay={Math.min(i * 0.05, 0.25)}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
                  <GraduationCap className="size-5 shrink-0 text-accent" aria-hidden />
                  <span className="font-medium text-foreground">{program}</span>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.3}>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
                <GraduationCap className="size-5 shrink-0 text-accent" aria-hidden />
                <span className="font-medium text-foreground">
                  Biotechnology
                  <span className="block text-xs font-normal text-muted-foreground">
                    for B.Sc, M.Sc &amp; M.Tech
                  </span>
                </span>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-14 rounded-2xl border border-border bg-card p-8 sm:p-10">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                For more project details, contact us
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Reach out with your program and topic preference over WhatsApp or email — our team
                will share available projects, pricing, and delivery timelines.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {whatsappDigits && (
                  <Button asChild variant="accent" size="xl" className="bg-[#25D366] hover:bg-[#1ebe59]">
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="size-4" />
                      WhatsApp {whatsapp}
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="xl">
                  <a href={`mailto:${email}`}>
                    <Mail className="size-4" aria-hidden />
                    {email}
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl bg-muted px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">Looking for a course instead?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explore our live, mentor-led software training programs.
                </p>
              </div>
              <Button asChild variant="accent" size="lg">
                <Link href="/courses">
                  Browse Courses <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
