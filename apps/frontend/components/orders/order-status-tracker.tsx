"use client"

import type React from "react"

import { useState } from "react"
import { Clock, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Define the status types
export type ManufacturingStage =
  | "order_received"
  | "engineering_review"
  | "material_procurement"
  | "production_queued"
  | "production_in_progress"
  | "quality_inspection"
  | "finishing"
  | "packaging"
  | "shipping_preparation"
  | "shipped"
  | "delivered"

export type StageStatus = "completed" | "in_progress" | "pending" | "issue"

export interface StageDetail {
  stage: ManufacturingStage
  status: StageStatus
  name: string
  description: string
  timestamp?: string
  estimatedCompletion?: string
  notes?: string
  icon: React.ReactNode
}

export interface PartStatus {
  partId: string
  partName: string
  currentStage: ManufacturingStage
  stages: StageDetail[]
}

export interface OrderStatusTrackerProps {
  orderId: string
  orderStatus: string
  overallProgress: number
  parts: PartStatus[]
  lastUpdated: string
}

export default function OrderStatusTracker({
  orderId,
  orderStatus,
  overallProgress,
  parts,
  lastUpdated,
}: OrderStatusTrackerProps) {
  const [selectedPart, setSelectedPart] = useState<string | "overall">("overall")
  const [isExpanded, setIsExpanded] = useState(false)

  // Get the stages to display based on selection
  const stagesToDisplay =
    selectedPart === "overall" ? getOverallStages(parts) : parts.find((p) => p.partId === selectedPart)?.stages || []

  // Get the current stage for compact view
  const currentStage = stagesToDisplay.find((s) => s.status === "in_progress") || stagesToDisplay[0]
  const nextStage = stagesToDisplay[stagesToDisplay.findIndex((s) => s.stage === currentStage.stage) + 1] || null

  // Get completed stages count for progress indicator
  const completedStages = stagesToDisplay.filter((s) => s.status === "completed").length
  const totalStages = stagesToDisplay.length
  const stageProgress = Math.round((completedStages / totalStages) * 100)

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-brand-dark-grey">Production Status</CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`
                ${orderStatus === "Completed" ? "bg-green-50 text-green-700 border-green-200" : ""}
                ${orderStatus === "In Production" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                ${orderStatus === "Shipped" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                ${orderStatus === "Pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
              `}
            >
              {orderStatus}
            </Badge>
            <span className="text-xs text-brand-light-grey">Updated: {lastUpdated}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Compact View (Always Visible) */}
        <div className="p-4 bg-muted/10 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2.5">
                <div className="bg-brand-dark-gold h-2.5 rounded-full" style={{ width: `${overallProgress}%` }}></div>
              </div>
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-brand-dark-gold hover:text-brand-dark-gold/80 hover:bg-brand-light-gold/10"
              >
                {isExpanded ? (
                  <>
                    <span>Collapse Details</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>View Details</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Current Stage Summary (only visible in compact mode) */}
          {!isExpanded && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-white rounded-lg border">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full
                  ${currentStage.status === "completed" ? "bg-green-100" : ""}
                  ${currentStage.status === "in_progress" ? "bg-blue-100" : ""}
                  ${currentStage.status === "pending" ? "bg-gray-100" : ""}
                  ${currentStage.status === "issue" ? "bg-red-100" : ""}
                `}
              >
                <div
                  className={`
                    ${currentStage.status === "completed" ? "text-green-600" : ""}
                    ${currentStage.status === "in_progress" ? "text-blue-600" : ""}
                    ${currentStage.status === "pending" ? "text-gray-400" : ""}
                    ${currentStage.status === "issue" ? "text-red-600" : ""}
                  `}
                >
                  {currentStage.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-sm font-medium text-brand-dark-grey">Current Stage: {currentStage.name}</p>
                  {currentStage.status === "in_progress" && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      In Progress
                    </Badge>
                  )}
                  {currentStage.status === "issue" && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Issue Detected
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-brand-light-grey mt-1">{currentStage.description}</p>

                {nextStage && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-brand-light-grey">
                    <span>Next:</span>
                    <span className="font-medium text-brand-dark-grey">{nextStage.name}</span>
                    {currentStage.estimatedCompletion && (
                      <span className="flex items-center ml-2">
                        <Clock className="h-3 w-3 mr-1 text-brand-light-gold" />
                        Est. {currentStage.estimatedCompletion}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="hidden sm:block">
                <Tabs defaultValue="overall" value={selectedPart} onValueChange={setSelectedPart} className="w-full">
                  <TabsList className="bg-muted/20 p-1">
                    <TabsTrigger value="overall" className="text-xs data-[state=active]:bg-white">
                      Overall
                    </TabsTrigger>
                    {parts.map((part) => (
                      <TabsTrigger
                        key={part.partId}
                        value={part.partId}
                        className="text-xs data-[state=active]:bg-white"
                      >
                        {part.partName}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          )}
        </div>

        {/* Expanded View (Only visible when expanded) */}
        {isExpanded && (
          <>
            <div className="p-4 bg-white border-b">
              <Tabs defaultValue="overall" value={selectedPart} onValueChange={setSelectedPart} className="w-full">
                <TabsList className="bg-muted/20 p-1">
                  <TabsTrigger value="overall" className="text-xs data-[state=active]:bg-white">
                    Overall
                  </TabsTrigger>
                  {parts.map((part) => (
                    <TabsTrigger key={part.partId} value={part.partId} className="text-xs data-[state=active]:bg-white">
                      {part.partName}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="p-6">
              <div className="relative">
                {stagesToDisplay.map((stage, index) => (
                  <div key={index} className="mb-6 flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                          flex h-8 w-8 items-center justify-center rounded-full
                          ${stage.status === "completed" ? "bg-green-100" : ""}
                          ${stage.status === "in_progress" ? "bg-blue-100" : ""}
                          ${stage.status === "pending" ? "bg-gray-100" : ""}
                          ${stage.status === "issue" ? "bg-red-100" : ""}
                        `}
                      >
                        <div
                          className={`
                            ${stage.status === "completed" ? "text-green-600" : ""}
                            ${stage.status === "in_progress" ? "text-blue-600" : ""}
                            ${stage.status === "pending" ? "text-gray-400" : ""}
                            ${stage.status === "issue" ? "text-red-600" : ""}
                          `}
                        >
                          {stage.icon}
                        </div>
                      </div>
                      {index < stagesToDisplay.length - 1 && (
                        <div
                          className={`
                            h-full w-0.5 
                            ${stage.status === "completed" ? "bg-green-200" : "bg-gray-200"}
                          `}
                        ></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="flex items-baseline gap-2">
                        <p
                          className={`
                            text-sm font-medium
                            ${stage.status === "completed" ? "text-green-700" : ""}
                            ${stage.status === "in_progress" ? "text-blue-700" : ""}
                            ${stage.status === "pending" ? "text-gray-500" : ""}
                            ${stage.status === "issue" ? "text-red-700" : ""}
                          `}
                        >
                          {stage.name}
                        </p>
                        {stage.timestamp && <span className="text-xs text-brand-light-grey">{stage.timestamp}</span>}
                        {stage.status === "in_progress" && stage.estimatedCompletion && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 ml-2">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Est. completion
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Estimated completion: {stage.estimatedCompletion}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {stage.status === "issue" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 ml-2">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Issue detected
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-brand-light-grey">{stage.description}</p>
                      {stage.notes && <p className="mt-2 text-sm italic text-brand-light-grey">{stage.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to generate overall stages from part stages
function getOverallStages(parts: PartStatus[]): StageDetail[] {
  // This is a simplified implementation
  // In a real app, you would aggregate the stages from all parts
  // and determine the overall status based on business rules

  // For this example, we'll use the first part's stages as a template
  // and update the status based on all parts
  if (parts.length === 0) return []

  const templateStages = [...parts[0].stages]

  // Update each stage status based on all parts
  return templateStages.map((stage) => {
    const allPartStages = parts
      .map((p) => p.stages.find((s) => s.stage === stage.stage))
      .filter(Boolean) as StageDetail[]

    // If any part has an issue at this stage, the overall has an issue
    if (allPartStages.some((s) => s.status === "issue")) {
      return { ...stage, status: "issue" }
    }

    // If all parts have completed this stage, the overall is completed
    if (allPartStages.every((s) => s.status === "completed")) {
      return { ...stage, status: "completed" }
    }

    // If any part is in progress at this stage, the overall is in progress
    if (allPartStages.some((s) => s.status === "in_progress")) {
      return { ...stage, status: "in_progress" }
    }

    // Otherwise, the stage is pending
    return { ...stage, status: "pending" }
  })
}
