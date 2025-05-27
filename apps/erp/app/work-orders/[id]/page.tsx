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
  Plus,
  LucideLink,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  ClipboardList,
  BarChart4,
  History,
  Search,
} from "lucide-react"
import Link from "next/link"

export default function WorkOrderDetailPage({ params }: { params: { id: string } }) {
  // In a real implementation, this would be fetched from the API
  const workOrder = {
    id: params.id,
    orderNumber: "ORD-2023-1042",
    workOrderNumber: "WO-2023-0542",
    status: "In Production",
    priority: "High",
    dueDate: "2023-05-15",
    createdDate: "2023-05-01",
    assignedTo: "Mike Johnson",
    department: "CNC Machining",
    estimatedTime: "24 hours",
    completedTime: "10 hours",
    remainingTime: "14 hours",
    notes: "Customer requires certification of material. Special packaging instructions included in traveler.",
    lineItems: [
      {
        id: "LI-1042-1",
        partNumber: "PA-1042",
        partName: "Bracket Assembly A-1042",
        revision: "B",
        quantity: 25,
        completedQuantity: 10,
        material: "Aluminum 6061-T6",
        finish: "Black Anodize Type II",
        status: "In Production",
        traveler: {
          id: "TR-1042-1",
          name: "Bracket Assembly A-1042 Traveler",
          status: "In Progress",
          currentOperation: "CNC Milling",
          completionPercentage: 40,
          operations: [
            {
              id: 1,
              name: "Setup",
              machine: "CNC Mill 3",
              status: "Complete",
              time: "0.5 hours",
              operator: "Mike Johnson",
              completedDate: "2023-05-02",
              notes: "Setup completed without issues",
            },
            {
              id: 2,
              name: "First Operation",
              machine: "CNC Mill 3",
              status: "In Progress",
              time: "2.5 hours",
              operator: "Mike Johnson",
              completedDate: "",
              notes: "10 parts completed, 15 remaining",
            },
            {
              id: 3,
              name: "Second Operation",
              machine: "CNC Mill 3",
              status: "Pending",
              time: "2 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
            },
            {
              id: 4,
              name: "Deburr",
              machine: "Manual",
              status: "Pending",
              time: "0.5 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
            },
            {
              id: 5,
              name: "Finishing",
              machine: "Anodizing",
              status: "Pending",
              time: "2.5 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
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
            },
            {
              id: 2,
              name: "In-Process Inspection",
              status: "Pending",
              inspector: "Unassigned",
              date: "",
              result: "",
            },
            {
              id: 3,
              name: "Final Inspection",
              status: "Pending",
              inspector: "Unassigned",
              date: "",
              result: "",
            },
          ],
        },
      },
      {
        id: "LI-1042-2",
        partNumber: "PA-1043",
        partName: "Mounting Plate C-1043",
        revision: "A",
        quantity: 50,
        completedQuantity: 25,
        material: "Steel 1018",
        finish: "Zinc Plating",
        status: "In Production",
        traveler: {
          id: "TR-1042-2",
          name: "Mounting Plate C-1043 Traveler",
          status: "In Progress",
          currentOperation: "Press Brake",
          completionPercentage: 60,
          operations: [
            {
              id: 1,
              name: "Laser Cutting",
              machine: "Laser Cutter 2",
              status: "Complete",
              time: "1.5 hours",
              operator: "Sarah Williams",
              completedDate: "2023-05-02",
              notes: "All parts cut to specification",
            },
            {
              id: 2,
              name: "Deburring",
              machine: "Manual",
              status: "Complete",
              time: "1 hour",
              operator: "David Chen",
              completedDate: "2023-05-03",
              notes: "Edges deburred and inspected",
            },
            {
              id: 3,
              name: "Bending",
              machine: "Press Brake 1",
              status: "In Progress",
              time: "2 hours",
              operator: "Sarah Williams",
              completedDate: "",
              notes: "25 parts completed, 25 remaining",
            },
            {
              id: 4,
              name: "Finishing",
              machine: "Plating",
              status: "Pending",
              time: "3 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
            },
          ],
          qualityChecks: [
            {
              id: 1,
              name: "First Article Inspection",
              status: "Complete",
              inspector: "Sarah Williams",
              date: "2023-05-03",
              result: "Pass",
            },
            {
              id: 2,
              name: "Bend Angle Verification",
              status: "In Progress",
              inspector: "Sarah Williams",
              date: "",
              result: "",
            },
          ],
        },
      },
      {
        id: "LI-1042-3",
        partNumber: "PA-1044",
        partName: "Support Arm D-1044",
        revision: "A",
        quantity: 25,
        completedQuantity: 0,
        material: "Aluminum 6061-T6",
        finish: "Clear Anodize",
        status: "Pending",
        traveler: {
          id: "TR-1042-3",
          name: "Support Arm D-1044 Traveler",
          status: "Pending",
          currentOperation: "Not Started",
          completionPercentage: 0,
          operations: [
            {
              id: 1,
              name: "Setup",
              machine: "CNC Mill 2",
              status: "Pending",
              time: "0.5 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
            },
            {
              id: 2,
              name: "Machining",
              machine: "CNC Mill 2",
              status: "Pending",
              time: "3 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
            },
            {
              id: 3,
              name: "Deburr",
              machine: "Manual",
              status: "Pending",
              time: "0.5 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
            },
            {
              id: 4,
              name: "Finishing",
              machine: "Anodizing",
              status: "Pending",
              time: "2 hours",
              operator: "Unassigned",
              completedDate: "",
              notes: "",
            },
          ],
          qualityChecks: [
            {
              id: 1,
              name: "First Article Inspection",
              status: "Pending",
              inspector: "Unassigned",
              date: "",
              result: "",
            },
            {
              id: 2,
              name: "Final Inspection",
              status: "Pending",
              inspector: "Unassigned",
              date: "",
              result: "",
            },
          ],
        },
      },
    ],
    materials: [
      {
        id: "MAT-2023-0142",
        lineItemId: "LI-1042-1",
        type: "Aluminum 6061-T6",
        lotNumber: "LOT-AL6061-2023-042",
        quantity: "25 pcs",
        allocated: "25 pcs",
      },
      {
        id: "MAT-2023-0143",
        lineItemId: "LI-1042-2",
        type: "Steel 1018",
        lotNumber: "LOT-ST1018-2023-028",
        quantity: "50 pcs",
        allocated: "50 pcs",
      },
      {
        id: "MAT-2023-0144",
        lineItemId: "LI-1042-3",
        type: "Aluminum 6061-T6",
        lotNumber: "LOT-AL6061-2023-043",
        quantity: "25 pcs",
        allocated: "25 pcs",
      },
    ],
    attachments: [
      { name: "Work_Order_WO-2023-0542.pdf", type: "Work Order", date: "2023-05-01" },
      { name: "Production_Schedule.pdf", type: "Schedule", date: "2023-05-01" },
      { name: "Quality_Requirements.pdf", type: "Quality Doc", date: "2023-05-01" },
    ],
    timeEntries: [
      {
        id: 1,
        lineItemId: "LI-1042-1",
        operation: "Setup",
        operator: "Mike Johnson",
        startTime: "2023-05-02 08:30",
        endTime: "2023-05-02 08:54",
        duration: "0.4 hours",
      },
      {
        id: 2,
        lineItemId: "LI-1042-1",
        operation: "First Operation",
        operator: "Mike Johnson",
        startTime: "2023-05-02 09:15",
        endTime: "2023-05-02 10:45",
        duration: "1.5 hours",
      },
      {
        id: 3,
        lineItemId: "LI-1042-2",
        operation: "Laser Cutting",
        operator: "Sarah Williams",
        startTime: "2023-05-02 08:00",
        endTime: "2023-05-02 09:30",
        duration: "1.5 hours",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/work-orders">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Work Order: {params.id}</h1>
            <p className="text-muted-foreground">
              Order: {workOrder.orderNumber} | Department: {workOrder.department}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print Work Order
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
                {workOrder.status}
              </Badge>
              <div className="text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 inline mr-1" />
                Due: {workOrder.dueDate}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Priority: {workOrder.priority}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Estimated</p>
                <p className="font-medium">{workOrder.estimatedTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="font-medium">{workOrder.completedTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="font-medium">{workOrder.remainingTime}</p>
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
                <p className="font-medium">{workOrder.assignedTo}</p>
                <p className="text-sm text-muted-foreground">Lead Operator</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Department</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tool className="h-3 w-3" />
                  {workOrder.department}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Line Items & Digital Travelers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-4">Part</th>
                <th className="text-left font-medium p-4">Quantity</th>
                <th className="text-left font-medium p-4">Material</th>
                <th className="text-left font-medium p-4">Status</th>
                <th className="text-left font-medium p-4">Digital Traveler</th>
                <th className="text-left font-medium p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workOrder.lineItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">
                    <div className="font-medium">{item.partName}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.partNumber} | Rev {item.revision}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">
                      {item.completedQuantity} / {item.quantity}
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${(item.completedQuantity / item.quantity) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>{item.material}</div>
                    <div className="text-sm text-muted-foreground">{item.finish}</div>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        item.status === "Complete" ? "default" : item.status === "In Production" ? "warning" : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.traveler.status === "Complete"
                            ? "default"
                            : item.traveler.status === "In Progress"
                              ? "warning"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {item.traveler.status}
                      </Badge>
                      <div>
                        <div className="text-sm font-medium">{item.traveler.name}</div>
                        <div className="text-xs text-muted-foreground">Current: {item.traveler.currentOperation}</div>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${item.traveler.completionPercentage}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/travelers/${item.traveler.id}`}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Traveler
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Tabs defaultValue="travelers" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="travelers">Digital Travelers</TabsTrigger>
          <TabsTrigger value="quality">Quality Checks</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="travelers" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Digital Travelers & Operations</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Operation
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {workOrder.lineItems.map((item) => (
                <div key={item.id} className="border-b last:border-b-0">
                  <div className="p-4 bg-muted/30 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.partName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.partNumber} | Rev {item.revision} | Traveler: {item.traveler.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Progress:</span>{" "}
                        <span className="font-medium">{item.traveler.completionPercentage}%</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/travelers/${item.traveler.id}`}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Full Traveler
                        </Link>
                      </Button>
                    </div>
                  </div>
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
                      {item.traveler.operations.map((operation) => (
                        <tr key={operation.id} className="border-b last:border-b-0">
                          <td className="p-4">{operation.name}</td>
                          <td className="p-4">{operation.machine}</td>
                          <td className="p-4">{operation.operator}</td>
                          <td className="p-4">{operation.time}</td>
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
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quality" className="mt-4">
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
                    <th className="text-left font-medium p-4">Part</th>
                    <th className="text-left font-medium p-4">Check</th>
                    <th className="text-left font-medium p-4">Inspector</th>
                    <th className="text-left font-medium p-4">Date</th>
                    <th className="text-left font-medium p-4">Result</th>
                    <th className="text-left font-medium p-4">Status</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrder.lineItems.flatMap((item) =>
                    item.traveler.qualityChecks.map((check) => (
                      <tr key={`${item.id}-${check.id}`} className="border-b">
                        <td className="p-4">
                          <div className="font-medium">{item.partName}</div>
                          <div className="text-sm text-muted-foreground">{item.partNumber}</div>
                        </td>
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
                              <Search className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="materials" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Materials</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Part</th>
                    <th className="text-left font-medium p-4">Material</th>
                    <th className="text-left font-medium p-4">Lot Number</th>
                    <th className="text-left font-medium p-4">Quantity</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrder.materials.map((material) => {
                    const lineItem = workOrder.lineItems.find((item) => item.id === material.lineItemId)
                    return (
                      <tr key={material.id} className="border-b">
                        <td className="p-4">
                          <div className="font-medium">{lineItem?.partName}</div>
                          <div className="text-sm text-muted-foreground">{lineItem?.partNumber}</div>
                        </td>
                        <td className="p-4">{material.type}</td>
                        <td className="p-4">{material.lotNumber}</td>
                        <td className="p-4">{material.allocated}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="time" className="mt-4">
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
                    <th className="text-left font-medium p-4">Part</th>
                    <th className="text-left font-medium p-4">Operation</th>
                    <th className="text-left font-medium p-4">Operator</th>
                    <th className="text-left font-medium p-4">Start Time</th>
                    <th className="text-left font-medium p-4">End Time</th>
                    <th className="text-left font-medium p-4">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrder.timeEntries.map((entry) => {
                    const lineItem = workOrder.lineItems.find((item) => item.id === entry.lineItemId)
                    return (
                      <tr key={entry.id} className="border-b">
                        <td className="p-4">
                          <div className="font-medium">{lineItem?.partName}</div>
                          <div className="text-sm text-muted-foreground">{lineItem?.partNumber}</div>
                        </td>
                        <td className="p-4">{entry.operation}</td>
                        <td className="p-4">{entry.operator}</td>
                        <td className="p-4">{entry.startTime}</td>
                        <td className="p-4">{entry.endTime}</td>
                        <td className="p-4">{entry.duration}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Work Order Documents</h3>
                  <ul className="space-y-2">
                    {workOrder.attachments.map((attachment, index) => (
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

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Related Documents</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center">
                        <LucideLink className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">View Customer Order</p>
                          <p className="text-xs text-muted-foreground">Order {workOrder.orderNumber}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/orders/${workOrder.orderNumber}`}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                    {workOrder.lineItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <ClipboardList className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">View Digital Traveler for {item.partNumber}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.traveler.completionPercentage}% complete
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/travelers/${item.traveler.id}`}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Traveler
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Work Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Production Stats</h3>
                  <dl className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Total Parts:</dt>
                      <dd className="text-sm font-medium">
                        {workOrder.lineItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Completed:</dt>
                      <dd className="text-sm font-medium">
                        {workOrder.lineItems.reduce((sum, item) => sum + item.completedQuantity, 0)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Total Operations:</dt>
                      <dd className="text-sm font-medium">
                        {workOrder.lineItems.reduce((sum, item) => sum + item.traveler.operations.length, 0)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Quality Checks:</dt>
                      <dd className="text-sm font-medium">
                        {workOrder.lineItems.reduce((sum, item) => sum + item.traveler.qualityChecks.length, 0)}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Status Summary</h3>
                  <dl className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-muted-foreground">Line Items:</dt>
                      <dd className="flex gap-1">
                        <Badge variant="default" className="text-xs">
                          {workOrder.lineItems.filter((item) => item.status === "Complete").length} Complete
                        </Badge>
                        <Badge variant="warning" className="text-xs">
                          {workOrder.lineItems.filter((item) => item.status === "In Production").length} In Progress
                        </Badge>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-muted-foreground">Operations:</dt>
                      <dd className="flex gap-1">
                        <Badge variant="default" className="text-xs">
                          {workOrder.lineItems.reduce(
                            (sum, item) =>
                              sum + item.traveler.operations.filter((op) => op.status === "Complete").length,
                            0,
                          )}{" "}
                          Complete
                        </Badge>
                        <Badge variant="warning" className="text-xs">
                          {workOrder.lineItems.reduce(
                            (sum, item) =>
                              sum + item.traveler.operations.filter((op) => op.status === "In Progress").length,
                            0,
                          )}{" "}
                          In Progress
                        </Badge>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-muted-foreground">Quality:</dt>
                      <dd className="flex gap-1">
                        <Badge variant="success" className="text-xs">
                          {workOrder.lineItems.reduce(
                            (sum, item) =>
                              sum + item.traveler.qualityChecks.filter((check) => check.result === "Pass").length,
                            0,
                          )}{" "}
                          Pass
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                          {workOrder.lineItems.reduce(
                            (sum, item) =>
                              sum + item.traveler.qualityChecks.filter((check) => check.result === "Fail").length,
                            0,
                          )}{" "}
                          Fail
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium">Notes</h3>
                <p className="mt-2 text-sm">{workOrder.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Order Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">First Article Inspection Passed</h3>
                    <span className="text-sm text-muted-foreground">2023-05-02 14:30</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sarah Williams completed First Article Inspection for Bracket Assembly A-1042
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Operation Started</h3>
                    <span className="text-sm text-muted-foreground">2023-05-02 09:15</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mike Johnson started First Operation for Bracket Assembly A-1042
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Operation Completed</h3>
                    <span className="text-sm text-muted-foreground">2023-05-02 08:54</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mike Johnson completed Setup for Bracket Assembly A-1042
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Material Allocated</h3>
                    <span className="text-sm text-muted-foreground">2023-05-01 15:20</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Materials allocated for all line items in work order</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <BarChart4 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Work Order Created</h3>
                    <span className="text-sm text-muted-foreground">2023-05-01 10:15</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Work order created from order {workOrder.orderNumber}</p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Button variant="ghost" size="sm" className="text-sm">
                  <History className="h-3 w-3 mr-1" />
                  View Full History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
