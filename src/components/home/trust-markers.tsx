import { Rocket, Radio, Hammer, UsersRound } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

const markers = [
  {
    icon: Rocket,
    title: "Founding batches",
    description: "Now enrolling our first cohorts",
  },
  {
    icon: Radio,
    title: "Live & mentor-led",
    description: "Real classes, not recordings",
  },
  {
    icon: Hammer,
    title: "Project-based",
    description: "Portfolio work from week one",
  },
  {
    icon: UsersRound,
    title: "Small batches",
    description: "Limited seats, real attention",
  },
];

export function TrustMarkers() {
  return (
    <section className="border-b border-border bg-card">
      <div className="container-edge grid grid-cols-2 gap-8 py-14 sm:gap-6 lg:grid-cols-4 lg:py-16">
        {markers.map((marker, i) => (
          <FadeIn
            key={marker.title}
            delay={i * 0.06}
            className="text-center lg:border-l lg:border-border lg:first:border-l-0 lg:px-6"
          >
            <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <marker.icon className="size-5" aria-hidden />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">{marker.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{marker.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
