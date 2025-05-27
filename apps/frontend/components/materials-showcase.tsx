"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react"
import { manufacturingProcesses, getProcessById } from "@/lib/manufacturing-processes"

// Collect all unique materials across all processes
const allMaterials = manufacturingProcesses.flatMap((process) =>
  process.materials.map((material) => ({
    ...material,
    processId: process.id,
    processName: process.name,
  })),
)

// Material property icons
const materialProperties = {
  strength: "High strength-to-weight ratio",
  corrosion: "Excellent corrosion resistance",
  heat: "Good heat resistance",
  chemical: "Chemical resistant",
  food: "Food-safe material",
  electrical: "Electrical insulator",
  uv: "UV resistant",
  lightweight: "Lightweight",
  durable: "Highly durable",
  machinable: "Easily machinable",
}

// Helper function to get the appropriate texture image for a material
function getMaterialTexture(materialId: string): string {
  if (materialId.toLowerCase().includes("steel")) {
    return "/placeholder-1ouxn.png"
  } else if (materialId.toLowerCase().includes("aluminum")) {
    return "/placeholder-rk6fo.png"
  } else if (materialId.toLowerCase().includes("brass")) {
    return "/brass-metal-texture.png"
  } else if (materialId.toLowerCase().includes("copper")) {
    return "/placeholder.svg?height=400&width=600&query=copper metal texture"
  } else if (materialId.toLowerCase().includes("titanium")) {
    return "/placeholder.svg?height=400&width=600&query=titanium metal texture"
  } else if (materialId.toLowerCase().includes("acrylic") || materialId.toLowerCase().includes("plastic")) {
    return "/placeholder.svg?height=400&width=600&query=acrylic plastic texture"
  } else if (materialId.toLowerCase().includes("abs")) {
    return "/placeholder.svg?height=400&width=600&query=abs plastic texture"
  } else if (materialId.toLowerCase().includes("nylon")) {
    return "/placeholder.svg?height=400&width=600&query=nylon material texture"
  } else if (materialId.toLowerCase().includes("pla")) {
    return "/placeholder.svg?height=400&width=600&query=pla 3d printing material"
  } else if (materialId.toLowerCase().includes("petg")) {
    return "/placeholder.svg?height=400&width=600&query=petg 3d printing material"
  } else if (materialId.toLowerCase().includes("carbon")) {
    return "/placeholder.svg?height=400&width=600&query=carbon fiber texture"
  }
  return "/placeholder.svg?height=400&width=600&query=manufacturing material texture"
}

// Helper function to check if a material belongs to a category
function isMaterialInCategory(material: any, category: string): boolean {
  if (category === "all") return true

  if (category === "metals") {
    return (
      material.id.includes("steel") ||
      material.id.includes("aluminum") ||
      material.id.includes("brass") ||
      material.id.includes("copper") ||
      material.id.includes("metal")
    )
  }

  if (category === "plastics") {
    return (
      material.id.includes("acrylic") ||
      material.id.includes("abs") ||
      material.id.includes("nylon") ||
      material.id.includes("delrin") ||
      material.id.includes("pla") ||
      material.id.includes("petg") ||
      material.id.includes("plastic")
    )
  }

  if (category === "specialty") {
    return (
      material.id.includes("carbon") ||
      material.id.includes("glass") ||
      material.id.includes("ceramic") ||
      material.id.includes("dental") ||
      material.id.includes("flexible") ||
      material.id.includes("specialty")
    )
  }

  return false
}

interface MaterialsShowcaseProps {
  processFilter: string
  categoryFilter: string
}

export function MaterialsShowcase({ processFilter = "all", categoryFilter = "all" }: MaterialsShowcaseProps) {
  // Get materials based on the process filter
  let materials = allMaterials

  if (processFilter !== "all") {
    const process = getProcessById(processFilter)
    if (process) {
      materials = process.materials.map((material) => ({
        ...material,
        processId: process.id,
        processName: process.name,
      }))
    }
  }

  // Apply category filter
  if (categoryFilter !== "all") {
    materials = materials.filter((material) => isMaterialInCategory(material, categoryFilter))
  }

  // Remove duplicates by material ID
  const uniqueMaterials = materials.filter(
    (material, index, self) => index === self.findIndex((m) => m.id === material.id),
  )

  return (
    <div>
      {uniqueMaterials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No materials found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or contact us for custom material options.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueMaterials.map((material, index) => (
            <Card key={`${material.id}-${index}`} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-video relative bg-gray-100">
                <Image
                  src={getMaterialTexture(material.id) || "/placeholder.svg"}
                  alt={material.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{material.name}</CardTitle>
                  <Badge variant="outline">{material.processName}</Badge>
                </div>
                <CardDescription>
                  {material.description || "High-quality material for precision manufacturing"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Properties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(materialProperties)
                        .slice(0, 3 + Math.floor(Math.random() * 3)) // Random selection of 3-5 properties
                        .map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {value}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Typical Applications:</h4>
                    <p className="text-sm text-gray-600">
                      {material.applications ||
                        "Ideal for prototypes, production parts, and custom components requiring precision and durability."}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/upload?process=${material.processId}&material=${material.id}`}>
                    Get Quote with {material.name}
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
