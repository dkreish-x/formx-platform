"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Search, Plus, Settings, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { PredictiveMaintenanceSchedule } from "@/components/predictive-maintenance"
import { EquipmentUtilizationDashboard } from "@/components/equipment-utilization"

// Mock data for equipment
const equipmentData = [
  {
    id: "EQ-001",
    name: "CNC Mill #1",
    model: "Haas VF-2",
    status: "Operational",
    utilizationRate: 78,
    nextMaintenance: "2025-05-25",
    maintenanceType: "Preventive",
    lastMaintenance: "2025-02-25",
    healthScore: 92,
    location: "Machine Shop",
    department: "Production",
  },
  {
    id: "EQ-002",
    name: "CNC Lathe #2",
    model: "Mazak QTN 200MY",
    status: "Operational",
    utilizationRate: 65,
    nextMaintenance: "2025-05-18",
    maintenanceType: "Preventive",
    lastMaintenance: "2025-03-18",
    healthScore: 88,
    location: "Machine Shop",
    department: "Production",
  },
  {
    id: "EQ-003",
    name: "CNC Mill #3",
    model: "DMG MORI NHX 4000",
    status: "Needs Maintenance",
    utilizationRate: 45,
    nextMaintenance: "2025-05-12",
    maintenanceType: "Repair",
    lastMaintenance: "2025-01-12",
    healthScore: 72,
    location: "Machine Shop",
    department: "Production",
  },
  {
    id: "EQ-004",
    name: "Inspection CMM",
    model: "Zeiss CONTURA",
    status: "Operational",
    utilizationRate: 55,
    nextMaintenance: "2025-06-10",
    maintenanceType: "Preventive",
    lastMaintenance: "2025-03-10",
    healthScore: 96,
    location: "Quality Lab",
    department: "Quality",
  },
  {
    id: "EQ-005",
    name: "Anodizing Station",
    model: "Custom Setup A-200",
    status: "Down",
    utilizationRate: 0,
    nextMaintenance: "Immediate",
    maintenanceType: "Repair",
    lastMaintenance: "2025-04-01",
    healthScore: 35,
    location: "Finishing Area",
    department: "Finishing",
  },
]

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredEquipment = equipmentData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "maintenance" && (item.status === "Needs Maintenance" || item.status === "Down")) ||
      (activeTab === "operational" && item.status === "Operational")

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equipment Management</h1>
          <p className="text-muted-foreground">Monitor, maintain, and optimize manufacturing equipment</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search equipment..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/maintenance/equipment/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Equipment</p>
                <h3 className="text-2xl font-bold">{equipmentData.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Operational</p>
                <h3 className="text-2xl font-bold">
                  {equipmentData.filter((eq) => eq.status === "Operational").length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Needs Maintenance</p>
                <h3 className="text-2xl font-bold">
                  {equipmentData.filter((eq) => eq.status === "Needs Maintenance").length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Down</p>
                <h3 className="text-2xl font-bold">{equipmentData.filter((eq) => eq.status === "Down").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Equipment</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="maintenance">Needs Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Directory</CardTitle>
              <CardDescription>View and manage all manufacturing equipment</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium p-4">ID</th>
                      <th className="text-left font-medium p-4">Equipment</th>
                      <th className="text-left font-medium p-4">Model</th>
                      <th className="text-left font-medium p-4">Status</th>
                      <th className="text-left font-medium p-4">Utilization</th>
                      <th className="text-left font-medium p-4">Health Score</th>
                      <th className="text-left font-medium p-4">Next Maintenance</th>
                      <th className="text-right font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEquipment.map((equipment) => (
                      <tr key={equipment.id} className="border-b transition-colors hover:bg-primary/5">
                        <td className="p-4 font-medium">{equipment.id}</td>
                        <td className="p-4">
                          <div className="font-medium">{equipment.name}</div>
                          <div className="text-xs text-muted-foreground">{equipment.location}</div>
                        </td>
                        <td className="p-4">{equipment.model}</td>
                        <td className="p-4">
                          <Badge
                            variant={
                              equipment.status === "Operational"
                                ? "default"
                                : equipment.status === "Needs Maintenance"
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {equipment.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  equipment.utilizationRate > 80
                                    ? "bg-green-500"
                                    : equipment.utilizationRate > 50
                                      ? "bg-blue-500"
                                      : equipment.utilizationRate > 0
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                }`}
                                style={{ width: `${equipment.utilizationRate}%` }}
                              ></div>
                            </div>
                            <span>{equipment.utilizationRate}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  equipment.healthScore > 80
                                    ? "bg-green-500"
                                    : equipment.healthScore > 50
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${equipment.healthScore}%` }}
                              ></div>
                            </div>
                            <span>{equipment.healthScore}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{equipment.nextMaintenance}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/maintenance/equipment/${equipment.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Equipment</CardTitle>
              <CardDescription>Equipment currently in working condition</CardDescription>
            </CardHeader>
            <CardContent>
              <EquipmentUtilizationDashboard
                equipmentData={equipmentData.filter((eq) => eq.status === "Operational")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Required</CardTitle>
              <CardDescription>Equipment that needs attention</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictiveMaintenanceSchedule
                equipmentData={equipmentData.filter((eq) => eq.status === "Needs Maintenance" || eq.status === "Down")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
