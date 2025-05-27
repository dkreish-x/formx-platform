"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Printer,
  CuboidIcon as Cube,
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Upload,
  Download,
  Eye,
  MoreHorizontal,
  Zap,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

// Mock data for 3D printing jobs
const printJobs = [
  {
    id: "3DP-001",
    name: "Prototype Housing",
    customer: "Acme Manufacturing",
    workOrder: "WO-2023-0542",
    material: "PLA",
    color: "Black",
    quantity: 2,
    status: "Printing",
    progress: 65,
    printer: "Ultimaker S5",
    estimatedTime: "4:30",
    remainingTime: "1:35",
    startTime: "2025-05-10 09:15",
    completionTime: "2025-05-10 13:45",
    fileSize: "12.4 MB",
    layerHeight: "0.15 mm",
    infill: "20%",
    priority: "High",
    notes: "Customer needs prototype for design review meeting",
  },
  {
    id: "3DP-002",
    name: "Fixture Components",
    customer: "TechPro Industries",
    workOrder: "WO-2023-0541",
    material: "PETG",
    color: "Clear",
    quantity: 5,
    status: "Queued",
    progress: 0,
    printer: "Prusa i3 MK3S+",
    estimatedTime: "8:15",
    remainingTime: "8:15",
    startTime: "2025-05-10 14:00",
    completionTime: "2025-05-10 22:15",
    fileSize: "28.7 MB",
    layerHeight: "0.20 mm",
    infill: "50%",
    priority: "Medium",
    notes: "High strength required for fixture components",
  },
  {
    id: "3DP-003",
    name: "Custom Knobs",
    customer: "Global Dynamics",
    workOrder: "WO-2023-0540",
    material: "ABS",
    color: "Red",
    quantity: 10,
    status: "Complete",
    progress: 100,
    printer: "Ultimaker S5",
    estimatedTime: "3:45",
    remainingTime: "0:00",
    startTime: "2025-05-10 05:30",
    completionTime: "2025-05-10 09:15",
    fileSize: "8.2 MB",
    layerHeight: "0.10 mm",
    infill: "15%",
    priority: "Low",
    notes: "Custom color match to RAL 3020",
  },
  {
    id: "3DP-004",
    name: "Cooling Duct",
    customer: "Precision Engineering",
    workOrder: "WO-2023-0539",
    material: "Nylon",
    color: "White",
    quantity: 1,
    status: "Failed",
    progress: 78,
    printer: "Markforged Mark Two",
    estimatedTime: "5:20",
    remainingTime: "0:00",
    startTime: "2025-05-09 15:40",
    completionTime: "N/A",
    fileSize: "18.5 MB",
    layerHeight: "0.125 mm",
    infill: "35%",
    priority: "High",
    notes: "Print failed due to power outage, needs to be restarted",
  },
  {
    id: "3DP-005",
    name: "Jig Assembly",
    customer: "Innovative Metals",
    workOrder: "WO-2023-0538",
    material: "Carbon Fiber",
    color: "Black",
    quantity: 3,
    status: "Queued",
    progress: 0,
    printer: "Markforged Mark Two",
    estimatedTime: "12:30",
    remainingTime: "12:30",
    startTime: "2025-05-11 08:00",
    completionTime: "2025-05-11 20:30",
    fileSize: "32.1 MB",
    layerHeight: "0.10 mm",
    infill: "60%",
    priority: "Medium",
    notes: "High strength jig for production line",
  },
]

