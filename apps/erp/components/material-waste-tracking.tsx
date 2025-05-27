"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertCircle, ArrowUpDown, Download, FileText, Plus, Trash2, Upload } from "lucide-react"

// Sample data for waste tracking
const wasteData = [
  {
    id: 1,
    jobId: "JOB-1001",
    material: "Aluminum 6061",
    quantity: 12.5,
    unit: "kg",
    reason: "Setup error",
    date: "2023-05-10",
    cost: 187.5,
  },
  {
    id: 2,
    jobId: "JOB-1002",
    material: "Steel 1018",
    quantity: 8.2,
    unit: "kg",
    reason: "Material defect",
    date: "2023-05-11",
    cost: 65.6,
  },
  {
    id: 3,
    jobId: "JOB-1003",
    material: "Copper C110",
    quantity: 3.7,
    unit: "kg",
    reason: "Operator error",
    date: "2023-05-12",
    cost: 92.5,
  },
  {
    id: 4,
    jobId: "JOB-1004",
    material: "Aluminum 6061",
    quantity: 5.3,
    unit: "kg",
    reason: "Machine malfunction",
    date: "2023-05-13",
    cost: 79.5,
  },
  {
    id: 5,
    jobId: "JOB-1005",
    material: "Stainless 304",
    quantity: 7.1,
    unit: "kg",
    reason: "Design change",
    date: "2023-05-14",
    cost: 142.0,
  },
  {
    id: 6,
    jobId: "JOB-1006",
    material: "Brass C360",
    quantity: 2.8,
    unit: "kg",
    reason: "Setup error",
    date: "2023-05-15",
    cost: 84.0,
  },
  {
    id: 7,
    jobId: "JOB-1007",
    material: "Steel 1018",
    quantity: 10.4,
    unit: "kg",
    reason: "Operator error",
    date: "2023-05-16",
    cost: 83.2,
  },
  {
    id: 8,
    jobId: "JOB-1008",
    material: "Aluminum 6061",
    quantity: 6.9,
    unit: "kg",
    reason: "Material defect",
    date: "2023-05-17",
    cost: 103.5,
  },
]

// Chart data for material waste by type
const wasteByMaterial = [
  { name: "Aluminum 6061", value: 24.7 },
  { name: "Steel 1018", value: 18.6 },
  { name: "Copper C110", value: 3.7 },
  { name: "Stainless 304", value: 7.1 },
  { name: "Brass C360", value: 2.8 },
]

// Chart data for waste reasons
const wasteByReason = [
  { name: "Setup error", value: 15.3 },
  { name: "Material defect", value: 15.1 },
  { name: "Operator error", value: 14.1 },
  { name: "Machine malfunction", value: 5.3 },
  { name: "Design change", value: 7.1 },
]

// Chart data for waste trend
const wasteTrend = [
  { month: "Jan", waste: 42.5, cost: 637.5 },
  { month: "Feb", waste: 38.2, cost: 573.0 },
  { month: "Mar", waste: 45.7, cost: 685.5 },
  { month: "Apr", waste: 39.8, cost: 597.0 },
  { month: "May", waste: 56.9, cost: 853.5 },
]

