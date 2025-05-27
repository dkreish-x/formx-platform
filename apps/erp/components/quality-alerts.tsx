"use client"

import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QualityAlerts() {
  // This would be fetched from an API in a real implementation
  const alerts = [
    {
      id: "QA-001",
      issue: "Dimensional non-conformance",
      product: "Part XYZ-123",
      severity: "High",
      date: "2023-04-15",
      status: "Open",
    },
    {
      id: "QA-002",
      issue: "Surface finish defect",
      product: "Assembly ABC-456",
      severity: "Medium",
      date: "2023-04-14",
      status: "In Progress",
    },
    {
      id: "QA-003",
      issue: "Material hardness out of spec",
      product: "Component DEF-789",
      severity: "High",
      date: "2023-04-12",
      status: "Resolved",
    },
  ]

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "Medium":
        return <AlertCircle className="h-4 w-4 text-warning" />
      case "Low":
        return <CheckCircle2 className="h-4 w-4 text-success" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge variant="destructive">Open</Badge>
      case "In Progress":
        return <Badge variant="warning">In Progress</Badge>
      case "Resolved":
        return <Badge variant="success">Resolved</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quality Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{alert.issue}</p>
                  {getStatusBadge(alert.status)}
                </div>
                <p className="text-xs text-muted-foreground">{alert.product}</p>
                <p className="text-xs text-muted-foreground mt-1">Reported: {alert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
