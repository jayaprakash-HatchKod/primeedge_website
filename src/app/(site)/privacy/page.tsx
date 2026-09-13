import type { Metadata } from "next";
import { LegalPageHeader } from "@/components/shared/legal-page-header";
import { LegalClause, LegalList } from "@/components/shared/legal-clause";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Prime Edge Technologies — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <LegalPageHeader title="Privacy Policy" />

      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <FadeIn className="space-y-10">
            <LegalClause number={1} title="Information We Collect">
              <LegalList
                items={[
                  "Name, email address, phone number, and other registration details.",
                  "Course enrollment and payment-related information.",
                  "Information provided when students contact us or request course/project support.",
                  "Website usage information such as IP address, browser type, and device information, where applicable.",
                ]}
              />
            </LegalClause>

            <LegalClause number={2} title="How We Use Your Information">
              <p>We may use your information to:</p>
              <LegalList
                items={[
                  "Register and manage your course enrollment.",
                  "Provide live online classes and course recordings.",
                  "Provide final-year project guidance and support.",
                  "Communicate course updates, schedules, and important information.",
                  "Respond to enquiries and provide customer support.",
                  "Improve our courses, services, and website.",
                ]}
              />
            </LegalClause>

            <LegalClause number={3} title="Payment Information">
              <p>
                Payments may be processed through third-party payment providers. Prime Edge
                Technologies does not unnecessarily store complete card, banking, or other sensitive
                payment credentials.
              </p>
            </LegalClause>

            <LegalClause number={4} title="Course Recordings">
              <p>
                Live classes may be recorded and provided to enrolled students for educational and
                revision purposes. Recordings are not intended for public distribution.
              </p>
            </LegalClause>

            <LegalClause number={5} title="Sharing of Information">
              <p>
                We do not sell or rent personal information to third parties. Information may be
                shared with trusted service providers when necessary to operate our website, process
                payments, provide communications, or deliver our services.
              </p>
            </LegalClause>

            <LegalClause number={6} title="Data Security">
              <p>
                We take reasonable measures to protect personal information against unauthorized
                access, alteration, disclosure, or misuse. However, no online system can be
                guaranteed to be completely secure.
              </p>
            </LegalClause>

            <LegalClause number={7} title="Cookies">
              <p>
                Our website may use cookies or similar technologies to improve website
                functionality, understand usage, and enhance the user experience.
              </p>
            </LegalClause>

            <LegalClause number={8} title="Data Retention">
              <p>
                We retain personal information only for as long as reasonably necessary for
                providing our services, maintaining records, meeting legal obligations, or resolving
                disputes.
              </p>
            </LegalClause>

            <LegalClause number={9} title="Your Rights">
              <p>
                Depending on applicable law, you may have rights to request access to, correction
                of, or deletion of your personal information. You may contact us to make such a
                request.
              </p>
            </LegalClause>

            <LegalClause number={10} title="Third-Party Links">
              <p>
                Our website may contain links to third-party websites or services. We are not
                responsible for the privacy practices or content of those third parties.
              </p>
            </LegalClause>

            <LegalClause number={11} title="Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated effective date.
              </p>
            </LegalClause>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
