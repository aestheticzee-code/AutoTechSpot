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
    <section id="faq" className="scroll-mt-24 py-10 border-t border-border mt-10">
      <div className="mx-auto max-w-[750px]">
        <h2 className="font-display text-2xl font-bold mb-6 text-foreground text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-border/60 rounded-[14px] bg-background shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md hover:bg-secondary/40"
            >
              <AccordionTrigger className="px-5 py-[18px] text-left text-[15px] font-semibold text-foreground hover:no-underline transition-colors duration-200 [&>svg:last-child]:hidden [&[data-state=open]_.faq-icon]:rotate-45">
                <span className="flex-1 pr-4">{faq.question}</span>
                <span className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
              <AccordionContent className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed">
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
