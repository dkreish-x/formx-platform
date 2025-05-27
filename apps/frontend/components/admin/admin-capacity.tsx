"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample data
const machines = [
  {
    id: "LC-001",
    name: "Fiber Laser Cutter 1",
    type: "Laser Cutting",
    status: "Operational",
    utilization: 85,
    nextMaintenance: "Jun 15, 2023",
    currentJob: "ORD-2023-1234",
    estimatedCompletion: "May 18, 2023",
  },
  {
    id: "LC-002",
    name: "Fiber Laser Cutter 2",
    type: "Laser Cutting",
    status: "Operational",
    utilization: 70,
    nextMaintenance: "Jul 05, 2023",
    currentJob: "ORD-2023-1236",
    estimatedCompletion: "May 17, 2023",
  },
  {
    id: "CNC-001",
    name: "CNC Mill 1",
    type: "CNC Milling",
    status: "Maintenance",
    utilization: 0,
    nextMaintenance: "In Progress",
    currentJob: null,
    estimatedCompletion: null,
  },
  {
    id: "CNC-002",
    name: "CNC Mill 2",
    type: "CNC Milling",
    status: "Operational",
    utilization: 90,
    nextMaintenance: "Jun 20, 2023",
    currentJob: "ORD-2023-1233",
    estimatedCompletion: "May 19, 2023",
  },
  {
    id: "3DP-001",
    name: "Industrial 3D Printer 1",
    type: "3D Printing",
    status: "Operational",
    utilization: 65,
    nextMaintenance: "Jun 10, 2023",
    currentJob: "ORD-2023-1238",
    estimatedCompletion: "May 16, 2023",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Operational":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          Operational
        </Badge>
      )
    case "Maintenance":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Maintenance
        </Badge>
      )
    case "Offline":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
          Offline
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getUtilizationColor = (utilization: number) => {
  if (utilization >= 80) return "bg-green-500"
  if (utilization >= 50) return "bg-yellow-500"
  return "bg-red-500"
}

export default function AdminCapacity() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Machines</TabsTrigger>
          <TabsTrigger value="laser">Laser Cutting</TabsTrigger>
          <TabsTrigger value="cnc">CNC Milling</TabsTrigger>
          <TabsTrigger value="3d">3D Printing</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {machines.map((machine) => (
              <Card key={machine.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{machine.name}</CardTitle>
                      <CardDescription>
                        {machine.type} - {machine.id}
                      </CardDescription>
                    </div>
                    {getStatusBadge(machine.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Utilization</span>
                        <span className="text-sm font-medium">{machine.utilization}%</span>
                      </div>
                      <Progress value={machine.utilization} className={getUtilizationColor(machine.utilization)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Next Maintenance</p>
                        <p className="font-medium">{machine.nextMaintenance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Job</p>
                        <p className="font-medium">{machine.currentJob || "None"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Completion</p>
                        <p className="font-medium">{machine.estimatedCompletion || "N/A"}</p>
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="laser" className="mt-6">
          <div className="space-y-4">
            {machines
              .filter((m) => m.type === "Laser Cutting")
              .map((machine) => (
                <Card key={machine.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{machine.name}</CardTitle>
                        <CardDescription>
                          {machine.type} - {machine.id}
                        </CardDescription>
                      </div>
                      {getStatusBadge(machine.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Utilization</span>
                          <span className="text-sm font-medium">{machine.utilization}%</span>
                        </div>
                        <Progress value={machine.utilization} className={getUtilizationColor(machine.utilization)} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Maintenance</p>
                          <p className="font-medium">{machine.nextMaintenance}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Current Job</p>
                          <p className="font-medium">{machine.currentJob || "None"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Completion</p>
                          <p className="font-medium">{machine.estimatedCompletion || "N/A"}</p>
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Similar content for other tabs */}
      </Tabs>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">Maintenance</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Offline</span>
          </div>
        </div>
        <Button>Schedule Maintenance</Button>
      </div>
    </div>
  )
}
