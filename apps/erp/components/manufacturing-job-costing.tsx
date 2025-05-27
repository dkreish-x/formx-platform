"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Clock,
  Search,
  Filter,
  BarChart2,
  AlertTriangle,
  CheckCircle,
  Download,
  PieChart,
  TrendingUp,
  TrendingDown,
  Layers,
  Printer,
  Scissors,
  PenToolIcon as Tool,
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Cell, CartesianGrid, Pie } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for job costing
const jobCostingData = [
  {
    id: "JC-001",
    workOrder: "WO-2023-0542",
    customer: "Acme Manufacturing",
    project: "Control Panel Brackets",
    status: "In Progress",
    estimatedCost: 2850.0,
    actualCost: 2450.0,
    variance: -400.0,
    variancePercent: -14.04,
    estimatedHours: 24,
    actualHours: 21.5,
    materialCost: 850.0,
    laborCost: 1075.0,
    machineCost: 525.0,
    overheadCost: 0,
    profit: 1350.0,
    profitMargin: 35.53,
    completionPercent: 85,
    processType: "Laser Cutting",
  },
  {
    id: "JC-002",
    workOrder: "WO-2023-0541",
    customer: "TechPro Industries",
    project: "Server Enclosures",
    status: "In Progress",
    estimatedCost: 5200.0,
    actualCost: 5650.0,
    variance: 450.0,
    variancePercent: 8.65,
    estimatedHours: 40,
    actualHours: 43.5,
    materialCost: 2250.0,
    laborCost: 2175.0,
    machineCost: 1225.0,
    overheadCost: 0,
    profit: 1850.0,
    profitMargin: 24.67,
    completionPercent: 65,
    processType: "Sheet Metal Fabrication",
  },
  {
    id: "JC-003",
    workOrder: "WO-2023-0540",
    customer: "Global Dynamics",
    project: "Precision Gears",
    status: "Complete",
    estimatedCost: 3750.0,
    actualCost: 3600.0,
    variance: -150.0,
    variancePercent: -4.0,
    estimatedHours: 32,
    actualHours: 30,
    materialCost: 1200.0,
    laborCost: 1500.0,
    machineCost: 900.0,
    overheadCost: 0,
    profit: 2400.0,
    profitMargin: 40.0,
    completionPercent: 100,
    processType: "CNC Machining",
  },
  {
    id: "JC-004",
    workOrder: "WO-2023-0539",
    customer: "Precision Engineering",
    project: "Cooling System Components",
    status: "Complete",
    estimatedCost: 1850.0,
    actualCost: 2100.0,
    variance: 250.0,
    variancePercent: 13.51,
    estimatedHours: 16,
    actualHours: 18.5,
    materialCost: 650.0,
    laborCost: 925.0,
    machineCost: 525.0,
    overheadCost: 0,
    profit: 900.0,
    profitMargin: 30.0,
    completionPercent: 100,
    processType: "3D Printing",
  },
  {
    id: "JC-005",
    workOrder: "WO-2023-0538",
    customer: "Innovative Metals",
    project: "Control Panel Housing",
    status: "On Hold",
    estimatedCost: 4250.0,
    actualCost: 2125.0,
    variance: -2125.0,
    variancePercent: -50.0,
    estimatedHours: 36,
    actualHours: 18,
    materialCost: 1125.0,
    laborCost: 750.0,
    machineCost: 250.0,
    overheadCost: 0,
    profit: 0,
    profitMargin: 0,
    completionPercent: 50,
    processType: "Sheet Metal Fabrication",
  },
]

// Cost breakdown data for pie chart
const costBreakdownData = [
  { name: "Material", value: 850 },
  { name: "Labor", value: 1075 },
  { name: "Machine", value: 525 },
]

