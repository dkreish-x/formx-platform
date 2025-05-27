"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getProcessById } from "@/lib/manufacturing-processes"

interface MaterialComparisonProps {
  processId: string
}

export default function MaterialComparison({ processId }: MaterialComparisonProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const process = getProcessById(processId)

  if (!process) {
    return null
  }

  const toggleMaterial = (materialId: string) => {
    if (selectedMaterials.includes(materialId)) {
      setSelectedMaterials(selectedMaterials.filter((id) => id !== materialId))
    } else {
      // Limit to comparing 3 materials at a time
      if (selectedMaterials.length < 3) {
        setSelectedMaterials([...selectedMaterials, materialId])
      }
    }
  }

  const properties = ["Strength", "Durability", "Heat Resistance", "Chemical Resistance", "Surface Finish", "Cost"]

  // Mock data for material properties
  const getMaterialProperty = (materialId: string, property: string) => {
    const materialProperties: Record<string, Record<string, { value: number; description: string }>> = {
      "aluminum-6061": {
        Strength: { value: 4, description: "Good tensile strength" },
        Durability: { value: 4, description: "Excellent corrosion resistance" },
        "Heat Resistance": { value: 3, description: "Good up to 400°F" },
        "Chemical Resistance": { value: 4, description: "Resistant to many chemicals" },
        "Surface Finish": { value: 5, description: "Excellent surface finish" },
        Cost: { value: 3, description: "Moderate cost" },
      },
      "stainless-steel-304": {
        Strength: { value: 5, description: "Excellent tensile strength" },
        Durability: { value: 5, description: "Superior corrosion resistance" },
        "Heat Resistance": { value: 4, description: "Good up to 1600°F" },
        "Chemical Resistance": { value: 5, description: "Excellent chemical resistance" },
        "Surface Finish": { value: 4, description: "Very good surface finish" },
        Cost: { value: 4, description: "Higher cost" },
      },
      "carbon-steel-1045": {
        Strength: { value: 5, description: "Excellent tensile strength" },
        Durability: { value: 3, description: "Moderate corrosion resistance" },
        "Heat Resistance": { value: 3, description: "Good up to 800°F" },
        "Chemical Resistance": { value: 2, description: "Limited chemical resistance" },
        "Surface Finish": { value: 3, description: "Good surface finish" },
        Cost: { value: 2, description: "Lower cost" },
      },
      "sla-standard": {
        Strength: { value: 2, description: "Moderate tensile strength" },
        Durability: { value: 2, description: "Limited durability" },
        "Heat Resistance": { value: 1, description: "Poor heat resistance" },
        "Chemical Resistance": { value: 2, description: "Limited chemical resistance" },
        "Surface Finish": { value: 5, description: "Excellent surface finish" },
        Cost: { value: 3, description: "Moderate cost" },
      },
      "sls-nylon": {
        Strength: { value: 3, description: "Good tensile strength" },
        Durability: { value: 4, description: "Good durability" },
        "Heat Resistance": { value: 3, description: "Moderate heat resistance" },
        "Chemical Resistance": { value: 3, description: "Moderate chemical resistance" },
        "Surface Finish": { value: 3, description: "Good surface finish" },
        Cost: { value: 4, description: "Higher cost" },
      },
    }

    return materialProperties[materialId]?.[property] || { value: 0, description: "N/A" }
  }

  const renderPropertyValue = (value: number) => {
    const dots = []
    for (let i = 1; i <= 5; i++) {
      dots.push(
        <div key={i} className={`w-2 h-2 rounded-full ${i <= value ? "bg-brand-dark-gold" : "bg-gray-200"}`}></div>,
      )
    }
    return <div className="flex space-x-1">{dots}</div>
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Material Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {process.materials.map((material) => (
              <Badge
                key={material.id}
                variant={selectedMaterials.includes(material.id) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedMaterials.includes(material.id) ? "bg-brand-dark-gold hover:bg-brand-dark-gold/90" : ""
                }`}
                onClick={() => toggleMaterial(material.id)}
              >
                {material.name}
              </Badge>
            ))}
          </div>

          {selectedMaterials.length > 0 ? (
            <div className="mt-4">
              <Tabs defaultValue="properties">
                <TabsList className="w-full">
                  <TabsTrigger value="properties" className="flex-1">
                    Properties
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="flex-1">
                    Applications
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="properties" className="mt-4">
                  <div className="space-y-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Property</th>
                          {selectedMaterials.map((materialId) => {
                            const material = process.materials.find((m) => m.id === materialId)
                            return (
                              <th key={materialId} className="text-left py-2">
                                {material?.name}
                              </th>
                            )
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((property) => (
                          <tr key={property} className="border-b">
                            <td className="py-2 font-medium">{property}</td>
                            {selectedMaterials.map((materialId) => {
                              const propertyData = getMaterialProperty(materialId, property)
                              return (
                                <td key={`${materialId}-${property}`} className="py-2">
                                  <div className="flex flex-col space-y-1">
                                    {renderPropertyValue(propertyData.value)}
                                    <span className="text-xs text-gray-500">{propertyData.description}</span>
                                  </div>
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="applications" className="mt-4">
                  <div className="space-y-4">
                    {selectedMaterials.map((materialId) => {
                      const material = process.materials.find((m) => m.id === materialId)
                      return (
                        <div key={materialId} className="border-b pb-4 last:border-0">
                          <h3 className="font-medium mb-2">{material?.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {material?.description || "A versatile material suitable for various applications."}
                          </p>
                          <div className="text-sm">
                            <div className="font-medium mb-1">Common Applications:</div>
                            <ul className="list-disc list-inside text-gray-600">
                              <li>Prototypes and concept models</li>
                              <li>Functional parts and assemblies</li>
                              <li>End-use consumer products</li>
                              <li>Manufacturing tools and fixtures</li>
                            </ul>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">Select materials above to compare their properties</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
