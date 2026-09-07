import type { Metadata } from "next";
import { Target, Code2, FolderCog, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/fade-in";
import { ContactCTA } from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PrimeEdge Software Institute's mission, teaching approach, and the mentors behind our industry-led software training programs.",
};

const values = [
  {
    icon: Target,
    title: "Outcome-Focused Learning",
    description: "Every module is designed backward from what employers actually ask for.",
  },
  {
    icon: Code2,
    title: "Industry-Relevant Mentorship",
    description:
      "Our trainers are practitioners first — people currently building and delivering real software solutions.",
  },
  {
    icon: FolderCog,
    title: "Project Support for Final Year Students",
    description:
      "End-to-end guidance for your final year projects — from topic selection to implementation and successful completion.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description:
      "Resume reviews, mock interviews, skill guidance, and referrals to help you take the next step in your career.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-card py-20 sm:py-24">
        <div className="container-edge">
          <FadeIn>
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">About Us</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              We built PrimeEdge for people who want to get hired, not just get a certificate.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              PrimeEdge Software Institute is a training institute focused on practical, live,
              mentor-led software education. We don&apos;t run a self-paced video library — we run a
              structured program with real deadlines, real projects, and real people guiding you
              through it.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-24 sm:py-28">
        <div className="container-edge">
          <SectionHeading
            eyebrow="What We Value"
            title="Principles that shape every course we run"
            description="Our values define the way we teach, support, and help students build skills and successful careers."
          />

          <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <value.icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <FadeIn delay={0.15} className="mt-10 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground">
              <span className="size-2 rounded-full bg-accent" aria-hidden />
              Learn Practically. Build Projects. Get Career-Ready.
            </span>
          </FadeIn>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
