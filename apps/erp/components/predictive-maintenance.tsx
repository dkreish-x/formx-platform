"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, AlertTriangle, PenToolIcon as Tool, ArrowRight } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EquipmentData {
  id: string
  name: string
  model: string
  status: string
  utilizationRate: number
  nextMaintenance: string
  maintenanceType: string
  lastMaintenance: string
  healthScore: number
  location: string
  department: string
}

// Mock maintenance history data
const maintenanceHistory = [
  {
    id: 1,
    equipmentId: "EQ-003",
    date: "2025-01-12",
    type: "Preventive",
    technicianId: "TECH-001",
    findings: "Regular wear on spindle bearings",
    actionTaken: "Replaced spindle bearings",
    parts: "SB-2045, LUB-100",
    downtime: 4,
  },
  {
    id: 2,
    equipmentId: "EQ-005",
    date: "2025-04-01",
    type: "Preventive",
    technicianId: "TECH-002",
    findings: "Corrosion on tank walls",
    actionTaken: "Cleaned and applied protective coating",
    parts: "COAT-304",
    downtime: 2,
  },
  {
    id: 3,
    equipmentId: "EQ-001",
    date: "2025-02-25",
    type: "Preventive",
    technicianId: "TECH-001",
    findings: "Normal wear on tool changer",
    actionTaken: "Lubricated and adjusted",
    parts: "LUB-100",
    downtime: 1,
  },
  {
    id: 4,
    equipmentId: "EQ-002",
    date: "2025-03-18",
    type: "Preventive",
    technicianId: "TECH-003",
    findings: "Tool turret indexing slow",
    actionTaken: "Adjusted timing and lubricated",
    parts: "LUB-100",
    downtime: 2,
  },
  {
    id: 5,
    equipmentId: "EQ-004",
    date: "2025-03-10",
    type: "Calibration",
    technicianId: "TECH-004",
    findings: "Within calibration specs",
    actionTaken: "Full calibration performed",
    parts: "",
    downtime: 3,
  },
]

// Predictive maintenance indicators
const predictiveIndicators = [
  { name: "Vibration Analysis", threshold: 75, current: 68, unit: "mm/s", status: "Normal" },
  { name: "Temperature", threshold: 65, current: 72, unit: "°C", status: "Warning" },
  { name: "Power Consumption", threshold: 80, current: 85, unit: "kW", status: "Warning" },
  { name: "Noise Level", threshold: 70, current: 65, unit: "dB", status: "Normal" },
  { name: "Oil Analysis", threshold: 50, current: 62, unit: "ppm", status: "Critical" },
]

export function PredictiveMaintenanceSchedule({ equipmentData }: { equipmentData: EquipmentData[] }) {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    equipmentData.length > 0 ? equipmentData[0].id : null,
  )

  // Filter maintenance history for the selected equipment
  const equipmentHistory = maintenanceHistory.filter(
    (history) => selectedEquipment && history.equipmentId === selectedEquipment,
  )

  const selectedEquipmentData = equipmentData.find((eq) => eq.id === selectedEquipment)

  // Format data for the predictive maintenance chart
  const chartData = predictiveIndicators.map((indicator) => ({
    name: indicator.name,
    current: indicator.current,
    threshold: indicator.threshold,
    unit: indicator.unit,
    status: indicator.status,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {equipmentData.map((equipment) => (
            <Card
              key={equipment.id}
              className={`cursor-pointer transition-all ${
                selectedEquipment === equipment.id ? "border-primary ring-1 ring-primary" : ""
              }`}
              onClick={() => setSelectedEquipment(equipment.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
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
                  <span className="text-xs text-muted-foreground">{equipment.id}</span>
                </div>
                <h3 className="font-medium">{equipment.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-sm">
                    <Tool className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{equipment.model}</span>
                  </div>
                  <span className="text-sm font-medium">Health: {equipment.healthScore}%</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{equipment.nextMaintenance}</span>
                  </div>
                  <span className="text-xs py-0.5 px-1.5 rounded-sm bg-primary/10 text-primary">
                    {equipment.maintenanceType}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedEquipmentData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Maintenance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    current: {
                      label: "Current Value",
                      color: "hsl(var(--chart-1))",
                    },
                    threshold: {
                      label: "Threshold",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="current" fill="var(--color-current)" name="Current Value" />
                      <Bar dataKey="threshold" fill="var(--color-threshold)" name="Threshold" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {predictiveIndicators.map((indicator) => (
                    <div key={indicator.name} className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{indicator.name}</span>
                        <Badge
                          variant={
                            indicator.status === "Normal"
                              ? "default"
                              : indicator.status === "Warning"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {indicator.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">Current:</span>
                        <span className="font-medium">
                          {indicator.current} {indicator.unit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">Threshold:</span>
                        <span className="font-medium">
                          {indicator.threshold} {indicator.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
              </CardHeader>
              <CardContent>
                {equipmentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {equipmentHistory.map((history, index) => (
                      <div key={history.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                            <span className="font-medium">{history.date}</span>
                          </div>
                          <Badge variant="outline">{history.type}</Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <p className="text-muted-foreground">Findings:</p>
                          <p>{history.findings}</p>
                        </div>
                        <div className="mt-2 text-sm">
                          <p className="text-muted-foreground">Action Taken:</p>
                          <p>{history.actionTaken}</p>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <span className="text-xs text-muted-foreground">Technician: {history.technicianId}</span>
                          <span className="text-xs text-muted-foreground">Downtime: {history.downtime} hrs</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">No maintenance history</h3>
                    <p className="text-sm text-muted-foreground mt-1">This equipment has no recorded maintenance.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-md bg-amber-50 border border-amber-200">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-700">Schedule maintenance soon</h4>
                      <p className="text-sm text-amber-600 mt-1">
                        Oil analysis indicates potential issue with gearbox. Schedule inspection within 7 days.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Schedule Now
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-md bg-blue-50 border border-blue-200">
                    <div className="flex-shrink-0">
                      <Tool className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700">Order replacement parts</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        Recommended to order spindle bearings (SB-2045) before next maintenance cycle.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Order Parts
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button>
          Generate Maintenance Work Orders
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
