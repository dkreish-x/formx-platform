import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Upload Your CAD File",
    description: "Upload your design files in common formats like STEP, STL, DXF, or IGES.",
  },
  {
    number: "02",
    title: "Configure Specifications",
    description: "Select material, finish, quantity, and other requirements for your parts.",
  },
  {
    number: "03",
    title: "Review Instant Quote",
    description: "Get real-time pricing based on your specifications and design complexity.",
  },
  {
    number: "04",
    title: "Place Your Order",
    description: "Complete your purchase securely through our online platform.",
  },
  {
    number: "05",
    title: "Production",
    description: "We manufacture your parts using our in-house equipment and expertise.",
  },
  {
    number: "06",
    title: "Delivery",
    description: "Receive your high-quality parts delivered directly to your location.",
  },
]

export default function ProcessSteps() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
      <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mb-8">
        Our streamlined process makes getting custom parts quick and easy
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {steps.map((step, index) => (
          <Card key={index} className="relative overflow-hidden border-primary/20">
            <div className="absolute -right-4 -top-4 text-8xl font-bold text-primary/10">{step.number}</div>
            <CardHeader className="relative z-10">
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <CardDescription className="text-base">{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
