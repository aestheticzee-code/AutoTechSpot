import { FAQ } from "@/types/article";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="my-10 border-t border-border pt-10 scroll-mt-24">
      <h2 className="font-display text-2xl font-bold mb-6 text-foreground">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-[800px]">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-0 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)]"
            >
              <AccordionTrigger className="px-5 py-[18px] text-left text-[16px] font-semibold text-[#111827] hover:no-underline hover:bg-[#f9fafb] transition-colors duration-200 [&>svg:last-child]:hidden [&[data-state=open]_.faq-icon]:rotate-45">
                <span className="flex-1 pr-4">{faq.question}</span>
                <span className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="faq-icon text-muted-foreground transition-transform duration-300"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-0 text-[15px] text-[#4b5563] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
