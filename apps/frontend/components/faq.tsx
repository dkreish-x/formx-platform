import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What file formats do you accept?",
    answer:
      "We accept most common CAD formats including STEP, STL, DXF, IGES, and more. For best results, we recommend STEP files for 3D parts and DXF for 2D laser cutting.",
  },
  {
    question: "How accurate is the instant quote?",
    answer:
      "Our quoting system analyzes your CAD file in detail to provide highly accurate pricing. The final price you see is the price you pay, with no hidden fees or surprises.",
  },
  {
    question: "What materials do you offer?",
    answer:
      "We offer a wide range of materials including various metals (aluminum, steel, stainless steel), plastics, composites, and more. The specific materials available depend on the manufacturing process you select.",
  },
  {
    question: "How long does production take?",
    answer:
      "Production times vary based on complexity, quantity, and current capacity. Most orders are completed within 3-10 business days. You'll receive an estimated completion date with your quote.",
  },
  {
    question: "Can I get custom finishes for my parts?",
    answer:
      "Yes, we offer various finishing options including painting, powder coating, anodizing, polishing, and more. You can select these options during the quoting process.",
  },
  {
    question: "Do you offer design assistance?",
    answer:
      "While our platform is designed for customers with ready-to-manufacture CAD files, we do offer design for manufacturability (DFM) feedback. For more extensive design help, please contact our engineering team.",
  },
]

export default function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
      <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mb-8">
        Find answers to common questions about our services
      </p>

      <Accordion type="single" collapsible className="w-full max-w-3xl">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
