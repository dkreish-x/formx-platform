import Link from "next/link"
import { ArrowLeft, Calendar, Clock, PenToolIcon as Tool, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"

// Mock data for a single work order
const getWorkOrder = (id: string) => {
  return {
    id,
    equipment: "CNC Mill #3",
    type: "Preventive",
    priority: "Medium",
    assignedTo: "John Smith",
    dueDate: "2023-05-15",
    status: "Scheduled",
    description:
      "Perform regular maintenance on CNC Mill #3. Check all fluid levels, lubricate moving parts, and calibrate axes.",
    location: "Manufacturing Floor - Bay 2",
    estimatedHours: 4,
    parts: [
      { id: "P001", name: "Hydraulic Oil", quantity: 2, unit: "L" },
      { id: "P002", name: "Grease Cartridge", quantity: 1, unit: "pc" },
      { id: "P003", name: "Filter Element", quantity: 1, unit: "pc" },
    ],
    instructions: [
      "Power down machine and lock out/tag out",
      "Check hydraulic fluid levels and top up if necessary",
      "Inspect all belts and replace if worn",
      "Lubricate all specified points according to maintenance manual",
      "Check axis calibration and adjust if needed",
      "Clean all filters",
      "Test machine operation",
      "Document all work performed",
    ],
    history: [
      { date: "2023-05-01", user: "System", action: "Work order created" },
      { date: "2023-05-02", user: "Jane Supervisor", action: "Assigned to John Smith" },
      { date: "2023-05-03", user: "John Smith", action: "Parts requested" },
    ],
  }
}

// Helper function to get status badge variant
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Scheduled":
      return "blue"
    case "In Progress":
      return "yellow"
    case "Completed":
      return "green"
    case "On Hold":
      return "orange"
    default:
      return "default"
  }
}

// Helper function to get priority badge variant
const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "destructive"
    case "High":
      return "red"
    case "Medium":
      return "yellow"
    case "Low":
      return "blue"
    default:
      return "default"
  }
}

export default function WorkOrderDetailPage({ params }: { params: { id: string } }) {
  const workOrder = getWorkOrder(params.id)

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/maintenance/work-orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Work Orders
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Work Order: {workOrder.id}</h1>
        <div className="flex flex-wrap gap-2">
          <StatusBadge variant={getStatusVariant(workOrder.status)}>{workOrder.status}</StatusBadge>
          <StatusBadge variant={getPriorityVariant(workOrder.priority)}>{workOrder.priority} Priority</StatusBadge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Work Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Equipment</div>
                <div className="flex items-center gap-2">
                  <Tool className="h-4 w-4 text-muted-foreground" />
                  <span>{workOrder.equipment}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Type</div>
                <div>{workOrder.type}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Assigned To</div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{workOrder.assignedTo}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Due Date</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{workOrder.dueDate}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Location</div>
                <div>{workOrder.location}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Estimated Hours</div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{workOrder.estimatedHours} hours</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground">Description</div>
              <p className="mt-1 text-sm">{workOrder.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Required Parts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-xs">
                    <th className="px-2 py-2 text-left font-medium">Part ID</th>
                    <th className="px-2 py-2 text-left font-medium">Name</th>
                    <th className="px-2 py-2 text-left font-medium">Quantity</th>
                    <th className="px-2 py-2 text-left font-medium">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrder.parts.map((part) => (
                    <tr key={part.id} className="border-b">
                      <td className="px-2 py-2 text-sm">{part.id}</td>
                      <td className="px-2 py-2 text-sm">{part.name}</td>
                      <td className="px-2 py-2 text-sm">{part.quantity}</td>
                      <td className="px-2 py-2 text-sm">{part.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Work Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              {workOrder.instructions.map((instruction, index) => (
                <li key={index} className="text-sm">
                  {instruction}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workOrder.history.map((entry, index) => (
                <div key={index} className="border-b pb-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{entry.action}</span>
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{entry.user}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Update Status</Button>
        <Button className="bg-[#D4AF37] text-white hover:bg-[#B8971F]">Complete Work Order</Button>
      </div>
    </div>
  )
}
