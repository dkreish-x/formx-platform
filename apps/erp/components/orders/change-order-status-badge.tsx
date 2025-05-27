import { Badge } from "@/components/ui/badge"

type ChangeOrderStageProps = {
  stage: "Pre-Production" | "In Production" | "Post-Production"
  className?: string
}

export function ChangeOrderStageBadge({ stage, className }: ChangeOrderStageProps) {
  return (
    <Badge
      variant={stage === "In Production" ? "destructive" : stage === "Pre-Production" ? "outline" : "secondary"}
      className={className}
    >
      {stage}
    </Badge>
  )
}

type ChangeOrderPriorityProps = {
  priority: "Normal" | "High" | "Expedited"
  className?: string
}

export function ChangeOrderPriorityBadge({ priority, className }: ChangeOrderPriorityProps) {
  return (
    <Badge
      variant={priority === "Expedited" ? "destructive" : priority === "High" ? "warning" : "outline"}
      className={className}
    >
      {priority}
    </Badge>
  )
}
