"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for capacity charts
const weeklyCapacityData = [
  { day: "Mon", capacity: 100, utilized: 85, available: 15 },
  { day: "Tue", capacity: 100, utilized: 90, available: 10 },
  { day: "Wed", capacity: 100, utilized: 75, available: 25 },
  { day: "Thu", capacity: 100, utilized: 95, available: 5 },
  { day: "Fri", capacity: 100, utilized: 80, available: 20 },
  { day: "Sat", capacity: 50, utilized: 30, available: 20 },
  { day: "Sun", capacity: 0, utilized: 0, available: 0 },
]

const monthlyCapacityData = [
  { week: "Week 1", capacity: 500, utilized: 450, available: 50 },
  { week: "Week 2", capacity: 500, utilized: 475, available: 25 },
  { week: "Week 3", capacity: 500, utilized: 425, available: 75 },
  { week: "Week 4", capacity: 500, utilized: 490, available: 10 },
]

const departmentCapacityData = [
  { department: "Milling", capacity: 160, utilized: 140, available: 20 },
  { department: "Turning", capacity: 120, utilized: 100, available: 20 },
  { department: "Grinding", capacity: 80, utilized: 75, available: 5 },
  { department: "Assembly", capacity: 200, utilized: 150, available: 50 },
  { department: "Finishing", capacity: 100, utilized: 90, available: 10 },
  { department: "QC", capacity: 120, utilized: 100, available: 20 },
]

export function ProductionCapacityChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Production Capacity</CardTitle>
        <CardDescription>Analyze production capacity and utilization</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="department">By Department</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-4">
            <ChartContainer
              config={{
                utilized: {
                  label: "Utilized Capacity",
                  color: "hsl(var(--chart-1))",
                },
                available: {
                  label: "Available Capacity",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyCapacityData} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="utilized" stackId="a" fill="var(--color-utilized)" name="Utilized" />
                  <Bar dataKey="available" stackId="a" fill="var(--color-available)" name="Available" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="monthly" className="mt-4">
            <ChartContainer
              config={{
                utilized: {
                  label: "Utilized Capacity",
                  color: "hsl(var(--chart-1))",
                },
                available: {
                  label: "Available Capacity",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCapacityData} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="utilized" stackId="a" fill="var(--color-utilized)" name="Utilized" />
                  <Bar dataKey="available" stackId="a" fill="var(--color-available)" name="Available" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="department" className="mt-4">
            <ChartContainer
              config={{
                utilized: {
                  label: "Utilized Capacity",
                  color: "hsl(var(--chart-1))",
                },
                available: {
                  label: "Available Capacity",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentCapacityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="department" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="utilized" stackId="a" fill="var(--color-utilized)" name="Utilized" />
                  <Bar dataKey="available" stackId="a" fill="var(--color-available)" name="Available" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
