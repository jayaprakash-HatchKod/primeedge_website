import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { getSiteSettings } from "@/lib/data/site-settings";
import { toEmbeddableVideoUrl } from "@/lib/video-embed";

const points = [
  "Live mentor-led sessions",
  "Real, hire-ready projects",
  "Placement assistance",
  "Final year project support",
];

const DIRECT_VIDEO_FILE = /\.(mp4|webm|ogg)$/i;

export async function Hero() {
  const settings = await getSiteSettings();
  const heroVideoUrl = settings?.heroVideoUrl ? toEmbeddableVideoUrl(settings.heroVideoUrl) : null;

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/25 blur-[120px]"
        aria-hidden
      />

      <div className="container-edge relative flex flex-col gap-10 py-24 sm:py-28 lg:flex-row lg:items-center lg:py-32">
        <div className="max-w-2xl lg:max-w-xl">
          <FadeIn>
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Learn Skills. Build Projects. <span className="text-accent">Grow Your Career.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              The Prime Edge Technologies provides practical online training and end-to-end final
              year project support to help students gain industry-ready skills and confidence.
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild variant="accent" size="xl">
                <Link href="/courses">
                  Explore Courses <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/final-year-projects">Explore Projects</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="size-4 text-accent" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {heroVideoUrl && (
          <FadeIn delay={0.12} className="relative w-full lg:flex-[1.3]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/40 via-accent/10 to-transparent blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-[28px] bg-gradient-to-br from-accent via-blue-400 to-accent/30 p-[3px] shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[25px] bg-black sm:aspect-video lg:aspect-[4/3] lg:min-w-[500px]">
                {DIRECT_VIDEO_FILE.test(heroVideoUrl) ? (
                  <video
                    src={heroVideoUrl}
                    controls
                    className="h-full w-full object-cover"
                    aria-label="PrimeEdge introduction video"
                  />
                ) : (
                  <iframe
                    src={heroVideoUrl}
                    title="PrimeEdge introduction video"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
