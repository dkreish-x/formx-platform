"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Edit,
  FileText,
  Printer,
  PenToolIcon as Tool,
  User,
  CheckCircle,
  Camera,
  QrCode,
  CuboidIcon as Cube,
  BarChart,
  History,
  Plus,
  Eye,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ModelViewer } from "@/components/model-viewer"
import { TimeTracker } from "@/components/time-tracker"
import { MaterialScanner } from "@/components/material-scanner"
import { QualityCheckForm } from "@/components/quality-check-form"

export default function TravelerDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real implementation, this would be fetched from the API
  const traveler = {
    id: params.id,
    partNumber: "PA-1042",
    partName: "Bracket Assembly",
    revision: "B",
    customer: "Acme Industries",
    orderNumber: "ORD-2023-1042",
    workOrder: "WO-2023-0542",
    status: "In Production",
    currentOperation: "CNC Milling",
    completionPercentage: 40,
    dueDate: "2023-05-15",
    createdDate: "2023-05-01",
    quantity: 25,
    completedQuantity: 10,
    material: "Aluminum 6061-T6",
    materialLot: "LOT-AL6061-2023-042",
    materialCertification: true,
    finish: "Black Anodize Type II",
    assignedTo: "Mike Johnson",
    estimatedTime: "8 hours",
    actualTime: "3.5 hours",
    notes: "Customer requires certification of material. Special packaging instructions included in traveler.",
    qualityRequirements: "100% inspection of critical dimensions. CMM report required.",
    attachments: [
      { name: "Bracket_Assembly_A1042_Rev2.step", type: "CAD File", date: "2023-05-01" },
      { name: "Bracket_Assembly_A1042_Drawing.pdf", type: "Drawing", date: "2023-05-01" },
      { name: "Quality_Requirements.pdf", type: "Quality Doc", date: "2023-05-01" },
      { name: "CNC_Program.nc", type: "CNC Program", date: "2023-05-02" },
    ],
    operations: [
      {
        id: 1,
        name: "Material Preparation",
        machine: "Saw",
        status: "Complete",
        timeEstimated: "0.5 hours",
        timeActual: "0.4 hours",
        operator: "David Chen",
        completedDate: "2023-05-02",
        notes: "Material cut to size per drawing",
        qualityCheck: "Pass",
      },
      {
        id: 2,
        name: "CNC Milling - Op 10",
        machine: "CNC Mill 3",
        status: "In Progress",
        timeEstimated: "2.5 hours",
        timeActual: "1.5 hours",
        operator: "Mike Johnson",
        completedDate: "",
        notes: "Program verified, running first batch of 10 parts",
        qualityCheck: "Pending",
      },
      {
        id: 3,
        name: "CNC Milling - Op 20",
        machine: "CNC Mill 3",
        status: "Pending",
        timeEstimated: "2 hours",
        timeActual: "",
        operator: "Unassigned",
        completedDate: "",
        notes: "",
        qualityCheck: "",
      },
      {
        id: 4,
        name: "Deburr",
        machine: "Manual",
        status: "Pending",
        timeEstimated: "0.5 hours",
        timeActual: "",
        operator: "Unassigned",
        completedDate: "",
        notes: "",
        qualityCheck: "",
      },
      {
        id: 5,
        name: "Finishing - Anodize",
        machine: "Anodizing",
        status: "Pending",
        timeEstimated: "2.5 hours",
        timeActual: "",
        operator: "Unassigned",
        completedDate: "",
        notes: "",
        qualityCheck: "",
      },
      {
        id: 6,
        name: "Final Inspection",
        machine: "CMM",
        status: "Pending",
        timeEstimated: "1 hour",
        timeActual: "",
        operator: "Unassigned",
        completedDate: "",
        notes: "",
        qualityCheck: "",
      },
    ],
    qualityChecks: [
      {
        id: 1,
        name: "First Article Inspection",
        status: "Complete",
        inspector: "Sarah Williams",
        date: "2023-05-02",
        result: "Pass",
        measurements: [
          { dimension: "Length", nominal: "100.0 mm", tolerance: "±0.1 mm", actual: "100.05 mm", result: "Pass" },
          { dimension: "Width", nominal: "50.0 mm", tolerance: "±0.1 mm", actual: "50.02 mm", result: "Pass" },
          { dimension: "Height", nominal: "25.0 mm", tolerance: "±0.1 mm", actual: "24.98 mm", result: "Pass" },
          { dimension: "Hole Dia", nominal: "10.0 mm", tolerance: "±0.05 mm", actual: "10.01 mm", result: "Pass" },
        ],
      },
      {
        id: 2,
        name: "In-Process Inspection",
        status: "Pending",
        inspector: "Unassigned",
        date: "",
        result: "",
        measurements: [],
      },
      {
        id: 3,
        name: "Final Inspection",
        status: "Pending",
        inspector: "Unassigned",
        date: "",
        result: "",
        measurements: [],
      },
    ],
    materials: [
      {
        id: "MAT-2023-0142",
        type: "Aluminum 6061-T6",
        lotNumber: "LOT-AL6061-2023-042",
        quantity: "25 pcs",
        supplier: "Metal Suppliers Inc.",
        receivedDate: "2023-04-28",
        certificationAvailable: true,
        allocated: "25 pcs",
        remaining: "0 pcs",
      },
    ],
    timeEntries: [
      {
        id: 1,
        operation: "Material Preparation",
        operator: "David Chen",
        startTime: "2023-05-02 08:30",
        endTime: "2023-05-02 08:54",
        duration: "0.4 hours",
        notes: "Material cut to size per drawing",
      },
      {
        id: 2,
        operation: "CNC Milling - Op 10",
        operator: "Mike Johnson",
        startTime: "2023-05-02 09:15",
        endTime: "2023-05-02 10:45",
        duration: "1.5 hours",
        notes: "Setup and first batch of 10 parts",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/travelers">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Traveler: {params.id}</h1>
            <p className="text-muted-foreground">
              Part: {traveler.partNumber} - {traveler.partName} | Rev: {traveler.revision}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print Traveler
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Log Time
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge variant="warning" className="text-base py-1 px-3">
                {traveler.status}
              </Badge>
              <div className="text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 inline mr-1" />
                Due: {traveler.dueDate}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{traveler.completionPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${traveler.completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Operation</span>
                <span className="text-sm font-medium">{traveler.currentOperation}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold">{traveler.completedQuantity}</span>
                  <span className="text-sm text-muted-foreground">/ {traveler.quantity}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold">{traveler.actualTime}</span>
                  <span className="text-sm text-muted-foreground">/ {traveler.estimatedTime}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Material</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="font-normal">
                  {traveler.material}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  Lot: {traveler.materialLot}
                </Badge>
                {traveler.materialCertification && (
                  <Badge variant="success" className="font-normal">
                    Certified
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <p className="font-medium">{traveler.assignedTo}</p>
                <p className="text-sm text-muted-foreground">Primary Operator</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Order Information</p>
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between">
                  <span className="text-sm">Work Order:</span>
                  <span className="text-sm font-medium">{traveler.workOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Customer Order:</span>
                  <span className="text-sm font-medium">{traveler.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Customer:</span>
                  <span className="text-sm font-medium">{traveler.customer}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
          <TabsTrigger value="files">Files & 3D Model</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Part Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Part Information</h3>
                      <dl className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Part Number:</dt>
                          <dd className="text-sm font-medium">{traveler.partNumber}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Revision:</dt>
                          <dd className="text-sm font-medium">{traveler.revision}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Quantity:</dt>
                          <dd className="text-sm font-medium">{traveler.quantity}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Material:</dt>
                          <dd className="text-sm font-medium">{traveler.material}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Finish:</dt>
                          <dd className="text-sm font-medium">{traveler.finish}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-medium">Order Information</h3>
                      <dl className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Customer:</dt>
                          <dd className="text-sm font-medium">{traveler.customer}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Order Number:</dt>
                          <dd className="text-sm font-medium">{traveler.orderNumber}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Work Order:</dt>
                          <dd className="text-sm font-medium">{traveler.workOrder}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Created Date:</dt>
                          <dd className="text-sm font-medium">{traveler.createdDate}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Due Date:</dt>
                          <dd className="text-sm font-medium">{traveler.dueDate}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium">Notes</h3>
                    <p className="mt-2 text-sm">{traveler.notes}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium">Quality Requirements</h3>
                    <p className="mt-2 text-sm">{traveler.qualityRequirements}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Part Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative h-48 w-full">
                    <Image src="/intricate-gear.png" alt="Part Preview" fill className="object-contain" />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {traveler.attachments.map((attachment, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {attachment.type} • {attachment.date}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Operation Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {traveler.operations.map((operation) => (
                  <div key={operation.id} className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        operation.status === "Complete"
                          ? "bg-green-100 text-green-600"
                          : operation.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {operation.status === "Complete" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : operation.status === "In Progress" ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{operation.name}</h3>
                        <Badge
                          variant={
                            operation.status === "Complete"
                              ? "default"
                              : operation.status === "In Progress"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {operation.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span>Machine: {operation.machine}</span>
                        {operation.operator !== "Unassigned" && (
                          <span className="ml-4">Operator: {operation.operator}</span>
                        )}
                        {operation.timeActual && (
                          <span className="ml-4">
                            Time: {operation.timeActual} / {operation.timeEstimated}
                          </span>
                        )}
                      </div>
                      {operation.notes && <p className="mt-1 text-sm">{operation.notes}</p>}
                      {operation.qualityCheck && (
                        <div className="mt-1">
                          <Badge
                            variant={operation.qualityCheck === "Pass" ? "success" : "destructive"}
                            className="text-xs"
                          >
                            QC: {operation.qualityCheck}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Operations</CardTitle>
              <Button size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Log Time
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Operation</th>
                    <th className="text-left font-medium p-4">Machine</th>
                    <th className="text-left font-medium p-4">Operator</th>
                    <th className="text-left font-medium p-4">Time</th>
                    <th className="text-left font-medium p-4">Status</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {traveler.operations.map((operation) => (
                    <tr key={operation.id} className="border-b">
                      <td className="p-4">
                        <div className="font-medium">{operation.name}</div>
                        {operation.notes && <div className="text-xs text-muted-foreground">{operation.notes}</div>}
                      </td>
                      <td className="p-4">{operation.machine}</td>
                      <td className="p-4">{operation.operator}</td>
                      <td className="p-4">
                        {operation.timeActual ? (
                          <div>
                            <span className="font-medium">{operation.timeActual}</span>
                            <span className="text-xs text-muted-foreground"> / {operation.timeEstimated}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">{operation.timeEstimated}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            operation.status === "Complete"
                              ? "default"
                              : operation.status === "In Progress"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {operation.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {operation.status === "Pending" && (
                            <Button variant="outline" size="sm">
                              Start
                            </Button>
                          )}
                          {operation.status === "In Progress" && (
                            <Button variant="outline" size="sm">
                              Complete
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Current Operation: CNC Milling - Op 10</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Setup Instructions</h4>
                      <ul className="mt-1 text-sm space-y-1 list-disc pl-4">
                        <li>Load program #1042-OP10 into CNC Mill 3</li>
                        <li>Use fixture #F-1042-A with 6061 soft jaws</li>
                        <li>Use tool list per setup sheet</li>
                        <li>Zero part per setup sheet</li>
                        <li>First article inspection required</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Quality Checks</h4>
                      <ul className="mt-1 text-sm space-y-1 list-disc pl-4">
                        <li>Check overall dimensions per drawing</li>
                        <li>Verify hole locations and diameters</li>
                        <li>Check surface finish Ra 32 or better</li>
                        <li>Inspect critical dimensions with CMM</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium">Time Tracking</h3>
                  <TimeTracker operation="CNC Milling - Op 10" />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium">Quality Check</h3>
                  <QualityCheckForm operation="CNC Milling - Op 10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quality Checks</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Quality Check
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Check</th>
                    <th className="text-left font-medium p-4">Inspector</th>
                    <th className="text-left font-medium p-4">Date</th>
                    <th className="text-left font-medium p-4">Result</th>
                    <th className="text-left font-medium p-4">Status</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {traveler.qualityChecks.map((check) => (
                    <tr key={check.id} className="border-b">
                      <td className="p-4">{check.name}</td>
                      <td className="p-4">{check.inspector}</td>
                      <td className="p-4">{check.date || "-"}</td>
                      <td className="p-4">
                        {check.result ? (
                          <Badge variant={check.result === "Pass" ? "success" : "destructive"}>{check.result}</Badge>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            check.status === "Complete"
                              ? "default"
                              : check.status === "In Progress"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {check.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {check.status === "Pending" && (
                            <Button variant="outline" size="sm">
                              Start
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {traveler.qualityChecks[0].measurements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>First Article Inspection Results</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-4">Dimension</th>
                      <th className="text-left font-medium p-4">Nominal</th>
                      <th className="text-left font-medium p-4">Tolerance</th>
                      <th className="text-left font-medium p-4">Actual</th>
                      <th className="text-left font-medium p-4">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {traveler.qualityChecks[0].measurements.map((measurement, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{measurement.dimension}</td>
                        <td className="p-4">{measurement.nominal}</td>
                        <td className="p-4">{measurement.tolerance}</td>
                        <td className="p-4">{measurement.actual}</td>
                        <td className="p-4">
                          <Badge variant={measurement.result === "Pass" ? "success" : "destructive"}>
                            {measurement.result}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Quality Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Inspection Equipment</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Tool className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Digital Caliper</p>
                        <p className="text-xs text-muted-foreground">Cal Due: 2023-08-15</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Tool className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">CMM Machine</p>
                        <p className="text-xs text-muted-foreground">Cal Due: 2023-07-22</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium">Inspection Photos</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md overflow-hidden">
                      <div className="relative h-32 w-full">
                        <Image
                          src="/placeholder.svg?key=2vpya"
                          alt="Inspection Photo 1"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground">First Article - Front View</p>
                      </div>
                    </div>
                    <div className="border rounded-md overflow-hidden">
                      <div className="relative h-32 w-full">
                        <Image
                          src="/placeholder.svg?key=582sg"
                          alt="Inspection Photo 2"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground">First Article - Side View</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center border rounded-md h-32">
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Add Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Materials</CardTitle>
              <Button size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                Scan Material
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Material</th>
                    <th className="text-left font-medium p-4">Lot Number</th>
                    <th className="text-left font-medium p-4">Supplier</th>
                    <th className="text-left font-medium p-4">Quantity</th>
                    <th className="text-left font-medium p-4">Certification</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {traveler.materials.map((material) => (
                    <tr key={material.id} className="border-b">
                      <td className="p-4">
                        <div className="font-medium">{material.type}</div>
                        <div className="text-xs text-muted-foreground">ID: {material.id}</div>
                      </td>
                      <td className="p-4">{material.lotNumber}</td>
                      <td className="p-4">{material.supplier}</td>
                      <td className="p-4">
                        <div>{material.allocated}</div>
                        <div className="text-xs text-muted-foreground">Received: {material.quantity}</div>
                      </td>
                      <td className="p-4">
                        {material.certificationAvailable ? (
                          <Badge variant="success">Available</Badge>
                        ) : (
                          <Badge variant="outline">Not Available</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Material Traceability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Scan Material</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scan a QR code or barcode to add material to this traveler.
                  </p>
                  <div className="mt-4">
                    <MaterialScanner />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium">Material Certification</h3>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image
                        src="/placeholder.svg?key=0crrz"
                        alt="Material Certification"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-3 border-t flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Material Certification - Aluminum 6061-T6</p>
                        <p className="text-xs text-muted-foreground">Lot: LOT-AL6061-2023-042</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Time Entries</CardTitle>
              <Button size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Log Time
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Operation</th>
                    <th className="text-left font-medium p-4">Operator</th>
                    <th className="text-left font-medium p-4">Start Time</th>
                    <th className="text-left font-medium p-4">End Time</th>
                    <th className="text-left font-medium p-4">Duration</th>
                    <th className="text-left font-medium p-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {traveler.timeEntries.map((entry) => (
                    <tr key={entry.id} className="border-b">
                      <td className="p-4">{entry.operation}</td>
                      <td className="p-4">{entry.operator}</td>
                      <td className="p-4">{entry.startTime}</td>
                      <td className="p-4">{entry.endTime}</td>
                      <td className="p-4">{entry.duration}</td>
                      <td className="p-4">{entry.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Log Time for Current Operation</h3>
                  <div className="mt-4">
                    <TimeTracker operation="CNC Milling - Op 10" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium">Time Summary</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm text-muted-foreground">Estimated Total</h4>
                        <span className="text-lg font-bold">8.0 hrs</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm text-muted-foreground">Actual Total</h4>
                        <span className="text-lg font-bold">3.5 hrs</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm text-muted-foreground">Remaining</h4>
                        <span className="text-lg font-bold">4.5 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium">Time Distribution</h3>
                  <div className="mt-2 h-64 border rounded-md p-4">
                    <div className="h-full flex items-center justify-center">
                      <BarChart className="h-8 w-8 text-muted-foreground" />
                      <p className="ml-2 text-sm text-muted-foreground">Time distribution chart will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>3D Model Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <div className="relative h-96 w-full">
                    <ModelViewer />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Files</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">CAD Files</h3>
                    <ul className="mt-2 space-y-2">
                      {traveler.attachments
                        .filter((a) => a.type === "CAD File")
                        .map((attachment, index) => (
                          <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center">
                              <Cube className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {attachment.type} • {attachment.date}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Drawings</h3>
                    <ul className="mt-2 space-y-2">
                      {traveler.attachments
                        .filter((a) => a.type === "Drawing")
                        .map((attachment, index) => (
                          <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {attachment.type} • {attachment.date}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">CNC Programs</h3>
                    <ul className="mt-2 space-y-2">
                      {traveler.attachments
                        .filter((a) => a.type === "CNC Program")
                        .map((attachment, index) => (
                          <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {attachment.type} • {attachment.date}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Quality Documents</h3>
                    <ul className="mt-2 space-y-2">
                      {traveler.attachments
                        .filter((a) => a.type === "Quality Doc")
                        .map((attachment, index) => (
                          <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {attachment.type} • {attachment.date}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>File History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <History className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Bracket_Assembly_A1042_Rev2.step uploaded</h3>
                      <span className="text-sm text-muted-foreground">2023-05-01 09:15</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Uploaded by: John Doe</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <History className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Bracket_Assembly_A1042_Drawing.pdf uploaded</h3>
                      <span className="text-sm text-muted-foreground">2023-05-01 09:20</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Uploaded by: John Doe</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <History className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">CNC_Program.nc uploaded</h3>
                      <span className="text-sm text-muted-foreground">2023-05-02 10:30</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Uploaded by: Mike Johnson</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