// Mock data for 3D printers
const printers = [
  {
    id: "PRT-001",
    name: "Ultimaker S5",
    type: "FDM",
    status: "Printing",
    currentJob: "3DP-001",
    materials: ["PLA", "PETG", "TPU", "ABS", "Nylon"],
    buildVolume: "330 x 240 x 300 mm",
    lastMaintenance: "2025-04-15",
    nextMaintenance: "2025-05-15",
    uptime: 92,
    temperature: {
      nozzle: 215,
      bed: 60,
      chamber: 28,
    },
  },
  {
    id: "PRT-002",
    name: "Prusa i3 MK3S+",
    type: "FDM",
    status: "Idle",
    currentJob: null,
    materials: ["PLA", "PETG", "TPU", "ABS"],
    buildVolume: "250 x 210 x 210 mm",
    lastMaintenance: "2025-04-20",
    nextMaintenance: "2025-05-20",
    uptime: 88,
    temperature: {
      nozzle: 25,
      bed: 25,
      chamber: 24,
    },
  },
  {
    id: "PRT-003",
    name: "Markforged Mark Two",
    type: "FDM",
    status: "Maintenance",
    currentJob: null,
    materials: ["Nylon", "Carbon Fiber", "Fiberglass", "Kevlar"],
    buildVolume: "320 x 132 x 154 mm",
    lastMaintenance: "2025-05-09",
    nextMaintenance: "2025-06-09",
    uptime: 75,
    temperature: {
      nozzle: 25,
      bed: 25,
      chamber: 25,
    },
  },
  {
    id: "PRT-004",
    name: "Formlabs Form 3",
    type: "SLA",
    status: "Idle",
    currentJob: null,
    materials: ["Standard Resin", "Tough Resin", "Flexible Resin", "Dental Resin"],
    buildVolume: "145 x 145 x 185 mm",
    lastMaintenance: "2025-04-30",
    nextMaintenance: "2025-05-30",
    uptime: 95,
    temperature: {
      chamber: 28,
    },
  },
]

