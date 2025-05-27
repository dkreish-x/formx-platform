import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, PenToolIcon as Tool } from "lucide-react"

// Mock data for schedule conflicts
const conflicts = [
  {
    id: "CONF-001",
    type: "Resource",
    description: "CNC Mill #2 is scheduled for two operations at the same time",
    affectedOrders: ["WO-1042", "WO-1045"],
    timeSlot: "2025-05-15 10:00 - 12:00",
    severity: "High",
  },
  {
    id: "CONF-002",
    type: "Operator",
    description: "John Smith is assigned to multiple tasks simultaneously",
    affectedOrders: ["WO-1042", "WO-1048"],
    timeSlot: "2025-05-16 14:00 - 16:00",
    severity: "Medium",
  },
  {
    id: "CONF-003",
    type: "Maintenance",
    description: "Scheduled maintenance conflicts with production schedule",
    affectedOrders: ["WO-1050"],
    timeSlot: "2025-05-17 09:00 - 11:00",
    severity: "Low",
  },
]

export function ScheduleConflicts() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Schedule Conflicts</CardTitle>
          <CardDescription>Detected scheduling conflicts that need resolution</CardDescription>
        </div>
        <Badge variant="destructive" className="flex items-center">
          <AlertTriangle className="mr-1 h-3 w-3" />
          {conflicts.length} Conflicts
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conflicts.map((conflict) => (
            <div key={conflict.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium flex items-center">
                    <span className="mr-2">{conflict.description}</span>
                    <Badge
                      variant={
                        conflict.severity === "High"
                          ? "destructive"
                          : conflict.severity === "Medium"
                            ? "warning"
                            : "outline"
                      }
                    >
                      {conflict.severity}
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Conflict ID: {conflict.id}</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{conflict.timeSlot}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Tool className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Type: {conflict.type} Conflict</span>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Affected Work Orders: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {conflict.affectedOrders.map((order, index) => (
                      <Badge key={index} variant="outline">
                        {order}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button size="sm" variant="outline">
                  Resolve Conflict
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
