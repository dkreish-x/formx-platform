import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, FileUp, ShoppingCart, Truck, Zap } from "lucide-react"

const features = [
  {
    title: "Instant Quotes",
    description: "Get real-time pricing based on your CAD files and specifications",
    icon: <Clock className="h-12 w-12 text-primary" />,
  },
  {
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden fees or surprises",
    icon: <DollarSign className="h-12 w-12 text-primary" />,
  },
  {
    title: "Easy File Upload",
    description: "Upload and analyze your CAD files with our intuitive interface",
    icon: <FileUp className="h-12 w-12 text-primary" />,
  },
  {
    title: "Seamless Checkout",
    description: "Order directly through our platform with secure payment options",
    icon: <ShoppingCart className="h-12 w-12 text-primary" />,
  },
  {
    title: "Fast Turnaround",
    description: "Quick manufacturing and delivery to meet your deadlines",
    icon: <Zap className="h-12 w-12 text-primary" />,
  },
  {
    title: "Direct Shipping",
    description: "Track your order from production to delivery",
    icon: <Truck className="h-12 w-12 text-primary" />,
  },
]

export default function FeatureHighlights() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Form(X)</h2>
      <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mb-8">
        We own our equipment and provide direct manufacturing services
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="text-brand-dark-gold">{feature.icon}</div>
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