export function ThreeDPrintingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("jobs")
  const [selectedJob, setSelectedJob] = useState<string | null>("3DP-001")
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>("PRT-001")

  const filteredJobs = printJobs.filter((job) => {
    return (
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.material.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const filteredPrinters = printers.filter((printer) => {
    return (
      printer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const selectedJobData = printJobs.find((job) => job.id === selectedJob)
  const selectedPrinterData = printers.find((printer) => printer.id === selectedPrinter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">3D Printing Management</h2>
          <p className="text-muted-foreground">Manage and monitor additive manufacturing operations</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload STL
          </Button>
          <Button>
            <Printer className="mr-2 h-4 w-4" />
            New Print Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Printers</p>
                <h3 className="text-2xl font-bold">
                  {printers.filter((printer) => printer.status !== "Maintenance").length}/{printers.length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Printer className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Printing</p>
                <h3 className="text-2xl font-bold">{printJobs.filter((job) => job.status === "Printing").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Queued</p>
                <h3 className="text-2xl font-bold">{printJobs.filter((job) => job.status === "Queued").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <h3 className="text-2xl font-bold">{printJobs.filter((job) => job.status === "Failed").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
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
            placeholder={activeTab === "jobs" ? "Search print jobs..." : "Search printers..."}
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

      <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">Print Jobs</TabsTrigger>
          <TabsTrigger value="printers">Printers</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Print Queue</CardTitle>
                  <CardDescription>Manage and monitor 3D printing jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                            <h3 className="font-medium">{job.name}</h3>
                            <p className="text-sm text-muted-foreground">{job.customer}</p>
                          </div>
                          <Badge
                            variant={
                              job.status === "Complete"
                                ? "default"
                                : job.status === "Printing"
                                  ? "secondary"
                                  : job.status === "Queued"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {job.status}
                          </Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Material:</span>
                            <p>{job.material}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <p>{job.quantity}</p>
                          </div>
                        </div>

                        {job.status === "Printing" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{job.progress}%</span>
                            </div>
                            <Progress value={job.progress} className="h-2" />
                            <div className="flex justify-between text-xs mt-1">
                              <span className="text-muted-foreground">Remaining: {job.remainingTime}</span>
                              <span className="text-muted-foreground">Printer: {job.printer.split(" ")[0]}</span>
                            </div>
                          </div>
                        )}

                        {job.status === "Queued" && (
                          <div className="mt-3 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Est. Time: {job.estimatedTime}</span>
                            <span className="text-muted-foreground">Printer: {job.printer.split(" ")[0]}</span>
                          </div>
                        )}

                        {job.status === "Complete" && (
                          <div className="mt-3 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Completed: {job.completionTime}</span>
                            <span className="text-muted-foreground">Printer: {job.printer.split(" ")[0]}</span>
                          </div>
                        )}

                        {job.status === "Failed" && (
                          <div className="mt-3 flex items-center text-xs text-red-500">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            <span>Failed at {job.progress}% - Needs restart</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Print Job Details</CardTitle>
                      <CardDescription>
                        {selectedJobData ? selectedJobData.name : "Select a print job to view details"}
                      </CardDescription>
                    </div>
                    {selectedJobData && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download STL
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Edit Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Cancel Print
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedJobData ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="aspect-square bg-muted rounded-md overflow-hidden relative">
                            <Image
                              src="/3d-printing-model.png"
                              alt="3D Model Preview"
                              width={400}
                              height={400}
                              className="object-cover"
                            />
                            <div className="absolute bottom-4 right-4">
                              <Button size="sm" variant="secondary">
                                <Cube className="h-4 w-4 mr-2" />
                                3D View
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Print Status</h3>
                            {selectedJobData.status === "Printing" ? (
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Progress</span>
                                    <span>{selectedJobData.progress}%</span>
                                  </div>
                                  <Progress value={selectedJobData.progress} className="h-2" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="border rounded-md p-3">
                                    <div className="text-xs text-muted-foreground">Elapsed Time</div>
                                    <div className="text-lg font-medium mt-1">
                                      {Number.parseInt(selectedJobData.estimatedTime.split(":")[0]) -
                                        Number.parseInt(selectedJobData.remainingTime.split(":")[0])}
                                      :
                                      {Number.parseInt(selectedJobData.estimatedTime.split(":")[1]) -
                                        Number.parseInt(selectedJobData.remainingTime.split(":")[1])}
                                    </div>
                                  </div>
                                  <div className="border rounded-md p-3">
                                    <div className="text-xs text-muted-foreground">Remaining</div>
                                    <div className="text-lg font-medium mt-1">{selectedJobData.remainingTime}</div>
                                  </div>
                                  <div className="border rounded-md p-3">
                                    <div className="text-xs text-muted-foreground">Start Time</div>
                                    <div className="text-sm font-medium mt-1">
                                      {selectedJobData.startTime.split(" ")[1]}
                                    </div>
                                  </div>
                                  <div className="border rounded-md p-3">
                                    <div className="text-xs text-muted-foreground">Est. Completion</div>
                                    <div className="text-sm font-medium mt-1">
                                      {selectedJobData.completionTime.split(" ")[1]}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : selectedJobData.status === "Complete" ? (
                              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                <div>
                                  <div className="font-medium text-green-700">Print Complete</div>
                                  <div className="text-sm text-green-600">
                                    Completed on {selectedJobData.completionTime}
                                  </div>
                                </div>
                              </div>
                            ) : selectedJobData.status === "Failed" ? (
                              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                                <div>
                                  <div className="font-medium text-red-700">Print Failed</div>
                                  <div className="text-sm text-red-600">
                                    Failed at {selectedJobData.progress}% completion
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
                                <Clock className="h-5 w-5 text-amber-500 mr-3" />
                                <div>
                                  <div className="font-medium text-amber-700">In Queue</div>
                                  <div className="text-sm text-amber-600">
                                    Scheduled to start at {selectedJobData.startTime}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">Print Information</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Work Order</span>
                                <span className="font-medium">{selectedJobData.workOrder}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Customer</span>
                                <span className="font-medium">{selectedJobData.customer}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Material</span>
                                <span className="font-medium">{selectedJobData.material}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Color</span>
                                <span className="font-medium">{selectedJobData.color}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Quantity</span>
                                <span className="font-medium">{selectedJobData.quantity}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Printer</span>
                                <span className="font-medium">{selectedJobData.printer}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Priority</span>
                                <Badge
                                  variant={
                                    selectedJobData.priority === "High"
                                      ? "default"
                                      : selectedJobData.priority === "Medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {selectedJobData.priority}
                                </Badge>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Est. Time</span>
                                <span className="font-medium">{selectedJobData.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">Print Settings</h3>
                          <div className="border rounded-md p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Layer Height</span>
                                <span className="font-medium">{selectedJobData.layerHeight}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Infill</span>
                                <span className="font-medium">{selectedJobData.infill}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">File Size</span>
                                <span className="font-medium">{selectedJobData.fileSize}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Support</span>
                                <span className="font-medium">Auto-generated</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Adhesion</span>
                                <span className="font-medium">Brim</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Speed</span>
                                <span className="font-medium">Standard</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-3">Notes</h3>
                          <div className="border rounded-md p-4 h-[calc(100%-28px)]">
                            <p className="text-sm">{selectedJobData.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      Select a print job from the queue to view details
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="printers" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Printer List</CardTitle>
                  <CardDescription>Manage and monitor 3D printers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPrinters.map((printer) => (
                      <div
                        key={printer.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPrinter === printer.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedPrinter(printer.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{printer.name}</h3>
                            <p className="text-sm text-muted-foreground">{printer.type}</p>
                          </div>
                          <Badge
                            variant={
                              printer.status === "Printing"
                                ? "secondary"
                                : printer.status === "Idle"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {printer.status}
                          </Badge>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Build Volume:</span>
                            <p>{printer.buildVolume}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Uptime:</span>
                            <p>{printer.uptime}%</p>
                          </div>
                        </div>

                        {printer.status === "Printing" && (
                          <div className="mt-3 flex items-center text-xs text-blue-600">
                            <Printer className="h-3 w-3 mr-1" />
                            <span>Printing: {printJobs.find((job) => job.id === printer.currentJob)?.name}</span>
                          </div>
                        )}

                        {printer.status === "Maintenance" && (
                          <div className="mt-3 flex items-center text-xs text-amber-600">
                            <Settings className="h-3 w-3 mr-1" />
                            <span>Under maintenance until {printer.nextMaintenance}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Printer Details</CardTitle>
                      <CardDescription>
                        {selectedPrinterData ? selectedPrinterData.name : "Select a printer to view details"}
                      </CardDescription>
                    </div>
                    {selectedPrinterData && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Camera Feed
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Maintenance
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Emergency Stop
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedPrinterData ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="aspect-square bg-muted rounded-md overflow-hidden relative">
                            <Image
                              src="/placeholder.svg?key=6q7q0"
                              alt="Printer Preview"
                              width={400}
                              height={400}
                              className="object-cover"
                            />
                            <div className="absolute bottom-4 right-4">
                              <Button size="sm" variant="secondary">
                                <Eye className="h-4 w-4 mr-2" />
                                Live View
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Printer Status</h3>
                            {selectedPrinterData.status === "Printing" ? (
                              <div className="space-y-3">
                                <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
                                  <Printer className="h-5 w-5 text-blue-500 mr-3" />
                                  <div>
                                    <div className="font-medium text-blue-700">Currently Printing</div>
                                    <div className="text-sm text-blue-600">
                                      Job: {printJobs.find((job) => job.id === selectedPrinterData.currentJob)?.name}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="border rounded-md p-3">
                                    <div className="text-xs text-muted-foreground">Nozzle Temp</div>
                                    <div className="text-lg font-medium mt-1">
                                      {selectedPrinterData.temperature.nozzle}°C
                                    </div>
                                  </div>
                                  <div className="border rounded-md p-3">
                                    <div className="text-xs text-muted-foreground">Bed Temp</div>
                                    <div className="text-lg font-medium mt-1">
                                      {selectedPrinterData.temperature.bed}°C
                                    </div>
                                  </div>
                                  <div className="border rounded-md p-3">
                                    <div className="text-xs text-muted-foreground">Chamber</div>
                                    <div className="text-lg font-medium mt-1">
                                      {selectedPrinterData.temperature.chamber}°C
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : selectedPrinterData.status === "Idle" ? (
                              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                <div>
                                  <div className="font-medium text-green-700">Printer Ready</div>
                                  <div className="text-sm text-green-600">Available for new print jobs</div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
                                <Settings className="h-5 w-5 text-amber-500 mr-3" />
                                <div>
                                  <div className="font-medium text-amber-700">Under Maintenance</div>
                                  <div className="text-sm text-amber-600">
                                    Scheduled until {selectedPrinterData.nextMaintenance}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">Printer Information</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Printer ID</span>
                                <span className="font-medium">{selectedPrinterData.id}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Type</span>
                                <span className="font-medium">{selectedPrinterData.type}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Build Volume</span>
                                <span className="font-medium">{selectedPrinterData.buildVolume}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Uptime</span>
                                <span className="font-medium">{selectedPrinterData.uptime}%</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Last Maintenance</span>
                                <span className="font-medium">{selectedPrinterData.lastMaintenance}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Next Maintenance</span>
                                <span className="font-medium">{selectedPrinterData.nextMaintenance}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3">Compatible Materials</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedPrinterData.materials.map((material) => (
                            <Badge key={material} variant="outline">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      Select a printer from the list to view details
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
