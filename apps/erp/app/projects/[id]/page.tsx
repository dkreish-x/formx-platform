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
  User,
  CheckCircle,
  BarChart,
  MessageSquare,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real implementation, this would be fetched from the API
  const project = {
    id: params.id,
    name: "Acme Robotics Automation",
    customer: "Acme Industries",
    status: "In Progress",
    completionPercentage: 40,
    startDate: "2023-05-01",
    dueDate: "2023-06-15",
    manager: "John Doe",
    description:
      "Design and manufacture of custom automation components for Acme's new robotics assembly line. Includes 12 different parts with varying quantities.",
    budget: "$125,000",
    actualCost: "$52,000",
    remainingBudget: "$73,000",
    team: [
      { name: "John Doe", role: "Project Manager", email: "john.doe@formx.com" },
      { name: "Sarah Williams", role: "Quality Manager", email: "sarah.williams@formx.com" },
      { name: "Mike Johnson", role: "Production Lead", email: "mike.johnson@formx.com" },
      { name: "David Chen", role: "Design Engineer", email: "david.chen@formx.com" },
    ],
    parts: [
      {
        id: "PA-1042",
        name: "Bracket Assembly",
        status: "In Production",
        quantity: 25,
        completedQuantity: 10,
        dueDate: "2023-05-15",
      },
      {
        id: "PA-2310",
        name: "Mounting Plate",
        status: "Quality Check",
        quantity: 25,
        completedQuantity: 20,
        dueDate: "2023-05-14",
      },
      {
        id: "PA-4502",
        name: "Housing Cover",
        status: "Material Prep",
        quantity: 25,
        completedQuantity: 0,
        dueDate: "2023-05-20",
      },
      {
        id: "PA-1205",
        name: "Shaft Coupling",
        status: "Complete",
        quantity: 50,
        completedQuantity: 50,
        dueDate: "2023-05-10",
      },
      {
        id: "PA-3301",
        name: "Gear Assembly",
        status: "Design",
        quantity: 25,
        completedQuantity: 0,
        dueDate: "2023-05-25",
      },
    ],
    milestones: [
      {
        name: "Design Approval",
        dueDate: "2023-05-05",
        status: "Complete",
        completedDate: "2023-05-04",
      },
      {
        name: "Material Procurement",
        dueDate: "2023-05-10",
        status: "Complete",
        completedDate: "2023-05-09",
      },
      {
        name: "First Article Production",
        dueDate: "2023-05-20",
        status: "In Progress",
        completedDate: "",
      },
      {
        name: "Quality Verification",
        dueDate: "2023-06-01",
        status: "Pending",
        completedDate: "",
      },
      {
        name: "Final Delivery",
        dueDate: "2023-06-15",
        status: "Pending",
        completedDate: "",
      },
    ],
    files: [
      { name: "Project_Scope.pdf", type: "Document", date: "2023-05-01" },
      { name: "Assembly_Drawing.pdf", type: "Drawing", date: "2023-05-02" },
      { name: "BOM.xlsx", type: "Spreadsheet", date: "2023-05-03" },
      { name: "Timeline.pdf", type: "Document", date: "2023-05-01" },
    ],
    updates: [
      {
        date: "2023-05-09",
        author: "John Doe",
        content: "All materials have been received and production has started on the first batch of parts.",
      },
      {
        date: "2023-05-04",
        author: "David Chen",
        content: "Design approval received from customer. Moving forward with material procurement.",
      },
      {
        date: "2023-05-01",
        author: "John Doe",
        content: "Project kickoff meeting completed. Timeline and deliverables confirmed with customer.",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground">
              Project ID: {params.id} | Customer: {project.customer}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Update
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
                {project.status}
              </Badge>
              <div className="text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 inline mr-1" />
                Due: {project.dueDate}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{project.completionPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${project.completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Start Date</span>
                <span className="text-sm font-medium">{project.startDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <div className="mt-1">
                  <span className="text-xl font-bold">{project.budget}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <div className="mt-1">
                  <span className="text-xl font-bold">{project.actualCost}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <div className="mt-1">
                  <span className="text-xl font-bold">{project.remainingBudget}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Budget Utilization</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <p className="font-medium">{project.manager}</p>
                <p className="text-sm text-muted-foreground">Project Manager</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Team Members</p>
                <Badge variant="outline">{project.team.length}</Badge>
              </div>
              <div className="flex -space-x-2 mt-2">
                {project.team.map((member, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background"
                    title={`${member.name} - ${member.role}`}
                  >
                    {member.name.charAt(0)}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full ml-1 flex items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="parts">Parts</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="mt-2 text-sm">{project.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h3 className="font-medium">Project Information</h3>
                    <dl className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Customer:</dt>
                        <dd className="text-sm font-medium">{project.customer}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Start Date:</dt>
                        <dd className="text-sm font-medium">{project.startDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Due Date:</dt>
                        <dd className="text-sm font-medium">{project.dueDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Status:</dt>
                        <dd className="text-sm font-medium">{project.status}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="font-medium">Financial Information</h3>
                    <dl className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Total Budget:</dt>
                        <dd className="text-sm font-medium">{project.budget}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Actual Cost:</dt>
                        <dd className="text-sm font-medium">{project.actualCost}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Remaining Budget:</dt>
                        <dd className="text-sm font-medium">{project.remainingBudget}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.updates.map((update, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{update.author}</span>
                        <span className="text-xs text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="mt-1 text-sm">{update.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Parts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.parts.slice(0, 3).map((part) => (
                    <div key={part.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <div className="font-medium">{part.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {part.id} • {part.completedQuantity}/{part.quantity} completed
                        </div>
                      </div>
                      <Badge
                        variant={
                          part.status === "Complete"
                            ? "default"
                            : part.status === "In Production"
                              ? "warning"
                              : part.status === "Quality Check"
                                ? "info"
                                : "secondary"
                        }
                      >
                        {part.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="#" onClick={() => setActiveTab("parts")}>
                      View All Parts
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones
                    .filter((milestone) => milestone.status !== "Complete")
                    .slice(0, 3)
                    .map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-xs text-muted-foreground">Due: {milestone.dueDate}</div>
                        </div>
                        <Badge
                          variant={
                            milestone.status === "Complete"
                              ? "default"
                              : milestone.status === "In Progress"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                    ))}
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="#" onClick={() => setActiveTab("milestones")}>
                      View All Milestones
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parts" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Parts</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Part
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Part</th>
                    <th className="text-left font-medium p-4">Status</th>
                    <th className="text-left font-medium p-4">Quantity</th>
                    <th className="text-left font-medium p-4">Due Date</th>
                    <th className="text-left font-medium p-4">Progress</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {project.parts.map((part) => (
                    <tr key={part.id} className="border-b">
                      <td className="p-4">
                        <div className="font-medium">{part.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {part.id}</div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            part.status === "Complete"
                              ? "default"
                              : part.status === "In Production"
                                ? "warning"
                                : part.status === "Quality Check"
                                  ? "info"
                                  : "secondary"
                          }
                        >
                          {part.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div>
                          <span className="font-medium">{part.completedQuantity}</span>
                          <span className="text-muted-foreground">/{part.quantity}</span>
                        </div>
                      </td>
                      <td className="p-4">{part.dueDate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{
                                width: `${Math.round((part.completedQuantity / part.quantity) * 100)}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs">{Math.round((part.completedQuantity / part.quantity) * 100)}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/travelers/${part.id.replace("PA-", "TRAV-")}`}>View</Link>
                          </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Part Status Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <p className="ml-2 text-sm text-muted-foreground">Part status chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.parts.map((part) => (
                    <div key={part.id} className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          part.status === "Complete"
                            ? "bg-green-100 text-green-600"
                            : part.status === "In Production"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {part.status === "Complete" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : part.status === "In Production" ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{part.name}</h3>
                          <span className="text-sm text-muted-foreground">Due: {part.dueDate}</span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <span>
                            {part.completedQuantity}/{part.quantity} completed
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Milestones</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Milestone</th>
                    <th className="text-left font-medium p-4">Due Date</th>
                    <th className="text-left font-medium p-4">Completed Date</th>
                    <th className="text-left font-medium p-4">Status</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {project.milestones.map((milestone, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">{milestone.name}</td>
                      <td className="p-4">{milestone.dueDate}</td>
                      <td className="p-4">{milestone.completedDate || "-"}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            milestone.status === "Complete"
                              ? "default"
                              : milestone.status === "In Progress"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {milestone.status !== "Complete" && (
                            <Button variant="outline" size="sm">
                              Mark Complete
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
              <CardTitle>Milestone Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        milestone.status === "Complete"
                          ? "bg-green-100 text-green-600"
                          : milestone.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {milestone.status === "Complete" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : milestone.status === "In Progress" ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{milestone.name}</h3>
                        <Badge
                          variant={
                            milestone.status === "Complete"
                              ? "default"
                              : milestone.status === "In Progress"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span>Due: {milestone.dueDate}</span>
                        {milestone.completedDate && <span className="ml-4">Completed: {milestone.completedDate}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Name</th>
                    <th className="text-left font-medium p-4">Role</th>
                    <th className="text-left font-medium p-4">Email</th>
                    <th className="text-left font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {project.team.map((member, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {member.name.charAt(0)}
                          </div>
                          <span>{member.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{member.role}</td>
                      <td className="p-4">{member.email}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <p className="ml-2 text-sm text-muted-foreground">Team roles chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.updates.map((update, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {update.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{update.author}</h3>
                          <span className="text-sm text-muted-foreground">{update.date}</span>
                        </div>
                        <p className="mt-1 text-sm">{update.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project Files</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Documents</h3>
                  <ul className="mt-2 space-y-2">
                    {project.files
                      .filter((file) => file.type === "Document")
                      .map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {file.type} • {file.date}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Drawings</h3>
                  <ul className="mt-2 space-y-2">
                    {project.files
                      .filter((file) => file.type === "Drawing")
                      .map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.type} • {file.date}
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
                  <h3 className="text-sm font-medium">Spreadsheets</h3>
                  <ul className="mt-2 space-y-2">
                    {project.files
                      .filter((file) => file.type === "Spreadsheet")
                      .map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.type} • {file.date}
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

          <Card>
            <CardHeader>
              <CardTitle>File Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <div className="relative h-96 w-full">
                  <Image src="/placeholder.svg?key=0crrz" alt="File Preview" fill className="object-contain" />
                </div>
                <div className="p-3 border-t flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Assembly_Drawing.pdf</p>
                    <p className="text-xs text-muted-foreground">Drawing • 2023-05-02</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
