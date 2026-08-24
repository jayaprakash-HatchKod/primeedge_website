import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

export function ContactCTA() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-edge">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                Have questions before you enroll?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
                Talk to our admissions team about course fit, batch timings, and payment options —
                no pressure, just clarity.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild variant="accent" size="xl">
                  <Link href="/contact">
                    Contact Us <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
