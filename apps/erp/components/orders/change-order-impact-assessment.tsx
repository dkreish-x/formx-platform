import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, DollarSign, Package } from "lucide-react"

type ImpactAssessmentProps = {
  productionStage: "Pre-Production" | "In Production" | "Post-Production"
  costImpact: string
  timeImpact: string
  materialImpact: string
}

export function ChangeOrderImpactAssessment({
  productionStage,
  costImpact,
  timeImpact,
  materialImpact,
}: ImpactAssessmentProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Impact Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="font-medium">Production Stage</p>
              <p className="text-sm text-muted-foreground">
                {productionStage === "Pre-Production" &&
                  "Changes are possible but will incur additional costs for design and planning adjustments."}
                {productionStage === "In Production" &&
                  "All production will stop for evaluation. Additional costs will incur for materials used and time spent on machining and programming."}
                {productionStage === "Post-Production" &&
                  "Customer will pay for the full original lot, plus the cost of the new job."}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 p-2 mt-0.5">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Cost Impact</p>
              <p className="text-sm text-muted-foreground">{costImpact}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-purple-100 p-2 mt-0.5">
              <Clock className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Time Impact</p>
              <p className="text-sm text-muted-foreground">{timeImpact}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-100 p-2 mt-0.5">
              <Package className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Material Impact</p>
              <p className="text-sm text-muted-foreground">{materialImpact}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
