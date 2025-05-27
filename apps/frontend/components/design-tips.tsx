"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AlertCircle, Check, Info } from "lucide-react"
import { getProcessById } from "@/lib/manufacturing-processes"

interface DesignTipsProps {
  processId: string
}

export default function DesignTips({ processId }: DesignTipsProps) {
  const process = getProcessById(processId)

  if (!process) {
    return null
  }

  // Process-specific design tips
  const designTips: Record<string, any> = {
    "flat-laser-cutting": {
      general: [
        "Keep a minimum distance of 1.5× material thickness between features",
        "Avoid sharp internal corners; use fillets when possible",
        "Minimum hole diameter should be at least equal to material thickness",
        "Consider kerf width (0.1-0.2mm) in your design",
      ],
      materials: {
        "aluminum-6061": [
          "Minimum hole diameter: 1.5× material thickness",
          "Minimum feature size: 1.0mm",
          "Optimal for thicknesses between 0.5-6mm",
        ],
        "stainless-steel-304": [
          "Minimum hole diameter: 2× material thickness",
          "Minimum feature size: 1.2mm",
          "Optimal for thicknesses between 0.5-10mm",
        ],
      },
      bestPractices: [
        "Design with the kerf width in mind for tight-fitting parts",
        "Use tab-and-slot designs for easy assembly",
        "Consider adding bend reliefs for parts that will be bent later",
        "Avoid extremely small text or intricate details",
      ],
    },
    "cnc-milling": {
      general: [
        "Design with tool access in mind; avoid deep narrow pockets",
        "Include fillets in internal corners (min. 1/3 of pocket depth)",
        "Maintain minimum wall thickness of 0.8mm",
        "Consider adding draft angles for deep features",
      ],
      materials: {
        "aluminum-6061": [
          "Excellent machinability with sharp tools",
          "Minimum wall thickness: 0.8mm",
          "Minimum feature size: 0.5mm",
        ],
        "stainless-steel-304": [
          "Use slower cutting speeds to prevent work hardening",
          "Minimum wall thickness: 1.0mm",
          "Minimum feature size: 0.8mm",
        ],
      },
      bestPractices: [
        "Design parts to be machined from as few setups as possible",
        "Avoid deep, narrow slots and pockets",
        "Specify critical dimensions and tolerances clearly",
        "Consider standard tool sizes in your design",
      ],
    },
    "3d-printing": {
      general: [
        "Design with proper wall thickness (min. 0.8mm for most processes)",
        "Consider build orientation to minimize supports",
        "Add drain holes for hollow parts to remove uncured resin or powder",
        "Maintain minimum feature size of 0.3mm",
      ],
      materials: {
        "sla-standard": [
          "Minimum wall thickness: 0.8mm",
          "Minimum feature size: 0.3mm",
          "Design with support removal in mind",
        ],
        "sls-nylon": [
          "Minimum wall thickness: 1.0mm",
          "Minimum feature size: 0.5mm",
          "Add escape holes for hollow parts",
        ],
      },
      bestPractices: [
        "Design self-supporting overhangs (less than 45° from vertical)",
        "Add fillets to stress concentration areas",
        "Consider shrinkage in your design (0.2-0.5% for most materials)",
        "Use shelling to reduce material usage and print time",
      ],
    },
  }

  const tips = designTips[processId] || {
    general: ["Design with manufacturability in mind", "Consider material properties"],
    materials: {},
    bestPractices: ["Follow industry standards", "Consult with manufacturing experts"],
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Design Tips for {process.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">
              General Guidelines
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex-1">
              Material Specific
            </TabsTrigger>
            <TabsTrigger value="best-practices" className="flex-1">
              Best Practices
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-4">
            <ul className="space-y-2">
              {tips.general.map((tip: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="materials" className="mt-4">
            {Object.keys(tips.materials).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(tips.materials).map(([materialId, materialTips]) => {
                  const material = process.materials.find((m) => m.id === materialId)
                  return (
                    <div key={materialId} className="border-b pb-3 last:border-0">
                      <h3 className="font-medium mb-2">{material?.name || materialId}</h3>
                      <ul className="space-y-2">
                        {(materialTips as string[]).map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500">No material-specific tips available for this process</div>
            )}
          </TabsContent>
          <TabsContent value="best-practices" className="mt-4">
            <ul className="space-y-2">
              {tips.bestPractices.map((practice: string, index: number) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{practice}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
