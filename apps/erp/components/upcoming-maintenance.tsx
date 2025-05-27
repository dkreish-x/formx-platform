"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, PenToolIcon as Tool } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UpcomingMaintenance() {
  // This would be fetched from an API in a real implementation
  const maintenance = [
    {
      id: "MAINT-001",
      equipment: "CNC Machine #3",
      type: "Preventive",
      scheduledDate: "2023-04-20",
      estimatedDuration: "4 hours",
      status: "Scheduled",
    },
    {
      id: "MAINT-002",
      equipment: "Assembly Line A",
      type: "Calibration",
      scheduledDate: "2023-04-22",
      estimatedDuration: "2 hours",
      status: "Scheduled",
    },
    {
      id: "MAINT-003",
      equipment: "Inspection Station #2",
      type: "Repair",
      scheduledDate: "2023-04-18",
      estimatedDuration: "3 hours",
      status: "In Progress",
    },
  ]

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Maintenance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {maintenance.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="mt-1">
                <Tool className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.equipment}</p>
                  <Badge
                    variant={
                      item.status === "Completed" ? "success" : item.status === "In Progress" ? "warning" : "default"
                    }
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.type} Maintenance</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.scheduledDate}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.estimatedDuration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
