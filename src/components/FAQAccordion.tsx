import { FAQ } from "@/types/article";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="mt-10 border-t border-border pt-8 scroll-mt-24">
      <h2 className="font-display text-2xl font-bold mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <AccordionItem value={`faq-${index}`} className="border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-semibold text-foreground hover:no-underline hover:bg-muted/50 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQAccordion;
