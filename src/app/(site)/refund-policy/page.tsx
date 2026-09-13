import type { Metadata } from "next";
import { LegalPageHeader } from "@/components/shared/legal-page-header";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy for Prime Edge Technologies courses and final-year project support.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <LegalPageHeader title="Refund Policy" />

      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <FadeIn className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              There is no refund available on purchasing online or self-paced courses / live
              courses & final year projects.
            </p>
            <p>
              Unlike physical goods, electronically distributed software and deliverables can be
              duplicated. Once a purchase has been made, it is unfortunately not possible for us to
              recall all copies/deliverables (such as downloaded files). Therefore, Prime Edge
              Technologies does not accept refunds, returns, or exchanges.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
