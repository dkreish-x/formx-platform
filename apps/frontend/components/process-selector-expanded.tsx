"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileUp, Layers, Zap } from "lucide-react"
import { manufacturingProcesses } from "@/lib/manufacturing-processes"

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

// Process icon mapping
const processIcons: Record<string, React.ReactNode> = {
  "flat-laser-cutting": <Zap className="h-10 w-10 text-brand-dark-gold" />,
  "tube-laser-cutting": <Zap className="h-10 w-10 text-brand-dark-gold" />,
  "cnc-routing": <Layers className="h-10 w-10 text-brand-dark-gold" />,
  "cnc-milling": <Layers className="h-10 w-10 text-brand-dark-gold" />,
  "3d-printing": <Layers className="h-10 w-10 text-brand-dark-gold" />,
  welding: <Zap className="h-10 w-10 text-brand-dark-gold" />,
  "sheet-metal-fabrication": <Layers className="h-10 w-10 text-brand-dark-gold" />,
  coatings: <Layers className="h-10 w-10 text-brand-dark-gold" />,
}

export default function ProcessSelectorExpanded() {
  const [activeTab, setActiveTab] = useState("cutting")

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-dark-grey">
          Manufacturing Services
        </h2>
        <p className="max-w-[700px] text-brand-light-grey md:text-xl/relaxed">
          Select a manufacturing process to get started with your custom parts
        </p>
      </div>

      <Tabs defaultValue="cutting" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          {processCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-sm md:text-base">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {processCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.processes.map((processId) => {
                const process = manufacturingProcesses.find((p) => p.id === processId)
                if (!process) return null

                return (
                  <Card key={process.id} className="flex flex-col h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {processIcons[process.id] || <Layers className="h-10 w-10 text-brand-dark-gold" />}
                          <div>
                            <CardTitle className="text-xl">{process.name}</CardTitle>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="pt-2">{process.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Materials</h4>
                          <p className="text-sm text-brand-light-grey">
                            {process.materials
                              .slice(0, 3)
                              .map((m) => m.name)
                              .join(", ")}
                            {process.materials.length > 3 ? `, and ${process.materials.length - 3} more` : ""}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Lead Time</h4>
                          <p className="text-sm text-brand-light-grey">
                            {process.leadTimeRange.min}-{process.leadTimeRange.max} business days
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark-grey mb-1">File Types</h4>
                          <p className="text-sm text-brand-light-grey">{process.acceptedFileTypes.join(", ")}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
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
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
