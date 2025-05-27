import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plus,
  PenToolIcon as Tool,
  Clock,
  BarChart,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Machine Setup & Tooling",
  description: "Manage machine setups, tooling, and fixtures for CNC operations",
}

export default function MachineSetupPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Machine Setup & Tooling</h1>
          <p className="text-muted-foreground">Manage machine setups, tooling, and fixtures for CNC operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Setup
          </Button>
          <Button variant="outline" size="sm">
            <Tool className="mr-2 h-4 w-4" />
            Tool Library
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Setup History
          </Button>
          <Button size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      <Tabs defaultValue="setups" className="w-full">
        <TabsList>
          <TabsTrigger value="setups">Machine Setups</TabsTrigger>
          <TabsTrigger value="tooling">Tooling</TabsTrigger>
          <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
          <TabsTrigger value="programs">CNC Programs</TabsTrigger>
        </TabsList>
        <TabsContent value="setups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Machine Setups</CardTitle>
              <CardDescription>Manage and track machine setups for jobs</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Inline implementation of MachineSetupTooling */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search setups..." className="w-[250px] pl-8" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Setup
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Setup ID</TableHead>
                        <TableHead>Machine</TableHead>
                        <TableHead>Job</TableHead>
                        <TableHead>Operator</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Setup Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {machineSetups.map((setup) => (
                        <TableRow key={setup.id}>
                          <TableCell className="font-medium">{setup.id}</TableCell>
                          <TableCell>{setup.machine}</TableCell>
                          <TableCell>{setup.job}</TableCell>
                          <TableCell>{setup.operator}</TableCell>
                          <TableCell>
                            <SetupStatusBadge status={setup.status} />
                          </TableCell>
                          <TableCell>{setup.setupTime}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tooling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tooling Management</CardTitle>
              <CardDescription>Track tool inventory, usage, and wear</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Tooling management module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fixtures" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fixture Library</CardTitle>
              <CardDescription>Manage fixtures and workholding devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Fixture library module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CNC Programs</CardTitle>
              <CardDescription>Manage and version control CNC programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                CNC programs module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper component for status badges
function SetupStatusBadge({ status }: { status: string }) {
  let Icon = Clock
  let className = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"

  if (status === "completed") {
    Icon = CheckCircle2
    className = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  } else if (status === "in-progress") {
    Icon = Clock3
    className = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  } else if (status === "delayed") {
    Icon = AlertCircle
    className = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <Badge variant="outline" className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

// Sample data
const machineSetups = [
  {
    id: "SETUP-001",
    machine: "CNC Mill #3",
    job: "JOB-2023-089",
    operator: "John Smith",
    status: "in-progress",
    setupTime: "45 min",
  },
  {
    id: "SETUP-002",
    machine: "CNC Lathe #2",
    job: "JOB-2023-092",
    operator: "Maria Garcia",
    status: "planned",
    setupTime: "30 min",
  },
  {
    id: "SETUP-003",
    machine: "CNC Mill #1",
    job: "JOB-2023-087",
    operator: "Robert Chen",
    status: "completed",
    setupTime: "60 min",
  },
  {
    id: "SETUP-004",
    machine: "CNC Router #1",
    job: "JOB-2023-095",
    operator: "Sarah Johnson",
    status: "delayed",
    setupTime: "90 min",
  },
  {
    id: "SETUP-005",
    machine: "CNC Mill #2",
    job: "JOB-2023-098",
    operator: "David Kim",
    status: "planned",
    setupTime: "45 min",
  },
]
