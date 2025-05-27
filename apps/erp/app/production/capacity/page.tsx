"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Download, Filter, Plus, RefreshCw } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for the charts
const resourceUtilizationData = [
  { name: "CNC Mill 1", current: 85, target: 90 },
  { name: "CNC Mill 2", current: 72, target: 90 },
  { name: "CNC Lathe 1", current: 65, target: 85 },
  { name: "CNC Lathe 2", current: 78, target: 85 },
  { name: "Laser Cutter", current: 92, target: 80 },
  { name: "3D Printer", current: 45, target: 70 },
  { name: "Assembly", current: 88, target: 85 },
  { name: "Finishing", current: 62, target: 75 },
]

const capacityTrendData = [
  { name: "Jan", actual: 65, forecast: 70 },
  { name: "Feb", actual: 68, forecast: 72 },
  { name: "Mar", actual: 75, forecast: 75 },
  { name: "Apr", actual: 82, forecast: 78 },
  { name: "May", actual: 85, forecast: 82 },
  { name: "Jun", actual: 80, forecast: 85 },
  { name: "Jul", actual: null, forecast: 88 },
  { name: "Aug", actual: null, forecast: 90 },
  { name: "Sep", actual: null, forecast: 92 },
  { name: "Oct", actual: null, forecast: 88 },
  { name: "Nov", actual: null, forecast: 85 },
  { name: "Dec", actual: null, forecast: 82 },
]

const bottleneckData = [
  { name: "CNC Mill 1", value: 15 },
  { name: "CNC Mill 2", value: 8 },
  { name: "CNC Lathe 1", value: 25 },
  { name: "CNC Lathe 2", value: 12 },
  { name: "Laser Cutter", value: 5 },
  { name: "3D Printer", value: 2 },
  { name: "Assembly", value: 28 },
  { name: "Finishing", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FF6B6B", "#6B66FF"]

export default function CapacityPlanningPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Capacity Planning</h1>
          <p className="text-muted-foreground">Analyze and optimize production capacity</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Capacity</CardTitle>
                <CardDescription>Overall production capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold">78%</p>
                    <p className="text-sm text-muted-foreground">of maximum capacity</p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CalendarIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "78%" }}></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>Target: 85%</span>
                  <span>100%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resource Utilization</CardTitle>
                <CardDescription>By department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resourceUtilizationData.slice(0, 5).map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">{item.current}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.current >= item.target ? "bg-green-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${item.current}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <Button variant="link" className="p-0 h-auto text-xs">
                    View all resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Capacity Forecast</CardTitle>
                <CardDescription>Next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold">+12%</p>
                    <p className="text-sm text-muted-foreground">Expected increase</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Update
                    </Button>
                  </div>
                </div>
                <div className="mt-4 h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={capacityTrendData.slice(0, 6)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>Current vs target utilization by resource</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceUtilizationData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Current Utilization" fill="#8884d8" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="target" name="Target Utilization" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>Current allocation across all resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceUtilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Current Utilization" fill="#8884d8" />
                    <Bar dataKey="target" name="Target Utilization" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Capacity Forecast</CardTitle>
              <CardDescription>12-month capacity forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={capacityTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Actual Capacity"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      name="Forecasted Capacity"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottlenecks" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Bottlenecks</CardTitle>
              <CardDescription>Resources causing production delays</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bottleneckData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {bottleneckData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-4">Top Bottlenecks</h3>
                <div className="space-y-4">
                  {bottleneckData
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 4)
                    .map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{item.value}%</span>
                          <span className="text-muted-foreground ml-2">of delays</span>
                        </div>
                      </div>
                    ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
