import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { getActiveCourses } from "@/lib/data/courses";
import { EnrollmentForm } from "@/components/site/enrollment-form";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Enroll Now",
  description: "Enroll in a PrimeEdge Software Institute course and complete your payment securely.",
};

type Props = { searchParams: Promise<{ course?: string }> };

export default async function EnrollPage({ searchParams }: Props) {
  const { course: courseSlug } = await searchParams;
  const courses = await getActiveCourses();
  const preselected = courses.find((c) => c.slug === courseSlug);

  if (courses.length === 0) {
    return (
      <section className="flex flex-1 items-center justify-center py-24">
        <div className="container-edge flex flex-col items-center text-center">
          <AlertCircle className="size-10 text-muted-foreground" aria-hidden />
          <h1 className="mt-4 text-2xl font-semibold text-foreground">No courses available</h1>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Enrollment is temporarily unavailable. Please contact us for the latest batch details.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-6">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-24">
      <div className="container-edge max-w-2xl">
        <FadeIn>
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Enrollment</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Complete your enrollment
          </h1>
          <p className="mt-4 text-muted-foreground">
            Fill in your details below and proceed to a secure Razorpay payment. Your Student ID
            will be generated instantly after payment.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-7 sm:p-9">
            <EnrollmentForm courses={courses} preselectedCourseId={preselected?.id} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
