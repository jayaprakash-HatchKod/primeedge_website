import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need prior programming experience to enroll?",
    answer:
      "Most of our courses start from fundamentals, so no prior experience is required. Each course page lists any recommended background so you know exactly what to expect.",
  },
  {
    question: "How are classes conducted?",
    answer:
      "Sessions are live and conducted over Google Meet. After enrollment, our team shares your class schedule, Meet link, and a Telegram group link for ongoing support directly over email.",
  },
  {
    question: "Is there a certificate after completion?",
    answer:
      "Yes, students who complete the course and capstone project receive a PrimeEdge certificate of completion, along with a portfolio-ready project to showcase.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept all major cards, UPI, netbanking, and wallets through our secure Razorpay checkout. Payments are processed instantly and you'll receive a confirmation with your Student ID.",
  },
  {
    question: "Do you offer placement assistance?",
    answer:
      "Every course includes resume reviews, mock interviews, and referrals to openings we come across through our network. We don't guarantee placement — what we commit to is actively supporting your job search.",
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
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
