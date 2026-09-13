import type { Metadata } from "next";
import { LegalPageHeader } from "@/components/shared/legal-page-header";
import { LegalClause, LegalList } from "@/components/shared/legal-clause";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Prime Edge Technologies courses and final-year project support.",
};

export default function TermsPage() {
  return (
    <>
      <LegalPageHeader title="Terms of Service" />

      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <FadeIn className="space-y-10">
            <LegalClause number={1} title="Course Enrollment">
              <LegalList
                items={[
                  "Students must provide accurate information during registration.",
                  "Enrollment is confirmed only after successful payment/registration.",
                ]}
              />
            </LegalClause>

            <LegalClause number={2} title="Live Course Access">
              <LegalList
                items={[
                  "Live classes are available according to the published schedule.",
                  "Students are responsible for having a suitable internet connection and device.",
                  "Class schedules may occasionally change due to technical or unavoidable circumstances.",
                ]}
              />
            </LegalClause>

            <LegalClause number={3} title="Course Recordings">
              <LegalList
                items={[
                  "Recordings are provided for enrolled students for educational/revision purposes.",
                  "Recordings are for individual use only.",
                  "Students must not copy, redistribute, sell, upload, or share recordings with others.",
                ]}
              />
            </LegalClause>

            <LegalClause number={4} title="Final-Year Project Support">
              <LegalList
                items={[
                  "Project support is intended for educational guidance and technical assistance.",
                  "Students remain responsible for understanding, implementing, and presenting their projects.",
                  "Prime Edge Technologies does not guarantee specific academic grades, approvals, or results.",
                ]}
              />
            </LegalClause>

            <LegalClause number={5} title="Student Responsibilities">
              <LegalList
                items={[
                  "Students should attend classes, complete assigned work, and follow course guidelines.",
                  "Misuse of course materials or services may result in access being restricted.",
                ]}
              />
            </LegalClause>

            <LegalClause number={6} title="Payments & Fees">
              <LegalList
                items={[
                  "Course fees and applicable charges will be clearly communicated before enrollment.",
                  "Students are responsible for making payments according to the agreed terms.",
                ]}
              />
            </LegalClause>

            <LegalClause number={7} title="Intellectual Property">
              <LegalList
                items={[
                  "Course content, videos, notes, source materials, and other resources belong to Prime Edge Technologies or their respective owners.",
                  "They may not be reproduced or commercially distributed without permission.",
                ]}
              />
            </LegalClause>

            <LegalClause number={8} title="Third-Party/Academic Requirements">
              <LegalList
                items={[
                  "Students are responsible for complying with their college/university's project and academic requirements.",
                  "Prime Edge Technologies is not responsible for changes in institutional rules or requirements.",
                ]}
              />
            </LegalClause>

            <LegalClause number={9} title="Service Changes">
              <p>
                Prime Edge Technologies may update course content, schedules, instructors, or
                learning resources when necessary.
              </p>
            </LegalClause>

            <LegalClause number={10} title="Limitation of Liability">
              <p>
                Prime Edge Technologies provides educational training and project guidance but does
                not guarantee employment, certification, academic marks, project approval, or any
                particular outcome.
              </p>
            </LegalClause>

            <LegalClause number={11} title="Termination/Suspension">
              <p>
                Access may be suspended or terminated for misuse, unauthorized sharing of content,
                abusive behavior, or violation of these terms.
              </p>
            </LegalClause>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
