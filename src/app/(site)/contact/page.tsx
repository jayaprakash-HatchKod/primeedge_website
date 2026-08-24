import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with PrimeEdge Software Institute for course details, batch timings, or enrollment support.",
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_INSTITUTE_EMAIL ?? "support@primeedge.in";
  const phone = process.env.NEXT_PUBLIC_INSTITUTE_PHONE ?? "+91 90000 00000";

  const details = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s+/g, "")}` },
    { icon: MapPin, label: "Location", value: "Bengaluru, India" },
    { icon: Clock, label: "Support Hours", value: "Mon–Sat, 9 AM – 7 PM IST" },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="container-edge grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <FadeIn>
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Let&apos;s talk about your next course
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Whether you have a question about a course, batch timing, or payment — our admissions
            team responds within 24 hours.
          </p>

          <dl className="mt-10 space-y-6">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <detail.icon className="size-5" aria-hidden />
                </div>
                <div>
                  <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {detail.label}
                  </dt>
                  <dd className="mt-0.5 text-base font-medium text-foreground">
                    {detail.href ? (
                      <a href={detail.href} className="hover:text-accent">
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-10">
            <h2 className="text-lg font-semibold text-foreground">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill out the form and we&apos;ll get back to you shortly.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
