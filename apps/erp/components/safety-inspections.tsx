"use client"

import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Calendar, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SafetyInspections() {
  // This would be fetched from an API in a real implementation
  const inspections = [
    {
      id: "INSP-001",
      area: "Production Floor - Zone A",
      inspector: "John Smith",
      scheduledDate: "2023-04-25",
      status: "Scheduled",
    },
    {
      id: "INSP-002",
      area: "Chemical Storage",
      inspector: "Sarah Johnson",
      scheduledDate: "2023-04-18",
      status: "Completed",
      findings: "Minor issues found",
    },
    {
      id: "INSP-003",
      area: "Loading Dock",
      inspector: "Michael Brown",
      scheduledDate: "2023-04-20",
      status: "In Progress",
    },
  ]

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Safety Inspections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inspections.map((inspection) => (
            <div
              key={inspection.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="mt-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{inspection.area}</p>
                  <Badge
                    variant={
                      inspection.status === "Completed"
                        ? "success"
                        : inspection.status === "In Progress"
                          ? "warning"
                          : "default"
                    }
                    className="text-xs"
                  >
                    {inspection.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    {inspection.inspector}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {inspection.scheduledDate}
                  </div>
                </div>
                {inspection.findings && (
                  <p className="text-xs text-muted-foreground mt-2">Findings: {inspection.findings}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
