import type { Metadata } from "next";
import { Target, Users, Award, Handshake } from "lucide-react";
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
    title: "Outcome-first curriculum",
    description: "Every module is designed backward from what employers actually ask for.",
  },
  {
    icon: Users,
    title: "Small, focused batches",
    description: "Live sessions stay small enough that every student gets real attention.",
  },
  {
    icon: Award,
    title: "Industry mentors",
    description: "Our trainers are practitioners first — people currently building software.",
  },
  {
    icon: Handshake,
    title: "Career support",
    description: "Resume reviews, mock interviews, and referrals to roles in our network.",
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

      <section className="py-24 sm:py-28">
        <div className="container-edge grid gap-16 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Started by engineers who were tired of generic bootcamps"
              className="mx-0"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                PrimeEdge started with a simple observation: most software training either moves
                too slowly for working professionals or too fast for genuine beginners — and
                almost none of it connects directly to what hiring managers are actually looking
                for.
              </p>
              <p>
                So we built a different model. Small live batches. Trainers who are still active
                practitioners. Projects modeled on real production systems. And a support system
                that continues well past the last class — including direct help with resumes,
                interviews, and introductions to hiring partners.
              </p>
              <p>
                We&apos;re now opening our founding batches across full stack development, data
                science, cloud engineering, and design — each shaped by the same principle: build
                skills that translate directly into careers.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl bg-primary p-8 text-white">
                <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                  Founding Batch
                </p>
                <p className="mt-3 text-2xl font-semibold">Admissions are open</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  We&apos;re a new institute, and our first cohorts are forming now — which means
                  smaller batches and direct access to the people who built the curriculum.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-base font-semibold text-foreground">Live sessions</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Taught in real time, not pre-recorded
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-base font-semibold text-foreground">Practitioner mentors</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Trainers still working in the field
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-24 sm:py-28">
        <div className="container-edge">
          <SectionHeading eyebrow="What We Value" title="The principles behind every course we run" />

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
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
