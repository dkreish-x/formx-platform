"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { manufacturingProcesses } from "@/lib/manufacturing-processes"

export function ServiceSelector() {
  const [selectedTab, setSelectedTab] = useState("all")

  // Group processes by category
  const categories = {
    all: manufacturingProcesses,
    cutting: manufacturingProcesses.filter((p) => p.id.includes("laser") || p.id.includes("routing")),
    machining: manufacturingProcesses.filter((p) => p.id.includes("milling") || p.id.includes("cnc")),
    additive: manufacturingProcesses.filter((p) => p.id.includes("3d-printing")),
    fabrication: manufacturingProcesses.filter((p) => p.id.includes("welding") || p.id.includes("sheet-metal")),
    finishing: manufacturingProcesses.filter((p) => p.id.includes("coatings")),
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Manufacturing Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our wide range of manufacturing processes to get your parts made quickly and efficiently
        </p>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-white">
              All Services
            </TabsTrigger>
            <TabsTrigger value="cutting" className="data-[state=active]:bg-white">
              Cutting
            </TabsTrigger>
            <TabsTrigger value="machining" className="data-[state=active]:bg-white">
              Machining
            </TabsTrigger>
            <TabsTrigger value="additive" className="data-[state=active]:bg-white">
              Additive
            </TabsTrigger>
            <TabsTrigger value="fabrication" className="data-[state=active]:bg-white">
              Fabrication
            </TabsTrigger>
            <TabsTrigger value="finishing" className="data-[state=active]:bg-white">
              Finishing
            </TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(categories).map(([category, processes]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processes.map((process) => (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-semibold text-gray-800">{process.name}</CardTitle>
                        <Badge
                          variant="outline"
                          style={{ borderColor: process.accentColor, color: process.accentColor }}
                        >
                          {process.leadTimeRange.min}-{process.leadTimeRange.max} days
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600">{process.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-4">
                        <div className="aspect-video relative rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={`/abstract-geometric-shapes.png?height=200&width=400&query=${encodeURIComponent(process.name)}`}
                            alt={process.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Materials:</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {process.materials.slice(0, 3).map((material) => (
                                <Badge key={material.id} variant="secondary" className="bg-gray-100 text-gray-700">
                                  {material.name}
                                </Badge>
                              ))}
                              {process.materials.length > 3 && (
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                  +{process.materials.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Accepted Files:</h4>
                            <p className="text-sm text-gray-600">{process.acceptedFileTypes.join(", ")}</p>
                          </div>
                          {process.dimensionLimits && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700">Size Limits:</h4>
                              <p className="text-sm text-gray-600">
                                {process.dimensionLimits.maxLength &&
                                  `Max Length: ${process.dimensionLimits.maxLength}mm`}
                                {process.dimensionLimits.maxWidth &&
                                  `, Max Width: ${process.dimensionLimits.maxWidth}mm`}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="w-full flex justify-between items-center">
                        <p className="text-sm text-gray-500">From ${process.basePrice}</p>
                        <Link href={`/process/${process.id}`}>
                          <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">
                            Get Quote
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
