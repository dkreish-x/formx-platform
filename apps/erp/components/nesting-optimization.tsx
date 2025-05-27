"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Minimize2, Square, Upload, Download, RefreshCw, Scissors, Layers, Check } from "lucide-react"
import Image from "next/image"

// Mock data for nesting jobs
const nestingJobs = [
  {
    id: "NEST-001",
    name: "Customer A - Brackets",
    material: "Aluminum 6061",
    thickness: '0.125"',
    sheetSize: '48" x 96"',
    partCount: 120,
    uniqueParts: 4,
    materialUtilization: 82,
    status: "Ready",
    machine: "Trumpf TruLaser 3030",
    estimatedTime: "1:45",
    priority: "High",
    dueDate: "2025-05-20",
  },
  {
    id: "NEST-002",
    name: "Customer B - Enclosures",
    material: "Stainless Steel 304",
    thickness: '0.063"',
    sheetSize: '60" x 120"',
    partCount: 45,
    uniqueParts: 8,
    materialUtilization: 76,
    status: "In Progress",
    machine: "Amada FO-3015 NT",
    estimatedTime: "2:30",
    priority: "Medium",
    dueDate: "2025-05-22",
  },
  {
    id: "NEST-003",
    name: "Customer C - Panels",
    material: "Mild Steel",
    thickness: '0.075"',
    sheetSize: '48" x 96"',
    partCount: 65,
    uniqueParts: 12,
    materialUtilization: 68,
    status: "Pending",
    machine: "Trumpf TruLaser 3030",
    estimatedTime: "3:15",
    priority: "Low",
    dueDate: "2025-05-25",
  },
  {
    id: "NEST-004",
    name: "Customer D - Fixtures",
    material: "Aluminum 5052",
    thickness: '0.250"',
    sheetSize: '48" x 48"',
    partCount: 28,
    uniqueParts: 7,
    materialUtilization: 91,
    status: "Ready",
    machine: "Amada FO-3015 NT",
    estimatedTime: "1:20",
    priority: "High",
    dueDate: "2025-05-18",
  },
]

export function NestingOptimization() {
  const [activeTab, setActiveTab] = useState("current")
  const [selectedNest, setSelectedNest] = useState<string | null>("NEST-001")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Nesting & Material Optimization</h2>
          <p className="text-muted-foreground">Optimize material usage for laser cutting and sheet metal fabrication</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import CAD Files
          </Button>
          <Button>
            <Maximize2 className="mr-2 h-4 w-4" />
            Create New Nest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Material Utilization</p>
                <h3 className="text-2xl font-bold">79.3%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Square className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Material Savings (Monthly)</p>
                <h3 className="text-2xl font-bold">$4,250</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Minimize2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Nests</p>
                <h3 className="text-2xl font-bold">{nestingJobs.filter((job) => job.status === "Pending").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Layers className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Nesting Jobs</CardTitle>
              <CardDescription>Current and upcoming nesting jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="current">Current</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="space-y-4 mt-4">
                  {nestingJobs
                    .filter((job) => job.status === "Ready" || job.status === "In Progress")
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedNest === job.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedNest(job.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{job.name}</h3>
                            <p className="text-sm text-muted-foreground">{job.id}</p>
                          </div>
                          <Badge variant={job.status === "Ready" ? "default" : "secondary"}>{job.status}</Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Material:</span>
                            <p>{job.material}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Thickness:</span>
                            <p>{job.thickness}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Parts:</span>
                            <p>
                              {job.partCount} ({job.uniqueParts} unique)
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Machine:</span>
                            <p>{job.machine.split(" ")[0]}</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Material Utilization</span>
                            <span className={job.materialUtilization > 80 ? "text-green-600" : "text-amber-600"}>
                              {job.materialUtilization}%
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                job.materialUtilization > 80 ? "bg-green-500" : "bg-amber-500"
                              }`}
                              style={{ width: `${job.materialUtilization}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4 mt-4">
                  {nestingJobs
                    .filter((job) => job.status === "Pending")
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedNest === job.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedNest(job.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{job.name}</h3>
                            <p className="text-sm text-muted-foreground">{job.id}</p>
                          </div>
                          <Badge variant="outline">Pending</Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Material:</span>
                            <p>{job.material}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Thickness:</span>
                            <p>{job.thickness}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Parts:</span>
                            <p>
                              {job.partCount} ({job.uniqueParts} unique)
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Due Date:</span>
                            <p>{job.dueDate}</p>
                          </div>
                        </div>

                        <div className="mt-3 flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Layers className="h-3.5 w-3.5 mr-1" />
                            Process
                          </Button>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Completed nests are archived</p>
                    <Button variant="link" className="mt-2">
                      View Archive
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Nest Preview</CardTitle>
              <CardDescription>
                {selectedNest && nestingJobs.find((job) => job.id === selectedNest)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedNest ? (
                <div className="space-y-6">
                  <div className="relative aspect-[4/3] bg-muted rounded-md overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?key=avgnb"
                        alt="Nesting preview"
                        width={800}
                        height={600}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Maximize2 className="h-3.5 w-3.5 mr-1" />
                        Zoom
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Optimization Details</h4>
                      <div className="text-sm">
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Material Utilization</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.materialUtilization}%
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Sheet Size</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.sheetSize}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Parts Nested</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.partCount}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Unique Parts</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.uniqueParts}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Est. Runtime</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Material Details</h4>
                      <div className="text-sm">
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Material Type</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.material}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Thickness</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.thickness}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Sheets Required</span>
                          <span className="font-medium">1</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Material Cost</span>
                          <span className="font-medium">$245.00</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Scrap Value</span>
                          <span className="font-medium">$18.75</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Production Details</h4>
                      <div className="text-sm">
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Machine</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.machine}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Priority</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.priority}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Due Date</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.dueDate}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-medium">
                            {nestingJobs.find((job) => job.id === selectedNest)?.status}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Work Order</span>
                          <span className="font-medium">WO-2023-0542</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Re-optimize
                    </Button>
                    <Button variant="outline">
                      <Scissors className="h-4 w-4 mr-2" />
                      Edit Nest
                    </Button>
                    <Button>
                      <Check className="h-4 w-4 mr-2" />
                      Approve & Send to Machine
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Square className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Nest Selected</h3>
                    <p className="text-muted-foreground">Select a nesting job to view details</p>
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
