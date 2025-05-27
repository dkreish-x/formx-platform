"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for resources
const machines = [
  { id: "M001", name: "CNC Mill #1", status: "Available", utilization: 65, nextMaintenance: "2025-05-20" },
  { id: "M002", name: "CNC Mill #2", status: "In Use", utilization: 85, nextMaintenance: "2025-05-25" },
  { id: "M003", name: "CNC Lathe #1", status: "Maintenance", utilization: 0, nextMaintenance: "2025-05-10" },
  { id: "M004", name: "CNC Lathe #2", status: "Available", utilization: 40, nextMaintenance: "2025-06-05" },
  { id: "M005", name: "Vertical Mill", status: "In Use", utilization: 90, nextMaintenance: "2025-05-30" },
  { id: "M006", name: "Horizontal Mill", status: "Available", utilization: 50, nextMaintenance: "2025-06-10" },
]

const operators = [
  { id: "OP001", name: "John Smith", role: "CNC Operator", availability: "Available", skills: ["Milling", "Turning"] },
  {
    id: "OP002",
    name: "Sarah Johnson",
    role: "CNC Programmer",
    availability: "Busy",
    skills: ["Programming", "Setup"],
  },
  {
    id: "OP003",
    name: "Mike Williams",
    role: "Machine Operator",
    availability: "Available",
    skills: ["Milling", "Grinding"],
  },
  { id: "OP004", name: "Lisa Brown", role: "Quality Inspector", availability: "Busy", skills: ["Inspection", "CMM"] },
]

export function ResourceAllocation() {
  const [selectedTab, setSelectedTab] = useState("machines")
  const [selectedResources, setSelectedResources] = useState<string[]>([])

  const toggleResourceSelection = (id: string) => {
    if (selectedResources.includes(id)) {
      setSelectedResources(selectedResources.filter((resourceId) => resourceId !== id))
    } else {
      setSelectedResources([...selectedResources, id])
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Resource Allocation</CardTitle>
        <CardDescription>Manage and allocate production resources</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="machines" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="machines">Machines</TabsTrigger>
            <TabsTrigger value="operators">Operators</TabsTrigger>
          </TabsList>

          <TabsContent value="machines" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {machines.filter((m) => m.status === "Available").length} of {machines.length} machines available
              </div>
              <Button size="sm" disabled={selectedResources.length === 0}>
                Assign Selected
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {machines.map((machine) => (
                <div
                  key={machine.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedResources.includes(machine.id) ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => toggleResourceSelection(machine.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{machine.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {machine.id}</p>
                    </div>
                    <Badge
                      variant={
                        machine.status === "Available"
                          ? "default"
                          : machine.status === "In Use"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {machine.status}
                    </Badge>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Utilization</span>
                      <span>{machine.utilization}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          machine.utilization > 80
                            ? "bg-amber-500"
                            : machine.utilization > 0
                              ? "bg-primary"
                              : "bg-destructive"
                        }`}
                        style={{ width: `${machine.utilization}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Next maintenance: {machine.nextMaintenance}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="operators" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {operators.filter((o) => o.availability === "Available").length} of {operators.length} operators
                available
              </div>
              <Button size="sm" disabled={selectedResources.length === 0}>
                Assign Selected
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operators.map((operator) => (
                <div
                  key={operator.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedResources.includes(operator.id) ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => toggleResourceSelection(operator.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{operator.name}</h3>
                      <p className="text-sm text-muted-foreground">{operator.role}</p>
                    </div>
                    <Badge variant={operator.availability === "Available" ? "default" : "warning"}>
                      {operator.availability}
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm text-muted-foreground mb-1">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {operator.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
