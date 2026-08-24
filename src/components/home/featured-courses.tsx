import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedCourses } from "@/lib/data/courses";
import { SectionHeading } from "@/components/shared/section-heading";
import { CourseCard } from "@/components/shared/course-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

export async function FeaturedCourses() {
  const courses = await getFeaturedCourses(3);

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/40 py-24 sm:py-28">
      <div className="container-edge">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured Courses"
            title="Programs designed for real careers"
            description="Structured curricula, live mentorship, and projects that hold up in an interview."
            className="mx-0"
          />
          <Button asChild variant="outline" size="lg" className="hidden shrink-0 sm:inline-flex">
            <Link href="/courses">
              View all courses <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <FadeIn key={course.id} delay={i * 0.08}>
              <CourseCard course={course} index={i} />
            </FadeIn>
          ))}
        </div>

        <Button asChild variant="outline" size="lg" className="mt-10 w-full sm:hidden">
          <Link href="/courses">
            View all courses <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
