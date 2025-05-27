"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileUp,
  ArrowRight,
  Zap,
  Layers,
  PrinterIcon as Printer3d,
  Hammer,
  SprayCanIcon as Spray,
  Scissors,
  Cog,
  Wrench,
} from "lucide-react"
import { manufacturingProcesses } from "@/lib/manufacturing-processes"

// Process icon mapping
const processIcons: Record<string, React.ReactNode> = {
  "flat-laser-cutting": <Zap className="h-12 w-12 text-brand-dark-gold" />,
  "tube-laser-cutting": <Zap className="h-12 w-12 text-brand-dark-gold" />,
  "cnc-routing": <Cog className="h-12 w-12 text-brand-dark-gold" />,
  "cnc-milling": <Wrench className="h-12 w-12 text-brand-dark-gold" />,
  "3d-printing": <Printer3d className="h-12 w-12 text-brand-dark-gold" />,
  welding: <Hammer className="h-12 w-12 text-brand-dark-gold" />,
  "sheet-metal-fabrication": <Layers className="h-12 w-12 text-brand-dark-gold" />,
  coatings: <Spray className="h-12 w-12 text-brand-dark-gold" />,
}

// Process category definitions
const processCategories = [
  {
    id: "cutting",
    name: "Cutting",
    description: "Precision cutting services for various materials",
    processes: ["flat-laser-cutting", "tube-laser-cutting", "cnc-routing"],
  },
  {
    id: "machining",
    name: "Machining",
    description: "CNC machining for complex parts",
    processes: ["cnc-milling"],
  },
  {
    id: "additive",
    name: "Additive",
    description: "3D printing services for prototypes and production",
    processes: ["3d-printing"],
  },
  {
    id: "fabrication",
    name: "Fabrication",
    description: "Metal fabrication and joining services",
    processes: ["welding", "sheet-metal-fabrication"],
  },
  {
    id: "finishing",
    name: "Finishing",
    description: "Surface finishing and coating services",
    processes: ["coatings"],
  },
]

export default function ProcessSelectorCard() {
  const [activeTab, setActiveTab] = useState("cutting")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="container py-16">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-dark-grey">
          Manufacturing Services
        </h2>
        <p className="max-w-[700px] text-brand-light-grey md:text-xl/relaxed">
          Select a manufacturing process to get started with your custom parts
        </p>
      </div>

      <Tabs defaultValue="cutting" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-10 bg-gray-100/50 p-1 rounded-xl">
          {processCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-brand-dark-grey data-[state=active]:shadow-sm rounded-lg"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {processCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.processes.map((processId) => {
                const process = manufacturingProcesses.find((p) => p.id === processId)
                if (!process) return null

                return (
                  <motion.div
                    key={process.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredCard(process.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Card
                      className={`h-full flex flex-col transition-all duration-300 overflow-hidden ${
                        hoveredCard === process.id ? "shadow-lg border-brand-dark-gold/30" : "shadow-sm"
                      }`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-gray-50">
                              {processIcons[process.id] || <Scissors className="h-12 w-12 text-brand-dark-gold" />}
                            </div>
                            <div>
                              <CardTitle className="text-xl font-bold">{process.name}</CardTitle>
                              <Badge variant="outline" className="mt-1 text-xs font-normal">
                                {process.leadTimeRange.min}-{process.leadTimeRange.max} day lead time
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-6 flex-grow">
                        <CardDescription className="text-sm mb-4">{process.description}</CardDescription>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Materials</h4>
                            <div className="flex flex-wrap gap-1">
                              {process.materials.slice(0, 3).map((material) => (
                                <Badge key={material.id} variant="secondary" className="text-xs font-normal">
                                  {material.name}
                                </Badge>
                              ))}
                              {process.materials.length > 3 && (
                                <Badge variant="secondary" className="text-xs font-normal">
                                  +{process.materials.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-brand-dark-grey mb-1">File Types</h4>
                            <p className="text-xs text-brand-light-grey">{process.acceptedFileTypes.join(", ")}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 mt-auto">
                        <div className="flex flex-col sm:flex-row w-full gap-3">
                          <Button
                            asChild
                            className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey"
                          >
                            <Link href={`/upload?process=${process.id}`}>
                              <FileUp className="mr-2 h-4 w-4" />
                              Upload Files
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full">
                            <Link href={`/process/${process.id}`}>
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
