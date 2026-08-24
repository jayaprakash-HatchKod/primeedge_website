import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/fade-in";

const steps = [
  {
    step: "01",
    title: "Pick your course",
    description:
      "Browse our programs, check the syllabus and demo sessions, and choose the track that matches where you want to go.",
  },
  {
    step: "02",
    title: "Join a live batch",
    description:
      "Enroll online and get your schedule, class link, and batch group by email. Sessions are live, so you can ask questions as they come up.",
  },
  {
    step: "03",
    title: "Build and get hired",
    description:
      "Work through real projects with mentor feedback, finish with a portfolio-ready capstone, and use our resume and interview support.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="How It Works"
          title="From enrollment to your first offer"
          description="A straightforward path — no self-paced video maze, no guesswork about what to learn next."
        />

        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((item) => (
            <StaggerItem key={item.step}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <span className="text-sm font-semibold tracking-wide text-accent">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
