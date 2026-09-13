import { FadeIn } from "@/components/shared/fade-in";

export function LegalPageHeader({ title }: { title: string }) {
  return (
    <section className="border-b border-border bg-card py-16 sm:py-20">
      <div className="container-edge">
        <FadeIn>
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Legal</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
        </FadeIn>
      </div>
    </section>
  );
}
