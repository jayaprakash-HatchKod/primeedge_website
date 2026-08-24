import type { Metadata } from "next";
import { BookX } from "lucide-react";
import { getActiveCourses } from "@/lib/data/courses";
import { CourseCard } from "@/components/shared/course-card";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse live, mentor-led software courses from PrimeEdge Software Institute — full stack development, data science, cloud engineering, and design.",
};

export const revalidate = 60;

export default async function CoursesPage() {
  const courses = await getActiveCourses();

  return (
    <section className="py-20 sm:py-24">
      <div className="container-edge">
        <FadeIn>
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Courses</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Programs built for real hiring outcomes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every course is live, mentor-led, and built around projects you can talk about in an
            interview.
          </p>
        </FadeIn>

        {courses.length === 0 ? (
          <div className="mt-20 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <BookX className="size-10 text-muted-foreground" aria-hidden />
            <h2 className="mt-4 text-lg font-semibold text-foreground">No courses available yet</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              We&apos;re updating our course catalog. Please check back soon or contact us for the
              latest batch schedule.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, i) => (
              <FadeIn key={course.id} delay={Math.min(i * 0.06, 0.3)}>
                <CourseCard course={course} index={i} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
