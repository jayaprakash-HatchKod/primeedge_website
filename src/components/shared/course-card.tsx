import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Course } from "@prisma/client";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.18)] focus-visible:-translate-y-1 focus-visible:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            priority={index < 3}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No thumbnail
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Clock className="size-3.5" aria-hidden />
          <span>{course.duration}</span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-foreground">{course.title}</h3>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="bg-muted font-semibold text-foreground">
            {formatCurrency(course.price)}
          </Badge>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
            View details
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
