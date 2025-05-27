"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { Plus, Filter, Clock, CalendarDays, CheckCircle } from "lucide-react"

// Sample data for tasks
const tasks = [
  {
    id: "TASK-001",
    title: "Follow up with Acme Industries",
    description: "Call John to discuss the custom machining project quote",
    dueDate: "2023-05-15",
    priority: "high",
    status: "pending",
    assignedTo: "Jane Doe",
    relatedTo: {
      type: "Customer",
      id: "CUST-001",
      name: "Acme Industries",
    },
  },
  {
    id: "TASK-002",
    title: "Prepare proposal for TechPro",
    description: "Create detailed proposal for the production line automation project",
    dueDate: "2023-05-18",
    priority: "medium",
    status: "in_progress",
    assignedTo: "Mike Wilson",
    relatedTo: {
      type: "Opportunity",
      id: "OPP-002",
      name: "Production Line Automation",
    },
  },
  {
    id: "TASK-003",
    title: "Send Technical Specs",
    description: "Email technical specifications to Precision Engineering",
    dueDate: "2023-05-12",
    priority: "medium",
    status: "completed",
    assignedTo: "John Smith",
    relatedTo: {
      type: "Customer",
      id: "CUST-004",
      name: "Precision Engineering",
    },
  },
  {
    id: "TASK-004",
    title: "Schedule site visit",
    description: "Arrange on-site visit to Global Manufacturing",
    dueDate: "2023-05-20",
    priority: "low",
    status: "pending",
    assignedTo: "Sarah Johnson",
    relatedTo: {
      type: "Lead",
      id: "LEAD-003",
      name: "Global Manufacturing",
    },
  },
  {
    id: "TASK-005",
    title: "Update lead information",
    description: "Update lead details for Tech Dynamics",
    dueDate: "2023-05-14",
    priority: "low",
    status: "pending",
    assignedTo: "Jane Doe",
    relatedTo: {
      type: "Lead",
      id: "LEAD-002",
      name: "Tech Dynamics",
    },
  },
  {
    id: "TASK-006",
    title: "Prepare quote for machine parts",
    description: "Create quote for custom machine parts for Innovative Solutions",
    dueDate: "2023-05-16",
    priority: "urgent",
    status: "pending",
    assignedTo: "John Smith",
    relatedTo: {
      type: "Customer",
      id: "CUST-003",
      name: "Innovative Metals",
    },
  },
]

export default function TasksPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your team's tasks and activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/crm/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-4 border shadow-sm">
          <CardHeader className="flex flex-row items-center pb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <CardTitle>All Tasks</CardTitle>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Sort by Due Date
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Task</th>
                    <th className="py-3 px-4 text-left font-medium">Related To</th>
                    <th className="py-3 px-4 text-left font-medium">Priority</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Due Date</th>
                    <th className="py-3 px-4 text-left font-medium">Assigned To</th>
                    <th className="py-3 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b hover:bg-primary/5 cursor-pointer"
                      onClick={() => (window.location.href = `/crm/tasks/${task.id}`)}
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">{task.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/${task.relatedTo.type.toLowerCase()}s/${task.relatedTo.id}`}
                          className="text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {task.relatedTo.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">{task.relatedTo.type}</div>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge
                          status={
                            task.priority === "urgent"
                              ? "error"
                              : task.priority === "high"
                                ? "warning"
                                : task.priority === "medium"
                                  ? "info"
                                  : "default"
                          }
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </StatusBadge>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge
                          status={
                            task.status === "completed"
                              ? "success"
                              : task.status === "in_progress"
                                ? "warning"
                                : task.status === "pending"
                                  ? "info"
                                  : "default"
                          }
                        >
                          {task.status === "in_progress"
                            ? "In Progress"
                            : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </StatusBadge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                          {task.dueDate}
                        </div>
                      </td>
                      <td className="py-3 px-4">{task.assignedTo}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Mark as complete
                            }}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Complete</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.location.href = `/crm/tasks/${task.id}/edit`
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              Tasks Due Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.dueDate === "2023-05-15")
                .map((task) => (
                  <div key={task.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/crm/tasks/${task.id}`} className="font-medium hover:underline">
                      {task.title}
                    </Link>
                    <div className="text-sm text-muted-foreground mt-1">{task.assignedTo}</div>
                    <div className="flex items-center justify-between mt-2">
                      <StatusBadge
                        status={
                          task.priority === "urgent"
                            ? "error"
                            : task.priority === "high"
                              ? "warning"
                              : task.priority === "medium"
                                ? "info"
                                : "default"
                        }
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </StatusBadge>
                      <Button variant="outline" size="sm" className="h-7">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status !== "completed")
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 5)
                .map((task) => (
                  <div key={task.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/crm/tasks/${task.id}`} className="font-medium hover:underline">
                      {task.title}
                    </Link>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      {task.dueDate}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm">{task.assignedTo}</div>
                      <StatusBadge
                        status={
                          task.status === "completed"
                            ? "success"
                            : task.status === "in_progress"
                              ? "warning"
                              : task.status === "pending"
                                ? "info"
                                : "default"
                        }
                      >
                        {task.status === "in_progress"
                          ? "In Progress"
                          : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </StatusBadge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-muted-foreground" />
              Recently Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === "completed")
                .map((task) => (
                  <div key={task.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/crm/tasks/${task.id}`} className="font-medium hover:underline line-through">
                      {task.title}
                    </Link>
                    <div className="text-sm text-muted-foreground mt-1">{task.assignedTo}</div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      Completed on {task.dueDate}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