// Colors for pie charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function MaterialWasteTracking() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("month")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter data based on search term
  const filteredData = wasteData.filter(
    (item) =>
      item.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort data based on column and direction
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Calculate total waste and cost
  const totalWaste = wasteData.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = wasteData.reduce((sum, item) => sum + item.cost, 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Material Waste Tracking</CardTitle>
        <CardDescription>Track and analyze material waste across jobs and materials</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Waste Details</TabsTrigger>
              <TabsTrigger value="analysis">Waste Analysis</TabsTrigger>
              <TabsTrigger value="entry">Waste Entry</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Waste</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalWaste.toFixed(1)} kg</div>
                  <p className="text-xs text-muted-foreground">+5.2% from previous period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Waste Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">+3.7% from previous period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Waste Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8%</div>
                  <p className="text-xs text-muted-foreground">-0.3% from previous period</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Waste Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wasteTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="waste" name="Waste (kg)" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="cost" name="Cost ($)" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Waste by Material</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[140px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={wasteByMaterial}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {wasteByMaterial.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Waste by Reason</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[140px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={wasteByReason}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {wasteByReason.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-72">
                <Input
                  placeholder="Search waste records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Waste
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("jobId")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Job ID
                        {sortColumn === "jobId" && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("material")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Material
                        {sortColumn === "material" && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("quantity")}
                        className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
                      >
                        Quantity
                        {sortColumn === "quantity" && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("reason")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Reason
                        {sortColumn === "reason" && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("date")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Date
                        {sortColumn === "date" && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("cost")}
                        className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
                      >
                        Cost
                        {sortColumn === "cost" && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.length > 0 ? (
                    sortedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.jobId}</TableCell>
                        <TableCell>{item.material}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No waste records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Top Waste Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: "Aluminum 6061", value: 24.7 },
                          { name: "Steel 1018", value: 18.6 },
                          { name: "Stainless 304", value: 7.1 },
                          { name: "Copper C110", value: 3.7 },
                          { name: "Brass C360", value: 2.8 },
                        ]}
                        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Waste (kg)" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Waste by Reason</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: "Setup error", value: 15.3 },
                          { name: "Material defect", value: 15.1 },
                          { name: "Operator error", value: 14.1 },
                          { name: "Design change", value: 7.1 },
                          { name: "Machine malfunction", value: 5.3 },
                        ]}
                        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Waste (kg)" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Waste Reduction Opportunities</CardTitle>
                  <Button variant="outline" size="sm">
                    Generate Report
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold">Setup Error Reduction</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Setup errors account for 15.3kg of waste. Implementing standardized setup procedures and
                          additional operator training could reduce this by up to 60%.
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold">Material Defect Prevention</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Material defects contribute to 15.1kg of waste. Implementing incoming material inspection and
                          supplier quality management could reduce this by up to 75%.
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold">Operator Training Program</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Operator errors account for 14.1kg of waste. A comprehensive training program and visual work
                          instructions could reduce this by up to 80%.
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="entry" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Record Material Waste</CardTitle>
                <CardDescription>Enter details about material waste for tracking and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="job-id">Job ID</Label>
                      <Select>
                        <SelectTrigger id="job-id">
                          <SelectValue placeholder="Select job" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="JOB-1001">JOB-1001</SelectItem>
                          <SelectItem value="JOB-1002">JOB-1002</SelectItem>
                          <SelectItem value="JOB-1003">JOB-1003</SelectItem>
                          <SelectItem value="JOB-1004">JOB-1004</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="material">Material</Label>
                      <Select>
                        <SelectTrigger id="material">
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aluminum-6061">Aluminum 6061</SelectItem>
                          <SelectItem value="steel-1018">Steel 1018</SelectItem>
                          <SelectItem value="copper-c110">Copper C110</SelectItem>
                          <SelectItem value="stainless-304">Stainless 304</SelectItem>
                          <SelectItem value="brass-c360">Brass C360</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <div className="flex gap-2">
                        <Input id="quantity" type="number" placeholder="0.00" />
                        <Select defaultValue="kg">
                          <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="lb">lb</SelectItem>
                            <SelectItem value="g">g</SelectItem>
                            <SelectItem value="oz">oz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cost">Cost</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          $
                        </span>
                        <Input id="cost" type="number" placeholder="0.00" className="pl-7" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason</Label>
                      <Select>
                        <SelectTrigger id="reason">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="setup-error">Setup error</SelectItem>
                          <SelectItem value="material-defect">Material defect</SelectItem>
                          <SelectItem value="operator-error">Operator error</SelectItem>
                          <SelectItem value="machine-malfunction">Machine malfunction</SelectItem>
                          <SelectItem value="design-change">Design change</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter any additional details about the waste..."
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Waste Record</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
