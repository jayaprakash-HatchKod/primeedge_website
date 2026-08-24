import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, Phone, Copy } from "lucide-react";
import { getStudentByPaymentId } from "@/lib/data/students";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = { title: "Enrollment Confirmed" };

type Props = { searchParams: Promise<{ paymentId?: string }> };

export default async function EnrollmentSuccessPage({ searchParams }: Props) {
  const { paymentId } = await searchParams;
  const student = paymentId ? await getStudentByPaymentId(paymentId) : null;

  const email = process.env.NEXT_PUBLIC_INSTITUTE_EMAIL ?? "support@primeedge.in";
  const phone = process.env.NEXT_PUBLIC_INSTITUTE_PHONE ?? "+91 90000 00000";

  if (!student) {
    return (
      <section className="flex flex-1 items-center justify-center py-24">
        <div className="container-edge max-w-md text-center">
          <h1 className="text-2xl font-semibold text-foreground">We couldn&apos;t find that payment</h1>
          <p className="mt-3 text-muted-foreground">
            If you completed a payment and are seeing this, please contact us with your payment
            details so we can confirm your enrollment.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-6">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-24">
      <div className="container-edge max-w-xl">
        <FadeIn className="text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="size-9" aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Thank you for enrolling!
          </h1>
          <p className="mt-3 text-muted-foreground">
            A confirmation email is on its way. Our team will follow up with your Google Meet and
            Telegram group links shortly.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="bg-primary px-7 py-6 text-white">
              <p className="text-xs font-medium tracking-wide text-slate-300 uppercase">Student ID</p>
              <p className="mt-1 text-3xl font-semibold tracking-wide">{student.studentId}</p>
            </div>

            <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="px-7 py-5">
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Course
                </dt>
                <dd className="mt-1 font-medium text-foreground">{student.course.title}</dd>
              </div>
              <div className="px-7 py-5">
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Amount Paid
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {formatCurrency(student.amount ?? student.course.price)}
                </dd>
              </div>
              <div className="px-7 py-5">
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Payment ID
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 font-mono text-sm text-foreground">
                  <Copy className="size-3.5 text-muted-foreground" aria-hidden />
                  {student.paymentId}
                </dd>
              </div>
              <div className="px-7 py-5">
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Enrolled On
                </dt>
                <dd className="mt-1 font-medium text-foreground">{formatDate(student.createdAt)}</dd>
              </div>
            </dl>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-7 text-center">
            <p className="text-sm font-medium text-foreground">Need help getting started?</p>
            <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row">
              <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-accent">
                <Mail className="size-4" aria-hidden /> {email}
              </a>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-accent">
                <Phone className="size-4" aria-hidden /> {phone}
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/courses">Browse More Courses</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
