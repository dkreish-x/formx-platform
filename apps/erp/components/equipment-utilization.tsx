"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Activity, Zap } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
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

// Mock utilization data over time
const utilizationHistoryData = [
  { date: "2025-04-01", "CNC Mill #1": 65, "CNC Lathe #2": 50, "CNC Mill #3": 30, "Inspection CMM": 40 },
  { date: "2025-04-08", "CNC Mill #1": 70, "CNC Lathe #2": 55, "CNC Mill #3": 45, "Inspection CMM": 45 },
  { date: "2025-04-15", "CNC Mill #1": 68, "CNC Lathe #2": 60, "CNC Mill #3": 50, "Inspection CMM": 50 },
  { date: "2025-04-22", "CNC Mill #1": 72, "CNC Lathe #2": 65, "CNC Mill #3": 48, "Inspection CMM": 55 },
  { date: "2025-04-29", "CNC Mill #1": 75, "CNC Lathe #2": 62, "CNC Mill #3": 47, "Inspection CMM": 60 },
  { date: "2025-05-06", "CNC Mill #1": 78, "CNC Lathe #2": 65, "CNC Mill #3": 45, "Inspection CMM": 55 },
]

// Mock performance metrics
const performanceMetrics = [
  { equipment: "CNC Mill #1", oee: 82, availability: 90, performance: 85, quality: 95 },
  { equipment: "CNC Lathe #2", oee: 75, availability: 85, performance: 80, quality: 92 },
  { equipment: "CNC Mill #3", oee: 60, availability: 70, performance: 75, quality: 90 },
  { equipment: "Inspection CMM", oee: 68, availability: 80, performance: 70, quality: 98 },
]

export function EquipmentUtilizationDashboard({ equipmentData }: { equipmentData: EquipmentData[] }) {
  // Create utilization chart config for the ChartContainer
  const utilizationChartConfig = equipmentData.reduce(
    (config, equipment) => {
      config[equipment.name] = {
        label: equipment.name,
        color: `hsl(${(Number.parseInt(equipment.id.replace(/\D/g, "")) * 50) % 360}, 70%, 50%)`,
      }
      return config
    },
    {} as Record<string, { label: string; color: string }>,
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Equipment Utilization Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={utilizationChartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={utilizationHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: "Utilization %", angle: -90, position: "insideLeft" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                {equipmentData.map((equipment) => (
                  <Line
                    key={equipment.id}
                    type="monotone"
                    dataKey={equipment.name}
                    stroke={`var(--color-${equipment.name.replace(/\s+/g, "-").toLowerCase()})`}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Equipment Effectiveness (OEE)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric) => (
              <Card key={metric.equipment}>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{metric.equipment}</h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">OEE</span>
                        <span className="text-sm font-medium">{metric.oee}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-full rounded-full ${
                            metric.oee > 80 ? "bg-green-500" : metric.oee > 60 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${metric.oee}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Availability</span>
                        <span className="text-xs">{metric.availability}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${metric.availability}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Performance</span>
                        <span className="text-xs">{metric.performance}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{ width: `${metric.performance}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Quality</span>
                        <span className="text-xs">{metric.quality}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div className="h-full rounded-full bg-green-500" style={{ width: `${metric.quality}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <CardTitle>Uptime Statistics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Uptime (MTD)</span>
                <span className="font-medium">652 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Daily Uptime</span>
                <span className="font-medium">21.7 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Unplanned Downtime</span>
                <span className="font-medium">12 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Planned Maintenance</span>
                <span className="font-medium">24 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              <CardTitle>Operational Metrics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Cycle Time</span>
                <span className="font-medium">18.5 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Setup Time (Avg.)</span>
                <span className="font-medium">42 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">First Pass Yield</span>
                <span className="font-medium">93.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Parts Per Hour</span>
                <span className="font-medium">4.8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-2 text-primary" />
              <CardTitle>Energy Usage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total kWh (MTD)</span>
                <span className="font-medium">12,540 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">kWh per Machine Hour</span>
                <span className="font-medium">17.2 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Peak Demand</span>
                <span className="font-medium">95 kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Energy Cost (MTD)</span>
                <span className="font-medium">$1,504.80</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
