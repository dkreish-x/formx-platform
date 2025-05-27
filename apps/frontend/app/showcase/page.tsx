import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Project Showcase | FormX",
  description: "Explore our portfolio of manufacturing projects across various industries and manufacturing processes.",
}

// Helper function to get the appropriate image for a project
function getProjectImage(project): string {
  const industryMap = {
    aerospace: "/aerospace-titanium-bracket.png",
    medical: "/surgical-instrument-handle.png",
    automotive: "/placeholder-2y134.png",
    industrial:
      "/placeholder.svg?height=400&width=600&query=stainless%20steel%20pump%20impeller%20with%20complex%20curved%20surfaces%20photorealistic",
    automation:
      "/placeholder.svg?height=400&width=600&query=precision%20aluminum%20robotic%20end%20effector%20with%20mounting%20features%20photorealistic",
    optics:
      "/placeholder.svg?height=400&width=600&query=black%20anodized%20aluminum%20optical%20lens%20housing%20with%20precision%20threads%20photorealistic",
    electronics:
      "/placeholder.svg?height=400&width=600&query=aluminum%20semiconductor%20test%20fixture%20with%20precision%20features%20photorealistic",
    consumer:
      "/placeholder.svg?height=400&width=600&query=titanium%20and%20carbon%20fiber%20bicycle%20components%20photorealistic",
  }

  return (
    industryMap[project.industry] ||
    "/placeholder.svg?height=400&width=600&query=precision%20machined%20metal%20parts%20with%20complex%20features%20photorealistic"
  )
}

export default function ShowcasePage() {
  return (
    <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Project <span className="text-brand-dark-gold">Showcase</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          Explore our portfolio of successful manufacturing projects across various industries.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-8">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="aerospace">Aerospace</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="automotive">Automotive</TabsTrigger>
          <TabsTrigger value="industrial">Industrial</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="aerospace" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.industry === "aerospace")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="medical" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.industry === "medical")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="automotive" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.industry === "automotive")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="consumer" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.industry === "consumer")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="industrial" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.industry === "industrial")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="electronics" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.industry === "electronics")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-20 bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/20 rounded-2xl p-8 md:p-12">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold text-gray-900">Have a project in mind?</h2>
            <p className="mt-2 text-lg text-gray-600">
              Let's discuss how we can bring your ideas to life with our manufacturing expertise.
            </p>
          </div>
          <Link href="/quote">
            <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white px-6 py-3 text-lg">
              Get a Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 bg-gray-100 relative">
        <Image src={getProjectImage(project) || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-brand-dark-gold hover:bg-brand-dark-gold/90">{project.process}</Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{project.name}</h3>
          <Badge variant="outline">{project.industry}</Badge>
        </div>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.materials.map((material, index) => (
            <Badge key={index} variant="secondary">
              {material}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">{project.timeline}</div>
          <Link href={`/showcase/${project.id}`}>
            <Button
              variant="outline"
              className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-dark-gold hover:text-white"
            >
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

const projects = [
  {
    id: "aerospace-mounting-bracket",
    name: "Aerospace Mounting Bracket",
    description:
      'Precision CNC machined titanium mounting bracket for satellite communication systems with tight tolerances of ±0.001".',
    industry: "aerospace",
    process: "CNC Machining",
    materials: ["Titanium Ti-6Al-4V", "Aluminum 7075-T6"],
    timeline: "3 weeks from design approval to delivery",
  },
  {
    id: "medical-surgical-tool",
    name: "Surgical Instrument Handle",
    description:
      "Ergonomic stainless steel handle for minimally invasive surgical instruments with autoclave-safe design and laser etched markings.",
    industry: "medical",
    process: "CNC Machining",
    materials: ["Stainless Steel 316L", "Medical Grade Silicone"],
    timeline: "4 weeks including sterilization validation",
  },
  {
    id: "ev-battery-housing",
    name: "EV Battery Housing Components",
    description:
      "Lightweight, high-strength aluminum components for electric vehicle battery enclosures with EMI shielding properties.",
    industry: "automotive",
    process: "CNC Machining",
    materials: ["Aluminum 6061-T6", "Conductive Gasket Material"],
    timeline: "5 weeks including anodizing treatment",
  },
  {
    id: "industrial-pump-impeller",
    name: "High-Efficiency Pump Impeller",
    description:
      "5-axis machined stainless steel impeller for chemical processing pumps with complex internal flow channels.",
    industry: "industrial",
    process: "5-Axis CNC Machining",
    materials: ["Stainless Steel 316L", "Duplex Stainless 2205"],
    timeline: "4 weeks including material certification",
  },
  {
    id: "robotics-end-effector",
    name: "Robotic End Effector",
    description:
      "Precision aluminum end effector for pick-and-place robotics with integrated pneumatic channels and sensor mounts.",
    industry: "automation",
    process: "CNC Machining",
    materials: ["Aluminum 7075-T6", "Delrin AF"],
    timeline: "3 weeks including assembly and testing",
  },
  {
    id: "optical-lens-housing",
    name: "Precision Optical Lens Housing",
    description:
      "High-precision aluminum housing for optical systems with black anodized finish and threaded mounting interfaces.",
    industry: "optics",
    process: "CNC Machining",
    materials: ["Aluminum 6061-T6", "Brass C360"],
    timeline: "4 weeks including optical black anodizing",
  },
  {
    id: "semiconductor-test-fixture",
    name: "Semiconductor Test Fixture",
    description:
      "High-tolerance test fixture for semiconductor wafer testing with integrated cooling channels and alignment features.",
    industry: "electronics",
    process: "CNC Machining",
    materials: ["Aluminum 6061-T6", "PEEK", "Copper C110"],
    timeline: "3 weeks including precision inspection",
  },
  {
    id: "hydraulic-manifold",
    name: "Custom Hydraulic Manifold",
    description:
      "Complex aluminum hydraulic manifold with intersecting internal channels and precision valve interfaces.",
    industry: "industrial",
    process: "CNC Machining",
    materials: ["Aluminum 6061-T6", "Stainless Steel 303"],
    timeline: "5 weeks including pressure testing",
  },
  {
    id: "drone-frame-components",
    name: "Lightweight Drone Frame",
    description: "Carbon fiber and aluminum components for commercial drone frames with weight-optimized design.",
    industry: "aerospace",
    process: "CNC Machining",
    materials: ["Carbon Fiber Composite", "Aluminum 7075-T6"],
    timeline: "4 weeks including assembly verification",
  },
  {
    id: "medical-imaging-components",
    name: "MRI Machine Components",
    description:
      "Non-magnetic precision components for medical imaging equipment with strict material certification requirements.",
    industry: "medical",
    process: "CNC Machining",
    materials: ["Non-magnetic Stainless 316L", "PEEK", "Ceramic"],
    timeline: "6 weeks including material certification",
  },
  {
    id: "electric-motor-housing",
    name: "Electric Motor Housing",
    description:
      "Precision aluminum housing for high-efficiency electric motors with integrated cooling fins and bearing seats.",
    industry: "automotive",
    process: "CNC Machining",
    materials: ["Aluminum 6061-T6", "Brass C360"],
    timeline: "4 weeks including dimensional verification",
  },
  {
    id: "custom-bicycle-components",
    name: "High-Performance Bicycle Components",
    description:
      "Lightweight titanium and aluminum components for professional racing bicycles with aerodynamic design.",
    industry: "consumer",
    process: "CNC Machining",
    materials: ["Titanium Ti-6Al-4V", "Aluminum 7075-T6"],
    timeline: "5 weeks including anodizing and assembly",
  },
]
