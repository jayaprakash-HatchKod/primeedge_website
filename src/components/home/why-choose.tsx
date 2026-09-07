import { Target, Laptop, Users, Rocket, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/fade-in";

const reasons = [
  {
    icon: Target,
    title: "Outcome-Focused Learning",
    description: "Skills designed around real career goals.",
  },
  {
    icon: Laptop,
    title: "Practical Training",
    description: "Learn through hands-on projects, not just theory.",
  },
  {
    icon: Users,
    title: "Live Mentorship",
    description: "Get guidance and support from experienced trainers.",
  },
  {
    icon: Rocket,
    title: "Final-Year Project Support",
    description: "End-to-end guidance to successfully complete your project.",
  },
  {
    icon: Briefcase,
    title: "Industry-Ready Skills",
    description: "Build practical knowledge and project experience for the job market.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Why PrimeEdge"
          title="Why Choose PrimeEdge Technologies?"
          description="Learn practically. Build confidently. Get career-ready."
        />

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
