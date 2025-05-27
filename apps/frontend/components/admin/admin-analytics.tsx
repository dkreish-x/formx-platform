"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

// Sample data
const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 16500 },
  { month: "May", revenue: 24500 },
  { month: "Jun", revenue: 22000 },
  { month: "Jul", revenue: 19500 },
  { month: "Aug", revenue: 21000 },
  { month: "Sep", revenue: 25000 },
  { month: "Oct", revenue: 27500 },
  { month: "Nov", revenue: 30000 },
  { month: "Dec", revenue: 32500 },
]

const serviceData = [
  { name: "Laser Cutting", value: 35 },
  { name: "CNC Milling", value: 25 },
  { name: "3D Printing", value: 15 },
  { name: "Sheet Metal", value: 10 },
  { name: "Welding", value: 8 },
  { name: "Coatings", value: 7 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

const ordersByServiceData = [
  { month: "Jan", laserCutting: 25, cncMilling: 18, printing: 12 },
  { month: "Feb", laserCutting: 30, cncMilling: 20, printing: 15 },
  { month: "Mar", laserCutting: 35, cncMilling: 25, printing: 18 },
  { month: "Apr", laserCutting: 32, cncMilling: 22, printing: 16 },
  { month: "May", laserCutting: 40, cncMilling: 28, printing: 20 },
  { month: "Jun", laserCutting: 38, cncMilling: 26, printing: 19 },
]

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select defaultValue="year">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => `$${value.toLocaleString()}`} />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services Breakdown</CardTitle>
            <CardDescription>Revenue distribution by service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Orders by Service</CardTitle>
            <CardDescription>Monthly order volume by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                laserCutting: {
                  label: "Laser Cutting",
                  color: "hsl(var(--chart-1))",
                },
                cncMilling: {
                  label: "CNC Milling",
                  color: "hsl(var(--chart-2))",
                },
                printing: {
                  label: "3D Printing",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersByServiceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="laserCutting" fill="var(--color-laserCutting)" name="Laser Cutting" />
                  <Bar dataKey="cncMilling" fill="var(--color-cncMilling)" name="CNC Milling" />
                  <Bar dataKey="printing" fill="var(--color-printing)" name="3D Printing" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
