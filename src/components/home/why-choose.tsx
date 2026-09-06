import { GraduationCap, Hammer, Radio, Compass } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/fade-in";

const reasons = [
  {
    icon: GraduationCap,
    title: "Expert Trainers",
    description:
      "Learn from professionals who have shipped software at real companies, not just certified instructors.",
  },
  {
    icon: Hammer,
    title: "Practical Learning",
    description:
      "Every course is built around projects you can show in an interview, not just slides and quizzes.",
  },
  {
    icon: Radio,
    title: "Live Sessions",
    description:
      "Attend live classes with real-time doubt clearing — no waiting days for a forum reply.",
  },
  {
    icon: Compass,
    title: "Career Guidance",
    description:
      "Resume templates, complete course materials, interview questions, LinkedIn profile optimization, and placement assistance built into every program.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Why PrimeEdge"
          title="A training experience built around outcomes"
          description="We designed PrimeEdge around one question: what actually gets someone hired? Everything else follows from there."
        />

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-accent/30">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <reason.icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
