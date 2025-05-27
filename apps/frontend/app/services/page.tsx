import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Manufacturing Services | FormX",
  description:
    "Explore our comprehensive range of manufacturing services including CNC machining, 3D printing, injection molding, laser tube cutting, tube bending and more.",
}

// Helper function to get the appropriate image for a service
function getServiceImage(serviceId: string): string {
  // Using direct placeholder.svg URLs with full parameters
  switch (serviceId) {
    case "cnc-machining":
      return "/images/cnc-machining.png"
    case "3d-printing":
      return "/images/3d-printing.png"
    case "injection-molding":
      return "/images/injection-molding.png"
    case "sheet-metal":
      return "/images/sheet-metal.png"
    case "laser-cutting":
      return "/images/laser-cutting.png"
    case "laser-tube-cutting":
      return "/laser-tube-cutting.png"
    case "tube-bending":
      return "/tube-bending-machine.png"
    case "anodizing":
      return "/anodized-aluminum-parts.png"
    case "powder-coating":
      return "/powder-coating-process.png"
    case "painting":
      return "/industrial-spray-painting.png"
    case "bead-blasting":
      return "/bead-blasting-cabinet.png"
    case "sand-blasting":
      return "/sandblasting-cabinet.png"
    case "urethane-casting":
      return "/urethane-casting-mold.png"
    default:
      return "/manufacturing-facility.png"
  }
}

export default function ServicesPage() {
  return (
    <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Our Manufacturing <span className="text-brand-dark-gold">Services</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          Precision manufacturing solutions for every industry. From prototyping to production, we deliver quality parts
          on time.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="prototyping">Prototyping</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="finishing">Finishing</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prototyping" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((service) => service.categories.includes("prototyping"))
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((service) => service.categories.includes("production"))
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="finishing" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((service) => service.categories.includes("finishing"))
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-20 bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/20 rounded-2xl p-8 md:p-12">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold text-gray-900">Need a custom solution?</h2>
            <p className="mt-2 text-lg text-gray-600">
              Our engineering team can help you develop the perfect manufacturing process for your unique needs.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white px-6 py-3 text-lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 bg-gray-100 relative">
        <Image
          src={getServiceImage(service.id) || "/placeholder.svg"}
          alt={service.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-brand-dark-gold hover:bg-brand-dark-gold/90">{service.leadTime}</Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="mb-4">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-1">
              <CheckCircle className="h-4 w-4 text-brand-dark-gold mr-2" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-sm text-gray-500">Starting at</span>
            <p className="text-lg font-bold text-brand-dark-gold">{service.startingPrice}</p>
          </div>
          <Link href={`/quote/${service.id}`}>
            <Button
              variant="outline"
              className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-dark-gold hover:text-white"
            >
              Get Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

const services = [
  {
    id: "cnc-machining",
    name: "CNC Machining",
    description: "Precision machined parts from a wide range of materials with tight tolerances.",
    categories: ["prototyping", "production"],
    features: ['±0.001" tolerance', "Complex geometries", "Various materials"],
    leadTime: "3-5 days",
    startingPrice: "$75",
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    description:
      "Rapid prototyping and high-volume production with various technologies for thousands of parts monthly.",
    categories: ["prototyping", "production"],
    features: ["Fast turnaround", "Complex designs", "Production volumes"],
    leadTime: "1-3 days",
    startingPrice: "$35",
  },
  {
    id: "injection-molding",
    name: "Injection Molding",
    description: "High-volume production of plastic parts with excellent repeatability.",
    categories: ["production"],
    features: ["High volume", "Consistent quality", "Material variety"],
    leadTime: "2-3 weeks",
    startingPrice: "$1,500",
  },
  {
    id: "sheet-metal",
    name: "Sheet Metal Fabrication",
    description: "Custom sheet metal parts with bending, cutting, and forming capabilities.",
    categories: ["prototyping", "production"],
    features: ["Quick turnaround", "Various metals", "Complex forms"],
    leadTime: "5-7 days",
    startingPrice: "$95",
  },
  {
    id: "laser-cutting",
    name: "Laser Cutting",
    description: "Precise cutting of sheet materials with minimal material waste.",
    categories: ["prototyping", "production"],
    features: ["High precision", "Clean edges", "Fast processing"],
    leadTime: "2-4 days",
    startingPrice: "$65",
  },
  {
    id: "laser-tube-cutting",
    name: "Laser Tube Cutting",
    description: "Precision cutting of metal tubes and pipes with complex profiles and patterns.",
    categories: ["prototyping", "production"],
    features: ["360° cutting capability", "Complex cutouts", "Various tube profiles"],
    leadTime: "3-5 days",
    startingPrice: "$85",
  },
  {
    id: "tube-bending",
    name: "Tube Bending",
    description: "Precision bending of metal tubes and pipes for structural and aesthetic applications.",
    categories: ["prototyping", "production"],
    features: ["Multiple bend radii", "Various tube diameters", "Tight tolerance bends"],
    leadTime: "4-6 days",
    startingPrice: "$90",
  },
  {
    id: "anodizing",
    name: "Anodizing",
    description: "Electrochemical process that creates a durable, corrosion-resistant oxide layer on metal surfaces.",
    categories: ["finishing"],
    features: ["Corrosion resistance", "Decorative colors", "Electrical insulation"],
    leadTime: "3-5 days",
    startingPrice: "$35",
  },
  {
    id: "powder-coating",
    name: "Powder Coating",
    description: "Dry finishing process that applies a free-flowing powder to create a durable, high-quality finish.",
    categories: ["finishing"],
    features: ["Excellent durability", "Wide color selection", "Environmentally friendly"],
    leadTime: "2-4 days",
    startingPrice: "$40",
  },
  {
    id: "painting",
    name: "Industrial Painting",
    description: "Application of liquid paints and coatings for decorative and protective purposes.",
    categories: ["finishing"],
    features: ["Custom colors", "Various sheens", "Protective coatings"],
    leadTime: "3-5 days",
    startingPrice: "$30",
  },
  {
    id: "bead-blasting",
    name: "Bead Blasting",
    description: "Surface treatment using fine glass beads to clean and finish metal surfaces with a satin appearance.",
    categories: ["finishing"],
    features: ["Uniform finish", "Non-abrasive", "Removes contaminants"],
    leadTime: "2-3 days",
    startingPrice: "$25",
  },
  {
    id: "sand-blasting",
    name: "Sand Blasting",
    description: "Abrasive blasting process that uses pressurized sand to clean and texture surfaces.",
    categories: ["finishing"],
    features: ["Deep cleaning", "Surface preparation", "Rust removal"],
    leadTime: "2-3 days",
    startingPrice: "$25",
  },
  {
    id: "urethane-casting",
    name: "Urethane Casting",
    description: "Low-volume production of parts with properties similar to injection molding.",
    categories: ["prototyping", "production"],
    features: ["Low volume", "Production-like parts", "Quick turnaround"],
    leadTime: "5-7 days",
    startingPrice: "$350",
  },
]
