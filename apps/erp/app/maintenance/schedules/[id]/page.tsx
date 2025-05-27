"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  PenToolIcon as Tool,
  Printer,
  UserCheck,
  CalendarClock,
  History,
  ClipboardList,
  FileBox,
  Wrench,
  ArrowLeft,
} from "lucide-react"

export default function MaintenanceScheduleDetailsPage() {
  const params = useParams()
  const scheduleId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")

  // In a real implementation, this would be fetched from the API
  const schedule = {
    id: scheduleId,
    equipment: "CNC Mill 3",
    type: "Preventive",
    frequency: "Monthly",
    lastPerformed: "2023-04-12",
    dueDate: "2023-05-12",
    status: scheduleId === "MAINT-2023-044" ? "Overdue" : "Scheduled",
    assignee: "Mike Johnson",
    estimatedDuration: "4 hours",
    department: "Production",
    location: "Building A, Room 105",
    priority: "Medium",
    completionRate: 0,
    description:
      "Monthly preventive maintenance for CNC Mill 3. Includes lubrication, calibration, and general inspection of all components.",
    tasks: [
      { id: 1, name: "Check and refill lubrication reservoirs", completed: false },
      { id: 2, name: "Inspect tool changer mechanism", completed: false },
      { id: 3, name: "Clean machine and surrounding area", completed: false },
      { id: 4, name: "Check for loose bolts and components", completed: false },
      { id: 5, name: "Verify alignment and calibration", completed: false },
      { id: 6, name: "Inspect electrical connections", completed: false },
      { id: 7, name: "Test emergency stop functionality", completed: false },
      { id: 8, name: "Check coolant concentration and condition", completed: false },
    ],
    history: [
      {
        id: "REC-2023-112",
        date: "2023-04-12",
        technician: "Mike Johnson",
        duration: "3.5 hours",
        notes: "Replaced worn belts and adjusted tension. All systems functioning normally.",
        status: "Completed",
      },
      {
        id: "REC-2023-098",
        date: "2023-03-15",
        technician: "Sarah Williams",
        duration: "4 hours",
        notes: "General maintenance performed. Noted slight vibration in spindle - will monitor.",
        status: "Completed",
      },
      {
        id: "REC-2023-076",
        date: "2023-02-10",
        technician: "Mike Johnson",
        duration: "5 hours",
        notes: "Replaced spindle bearings. Calibrated axes. Machine running smoothly.",
        status: "Completed",
      },
    ],
    documents: [
      { id: "DOC-001", name: "CNC Mill 3 Manual", type: "PDF", size: "15.2 MB", updated: "2022-01-15" },
      { id: "DOC-002", name: "Maintenance Procedures", type: "PDF", size: "2.8 MB", updated: "2022-06-22" },
      { id: "DOC-003", name: "Calibration Guide", type: "PDF", size: "4.1 MB", updated: "2022-03-10" },
      { id: "DOC-004", name: "Parts Diagram", type: "PDF", size: "8.5 MB", updated: "2022-01-15" },
    ],
    parts: [
      { id: "PART-001", name: "Lubrication Oil", quantity: 2, unit: "Liters", inStock: true },
      { id: "PART-002", name: "Drive Belt", quantity: 1, unit: "Piece", inStock: true },
      { id: "PART-003", name: "Spindle Bearing", quantity: 2, unit: "Piece", inStock: false },
      { id: "PART-004", name: "Coolant", quantity: 5, unit: "Liters", inStock: true },
    ],
  }

  const handleTaskChange = (taskId: number) => {
    // In a real implementation, this would update the task status in the database
    console.log(`Task ${taskId} status changed`)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/maintenance/schedules" className="text-muted-foreground hover:text-foreground">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">{schedule.id}</h1>
            <Badge
              variant={
                schedule.status === "Completed"
                  ? "default"
                  : schedule.status === "Scheduled"
                    ? "secondary"
                    : "destructive"
              }
            >
              {schedule.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Maintenance schedule for {schedule.equipment}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <UserCheck className="mr-2 h-4 w-4" />
            Assign
          </Button>
          <Button variant="outline" size="sm">
            <CalendarClock className="mr-2 h-4 w-4" />
            Reschedule
          </Button>
          <Button variant="default" size="sm">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Complete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Details</CardTitle>
            <CardDescription>Schedule information and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="parts">Parts</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Equipment</h3>
                      <p className="text-base font-medium">{schedule.equipment}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                      <p className="text-base font-medium">{schedule.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Frequency</h3>
                      <p className="text-base font-medium">{schedule.frequency}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                      <p className="text-base font-medium">{schedule.department}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p className="text-base font-medium">{schedule.location}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Last Performed</h3>
                      <p className="text-base font-medium">{schedule.lastPerformed}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                      <p className="text-base font-medium">{schedule.dueDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Assignee</h3>
                      <p className="text-base font-medium">{schedule.assignee}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Estimated Duration</h3>
                      <p className="text-base font-medium">{schedule.estimatedDuration}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                      <p className="text-base font-medium">{schedule.priority}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm">{schedule.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Completion</h3>
                  <Progress value={schedule.completionRate} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{schedule.completionRate}% complete</p>
                </div>
              </TabsContent>
              <TabsContent value="tasks" className="space-y-4">
                <div className="border rounded-md divide-y">
                  {schedule.tasks.map((task) => (
                    <div key={task.id} className="flex items-center p-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleTaskChange(task.id)}
                        className="mr-3"
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`text-sm flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.name}
                      </label>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <div className="border rounded-md divide-y">
                  {schedule.history.map((record) => (
                    <div key={record.id} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{record.id}</Badge>
                          <span className="text-sm font-medium">{record.date}</span>
                        </div>
                        <Badge variant={record.status === "Completed" ? "default" : "secondary"} className="ml-auto">
                          {record.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div className="flex items-center text-sm">
                          <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{record.technician}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{record.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                      <div className="mt-2">
                        <Link
                          href={`/maintenance/records/${record.id}`}
                          className="text-xs text-primary hover:underline"
                        >
                          View full record
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4">
                <div className="border rounded-md divide-y">
                  {schedule.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • Updated {doc.updated}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="parts" className="space-y-4">
                <div className="border rounded-md divide-y">
                  {schedule.parts.map((part) => (
                    <div key={part.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center">
                        <Wrench className="h-4 w-4 mr-3 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{part.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {part.quantity} {part.unit}
                          </p>
                        </div>
                      </div>
                      <Badge variant={part.inStock ? "default" : "destructive"}>
                        {part.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Equipment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Tool className="h-16 w-16 text-muted-foreground/50" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Health Score</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="pt-2">
                <Link href="/maintenance/equipment/CNC-MILL-3" className="text-sm text-primary hover:underline">
                  View equipment details
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="space-y-1 pb-4">
                    <p className="text-sm font-medium">Schedule Created</p>
                    <p className="text-xs text-muted-foreground">Jan 15, 2023</p>
                    <p className="text-xs">Initial maintenance schedule created for CNC Mill 3</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <History className="h-4 w-4" />
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="space-y-1 pb-4">
                    <p className="text-sm font-medium">Last Maintenance</p>
                    <p className="text-xs text-muted-foreground">Apr 12, 2023</p>
                    <p className="text-xs">Routine maintenance performed by Mike Johnson</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <ClipboardList className="h-4 w-4" />
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="space-y-1 pb-4">
                    <p className="text-sm font-medium">Current Schedule</p>
                    <p className="text-xs text-muted-foreground">May 12, 2023</p>
                    <p className="text-xs">Scheduled maintenance due</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <FileBox className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Next Schedule</p>
                    <p className="text-xs text-muted-foreground">Jun 12, 2023</p>
                    <p className="text-xs">Future scheduled maintenance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