// Process profitability data
const processProfitabilityData = [
  { process: "Laser Cutting", margin: 35.5 },
  { process: "CNC Machining", margin: 40.0 },
  { process: "Sheet Metal", margin: 24.7 },
  { process: "3D Printing", margin: 30.0 },
]

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function ManufacturingJobCosting() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedJob, setSelectedJob] = useState<string | null>("JC-001")

  const filteredJobs = jobCostingData.filter((job) => {
    const matchesSearch =
      job.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.project.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "inProgress" && job.status === "In Progress") ||
      (activeTab === "complete" && job.status === "Complete") ||
      (activeTab === "onHold" && job.status === "On Hold")

    return matchesSearch && matchesTab
  })

  const selectedJobData = jobCostingData.find((job) => job.id === selectedJob)

  // Calculate totals
  const totalEstimatedCost = jobCostingData.reduce((sum, job) => sum + job.estimatedCost, 0)
  const totalActualCost = jobCostingData.reduce((sum, job) => sum + job.actualCost, 0)
  const totalProfit = jobCostingData.reduce((sum, job) => sum + job.profit, 0)
  const averageProfitMargin = (totalProfit / totalActualCost) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manufacturing Job Costing</h2>
          <p className="text-muted-foreground">Track and analyze costs for precision manufacturing processes</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <BarChart2 className="mr-2 h-4 w-4" />
            Cost Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <h3 className="text-2xl font-bold">{jobCostingData.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Layers className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Profit Margin</p>
                <h3 className="text-2xl font-bold">{averageProfitMargin.toFixed(2)}%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost Variance</p>
                <h3 className="text-2xl font-bold">
                  {(((totalActualCost - totalEstimatedCost) / totalEstimatedCost) * 100).toFixed(2)}%
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Profit</p>
                <h3 className="text-2xl font-bold">
                  ${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Job List</CardTitle>
              <CardDescription>View and manage manufacturing job costs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                  <TabsTrigger value="complete">Complete</TabsTrigger>
                  <TabsTrigger value="onHold">On Hold</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedJob === job.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedJob(job.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{job.project}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.workOrder} • {job.customer}
                          </p>
                        </div>
                        <Badge
                          variant={
                            job.status === "Complete"
                              ? "default"
                              : job.status === "In Progress"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Est. Cost:</span>
                          <p>
                            $
                            {job.estimatedCost.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Actual Cost:</span>
                          <p>
                            $
                            {job.actualCost.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Completion</span>
                          <span>{job.completionPercent}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              job.status === "Complete"
                                ? "bg-green-500"
                                : job.status === "In Progress"
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                            }`}
                            style={{ width: `${job.completionPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{job.actualHours} hrs</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className={job.variancePercent < 0 ? "text-green-600" : "text-red-600"}>
                            {job.variancePercent < 0 ? "" : "+"}
                            {job.variancePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="inProgress" className="space-y-4 mt-4">
                  {filteredJobs
                    .filter((job) => job.status === "In Progress")
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedJob === job.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedJob(job.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{job.project}</h3>
                            <p className="text-sm text-muted-foreground">
                              {job.workOrder} • {job.customer}
                            </p>
                          </div>
                          <Badge variant="secondary">In Progress</Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Est. Cost:</span>
                            <p>
                              $
                              {job.estimatedCost.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Actual Cost:</span>
                            <p>
                              $
                              {job.actualCost.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Completion</span>
                            <span>{job.completionPercent}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-blue-500"
                              style={{ width: `${job.completionPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center text-xs">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{job.actualHours} hrs</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className={job.variancePercent < 0 ? "text-green-600" : "text-red-600"}>
                              {job.variancePercent < 0 ? "" : "+"}
                              {job.variancePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="complete" className="space-y-4 mt-4">
                  {filteredJobs
                    .filter((job) => job.status === "Complete")
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedJob === job.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedJob(job.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{job.project}</h3>
                            <p className="text-sm text-muted-foreground">
                              {job.workOrder} • {job.customer}
                            </p>
                          </div>
                          <Badge variant="default">Complete</Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Est. Cost:</span>
                            <p>
                              $
                              {job.estimatedCost.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Actual Cost:</span>
                            <p>
                              $
                              {job.actualCost.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Completion</span>
                            <span>100%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-green-500 w-full" />
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center text-xs">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{job.actualHours} hrs</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className={job.variancePercent < 0 ? "text-green-600" : "text-red-600"}>
                              {job.variancePercent < 0 ? "" : "+"}
                              {job.variancePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="onHold" className="space-y-4 mt-4">
                  {filteredJobs
                    .filter((job) => job.status === "On Hold")
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedJob === job.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedJob(job.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{job.project}</h3>
                            <p className="text-sm text-muted-foreground">
                              {job.workOrder} • {job.customer}
                            </p>
                          </div>
                          <Badge variant="destructive">On Hold</Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Est. Cost:</span>
                            <p>
                              $
                              {job.estimatedCost.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Actual Cost:</span>
                            <p>
                              $
                              {job.actualCost.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Completion</span>
                            <span>{job.completionPercent}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-amber-500"
                              style={{ width: `${job.completionPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center text-xs">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{job.actualHours} hrs</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className={job.variancePercent < 0 ? "text-green-600" : "text-red-600"}>
                              {job.variancePercent < 0 ? "" : "+"}
                              {job.variancePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Job Cost Analysis</CardTitle>
                  <CardDescription>
                    {selectedJobData
                      ? `${selectedJobData.project} (${selectedJobData.workOrder})`
                      : "Select a job to view details"}
                  </CardDescription>
                </div>
                {selectedJobData && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedJobData ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                          <h3 className="text-3xl font-bold mt-1">{selectedJobData.profitMargin.toFixed(2)}%</h3>
                          <div className="flex items-center mt-1 text-xs">
                            {selectedJobData.profitMargin > 30 ? (
                              <>
                                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                                <span className="text-green-600">Above Target</span>
                              </>
                            ) : selectedJobData.profitMargin > 20 ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1 text-blue-600" />
                                <span className="text-blue-600">On Target</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                                <span className="text-red-600">Below Target</span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <p className="text-sm font-medium text-muted-foreground">Cost Variance</p>
                          <h3 className="text-3xl font-bold mt-1">
                            {selectedJobData.variancePercent < 0 ? "" : "+"}
                            {selectedJobData.variancePercent.toFixed(2)}%
                          </h3>
                          <div className="flex items-center mt-1 text-xs">
                            {selectedJobData.variancePercent < 0 ? (
                              <>
                                <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
                                <span className="text-green-600">Under Budget</span>
                              </>
                            ) : selectedJobData.variancePercent < 10 ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1 text-amber-600" />
                                <span className="text-amber-600">Near Budget</span>
                              </>
                            ) : (
                              <>
                                <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
                                <span className="text-red-600">Over Budget</span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <p className="text-sm font-medium text-muted-foreground">Process Type</p>
                          <h3 className="text-xl font-bold mt-1">{selectedJobData.processType}</h3>
                          <div className="flex items-center mt-1 text-xs">
                            {selectedJobData.processType === "Laser Cutting" ? (
                              <>
                                <Scissors className="h-3 w-3 mr-1 text-blue-600" />
                                <span className="text-blue-600">Laser</span>
                              </>
                            ) : selectedJobData.processType === "CNC Machining" ? (
                              <>
                                <Tool className="h-3 w-3 mr-1 text-green-600" />
                                <span className="text-green-600">CNC</span>
                              </>
                            ) : selectedJobData.processType === "Sheet Metal Fabrication" ? (
                              <>
                                <Layers className="h-3 w-3 mr-1 text-amber-600" />
                                <span className="text-amber-600">Sheet Metal</span>
                              </>
                            ) : (
                              <>
                                <Printer className="h-3 w-3 mr-1 text-purple-600" />
                                <span className="text-purple-600">3D Printing</span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Cost Breakdown</h3>
                      <div className="aspect-square max-h-64 mx-auto">
                        <ChartContainer
                          config={{
                            Material: {
                              label: "Material",
                              color: "hsl(var(--chart-1))",
                            },
                            Labor: {
                              label: "Labor",
                              color: "hsl(var(--chart-2))",
                            },
                            Machine: {
                              label: "Machine",
                              color: "hsl(var(--chart-3))",
                            },
                          }}
                          className="h-full"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Material", value: selectedJobData.materialCost },
                                  { name: "Labor", value: selectedJobData.laborCost },
                                  { name: "Machine", value: selectedJobData.machineCost },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {costBreakdownData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Cost Comparison</h3>
                      <ChartContainer
                        config={{
                          estimated: {
                            label: "Estimated",
                            color: "hsl(var(--chart-1))",
                          },
                          actual: {
                            label: "Actual",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-64"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              {
                                category: "Material",
                                estimated: selectedJobData.materialCost * 1.1, // Estimated is slightly higher for demo
                                actual: selectedJobData.materialCost,
                              },
                              {
                                category: "Labor",
                                estimated: selectedJobData.laborCost * 0.95, // Estimated is slightly lower for demo
                                actual: selectedJobData.laborCost,
                              },
                              {
                                category: "Machine",
                                estimated: selectedJobData.machineCost * 1.05, // Estimated is slightly higher for demo
                                actual: selectedJobData.machineCost,
                              },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="estimated" fill="var(--color-estimated)" name="Estimated" />
                            <Bar dataKey="actual" fill="var(--color-actual)" name="Actual" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Cost Details</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left font-medium p-3">Category</th>
                            <th className="text-right font-medium p-3">Estimated</th>
                            <th className="text-right font-medium p-3">Actual</th>
                            <th className="text-right font-medium p-3">Variance</th>
                            <th className="text-right font-medium p-3">Variance %</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Material</td>
                            <td className="p-3 text-right">${(selectedJobData.materialCost * 1.1).toFixed(2)}</td>
                            <td className="p-3 text-right">${selectedJobData.materialCost.toFixed(2)}</td>
                            <td className="p-3 text-right text-green-600">
                              -${(selectedJobData.materialCost * 0.1).toFixed(2)}
                            </td>
                            <td className="p-3 text-right text-green-600">-10.00%</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Labor</td>
                            <td className="p-3 text-right">${(selectedJobData.laborCost * 0.95).toFixed(2)}</td>
                            <td className="p-3 text-right">${selectedJobData.laborCost.toFixed(2)}</td>
                            <td className="p-3 text-right text-red-600">
                              +${(selectedJobData.laborCost * 0.05).toFixed(2)}
                            </td>
                            <td className="p-3 text-right text-red-600">+5.26%</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 font-medium">Machine</td>
                            <td className="p-3 text-right">${(selectedJobData.machineCost * 1.05).toFixed(2)}</td>
                            <td className="p-3 text-right">${selectedJobData.machineCost.toFixed(2)}</td>
                            <td className="p-3 text-right text-green-600">
                              -${(selectedJobData.machineCost * 0.05).toFixed(2)}
                            </td>
                            <td className="p-3 text-right text-green-600">-4.76%</td>
                          </tr>
                          <tr className="border-t bg-muted/20">
                            <td className="p-3 font-medium">Total</td>
                            <td className="p-3 text-right font-medium">${selectedJobData.estimatedCost.toFixed(2)}</td>
                            <td className="p-3 text-right font-medium">${selectedJobData.actualCost.toFixed(2)}</td>
                            <td className="p-3 text-right font-medium">
                              <span className={selectedJobData.variance < 0 ? "text-green-600" : "text-red-600"}>
                                {selectedJobData.variance < 0 ? "-" : "+"}$
                                {Math.abs(selectedJobData.variance).toFixed(2)}
                              </span>
                            </td>
                            <td className="p-3 text-right font-medium">
                              <span className={selectedJobData.variancePercent < 0 ? "text-green-600" : "text-red-600"}>
                                {selectedJobData.variancePercent < 0 ? "" : "+"}
                                {selectedJobData.variancePercent.toFixed(2)}%
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Profitability Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Revenue & Profit</h4>
                          <Badge variant={selectedJobData.profitMargin > 30 ? "default" : "outline"}>
                            {selectedJobData.profitMargin > 30 ? "High Margin" : "Standard Margin"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Total Revenue</span>
                            <span className="font-medium">
                              ${(selectedJobData.actualCost + selectedJobData.profit).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Total Cost</span>
                            <span className="font-medium">${selectedJobData.actualCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Profit</span>
                            <span className="font-medium text-green-600">${selectedJobData.profit.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Profit Margin</span>
                            <span className="font-medium">{selectedJobData.profitMargin.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Time & Efficiency</h4>
                          <Badge
                            variant={
                              selectedJobData.actualHours < selectedJobData.estimatedHours ? "default" : "outline"
                            }
                          >
                            {selectedJobData.actualHours < selectedJobData.estimatedHours
                              ? "Under Hours"
                              : "Over Hours"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Estimated Hours</span>
                            <span className="font-medium">{selectedJobData.estimatedHours} hrs</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Actual Hours</span>
                            <span className="font-medium">{selectedJobData.actualHours} hrs</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Hour Variance</span>
                            <span
                              className={
                                selectedJobData.actualHours < selectedJobData.estimatedHours
                                  ? "font-medium text-green-600"
                                  : "font-medium text-red-600"
                              }
                            >
                              {selectedJobData.actualHours < selectedJobData.estimatedHours ? "-" : "+"}
                              {Math.abs(selectedJobData.actualHours - selectedJobData.estimatedHours)} hrs
                            </span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Completion</span>
                            <span className="font-medium">{selectedJobData.completionPercent}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <BarChart2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Job Selected</h3>
                    <p className="text-muted-foreground">Select a job to view cost analysis</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
