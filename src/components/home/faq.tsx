import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_PROJECT_SUPPORT_PHONE ?? "+91 78421 67853";

const faqs = [
  {
    question: "How to enroll for a course?",
    answer:
      "You can join by paying from our site. Immediately after payment, you will receive a confirmation from us to guide you through the further process.",
  },
  {
    question: "Where can I watch the demo video of the course?",
    answer:
      "You can watch the demo video directly on the respective course page. Simply visit the course you are interested in and watch the available demo video before enrolling.",
  },
  {
    question:
      "I am a final-year student and enrolled in a course. When will I receive my final-year project and support?",
    answer: `Once you enroll in the course, you will receive a confirmation email. Take a screenshot of the confirmation email and send it to our WhatsApp number ${WHATSAPP_NUMBER}, along with your course details (such as CSE, MCA, MBA, BBA, etc.).\n\nWe will then share a list of available final-year projects with you. You can select the project that best suits your requirements.\n\nOnce you select your project, we will send you the complete project within 3 working days, along with the necessary final-year project support and guidance.`,
  },
  {
    question: "If I didn't like the course after joining, will I get my refund?",
    answer: "Sorry, no refunds.",
  },
];

export function FAQ() {
  return (
    <section className="border-t border-border bg-muted/40 py-24 sm:py-28">
      <div className="container-edge">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

        <FadeIn className="mx-auto mt-14 max-w-3xl">
          <Accordion multiple={false} className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
