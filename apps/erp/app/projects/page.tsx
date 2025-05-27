import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus, Search, Filter, ArrowUpDown, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  // In a real implementation, these would be fetched from the API
  const projects = [
    {
      id: "PROJ-2023-0142",
      name: "Acme Robotics Automation",
      customer: "Acme Industries",
      status: "In Progress",
      completionPercentage: 40,
      startDate: "2023-05-01",
      dueDate: "2023-06-15",
      manager: "John Doe",
      totalParts: 12,
      completedParts: 5,
    },
    {
      id: "PROJ-2023-0143",
      name: "TechCorp Medical Device",
      customer: "TechCorp Solutions",
      status: "Planning",
      completionPercentage: 10,
      startDate: "2023-05-10",
      dueDate: "2023-07-20",
      manager: "Sarah Williams",
      totalParts: 8,
      completedParts: 0,
    },
    {
      id: "PROJ-2023-0144",
      name: "Innovate Engineering Prototype",
      customer: "Innovate Engineering",
      status: "On Hold",
      completionPercentage: 60,
      startDate: "2023-04-15",
      dueDate: "2023-05-30",
      manager: "Mike Johnson",
      totalParts: 5,
      completedParts: 3,
    },
    {
      id: "PROJ-2023-0145",
      name: "Global Manufacturing Assembly",
      customer: "Global Manufacturing",
      status: "Complete",
      completionPercentage: 100,
      startDate: "2023-03-01",
      dueDate: "2023-04-30",
      manager: "David Chen",
      totalParts: 20,
      completedParts: 20,
    },
    {
      id: "PROJ-2023-0146",
      name: "Precision Parts Custom Tooling",
      customer: "Precision Parts Inc",
      status: "In Progress",
      completionPercentage: 75,
      startDate: "2023-04-01",
      dueDate: "2023-05-20",
      manager: "John Doe",
      totalParts: 15,
      completedParts: 11,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track manufacturing projects.</p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="flex-1" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium p-4">
                    <div className="flex items-center gap-1">
                      Project
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="text-left font-medium p-4">Customer</th>
                  <th className="text-left font-medium p-4">Manager</th>
                  <th className="text-left font-medium p-4">Timeline</th>
                  <th className="text-left font-medium p-4">Progress</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="p-4">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {project.id}</div>
                    </td>
                    <td className="p-4">{project.customer}</td>
                    <td className="p-4">{project.manager}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{project.dueDate}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Started: {project.startDate}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${project.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{project.completionPercentage}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Parts: {project.completedParts}/{project.totalParts}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          project.status === "Complete"
                            ? "default"
                            : project.status === "In Progress"
                              ? "warning"
                              : project.status === "Planning"
                                ? "info"
                                : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
