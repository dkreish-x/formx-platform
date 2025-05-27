import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Layers,
  Printer,
  Download,
  Share2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Work Instructions | Form(X) Manufacturing",
  description: "Manage and view work instructions for manufacturing processes",
}

export default function WorkInstructionsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between space-y-2 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Work Instructions</h2>
          <p className="text-muted-foreground">
            Manage and access detailed work instructions for all manufacturing processes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Instruction
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="px-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Instructions</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search instructions..." className="w-[250px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workInstructions.map((instruction) => (
              <InstructionCard key={instruction.id} instruction={instruction} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workInstructions
              .filter((instruction) => instruction.status === "Active")
              .map((instruction) => (
                <InstructionCard key={instruction.id} instruction={instruction} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workInstructions
              .filter((instruction) => instruction.status === "Draft")
              .map((instruction) => (
                <InstructionCard key={instruction.id} instruction={instruction} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workInstructions
              .filter((instruction) => instruction.status === "Archived")
              .map((instruction) => (
                <InstructionCard key={instruction.id} instruction={instruction} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Instruction {
  id: string
  title: string
  description: string
  department: string
  version: string
  lastUpdated: string
  status: "Active" | "Draft" | "Archived"
  type: string
}

function InstructionCard({ instruction }: { instruction: Instruction }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{instruction.title}</CardTitle>
          <StatusBadge status={instruction.status} />
        </div>
        <CardDescription className="line-clamp-2">{instruction.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center">
            <Layers className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Type:</span>
            <span className="ml-1 font-medium">{instruction.type}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Dept:</span>
            <span className="ml-1 font-medium">{instruction.department}</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Version:</span>
            <span className="ml-1 font-medium">{instruction.version}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Updated:</span>
            <span className="ml-1 font-medium">{instruction.lastUpdated}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="sm">
            View
          </Button>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-100 text-gray-800"
  let Icon = Clock

  if (status === "Active") {
    color = "bg-green-100 text-green-800"
    Icon = CheckCircle2
  } else if (status === "Archived") {
    color = "bg-amber-100 text-amber-800"
    Icon = AlertCircle
  }

  return (
    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </div>
  )
}

// Sample data
const workInstructions: Instruction[] = [
  {
    id: "WI-001",
    title: "CNC Machine Setup Procedure",
    description: "Detailed instructions for setting up the Haas VF-2 CNC machine for precision milling operations",
    department: "Machining",
    version: "2.3",
    lastUpdated: "2023-04-15",
    status: "Active",
    type: "Machine Setup",
  },
  {
    id: "WI-002",
    title: "Quality Inspection Protocol",
    description: "Step-by-step guide for performing quality inspections on finished metal components",
    department: "Quality",
    version: "1.5",
    lastUpdated: "2023-05-22",
    status: "Active",
    type: "Inspection",
  },
  {
    id: "WI-003",
    title: "Laser Cutting Parameter Guide",
    description: "Reference guide for laser cutting parameters based on material type and thickness",
    department: "Fabrication",
    version: "3.1",
    lastUpdated: "2023-03-10",
    status: "Active",
    type: "Reference",
  },
  {
    id: "WI-004",
    title: "Assembly Process for Product X",
    description: "Assembly instructions for Product X including torque specifications and sequence",
    department: "Assembly",
    version: "1.0",
    lastUpdated: "2023-06-05",
    status: "Draft",
    type: "Assembly",
  },
  {
    id: "WI-005",
    title: "Material Handling Guidelines",
    description: "Safety procedures and best practices for handling raw materials and finished goods",
    department: "Warehouse",
    version: "2.2",
    lastUpdated: "2023-02-18",
    status: "Active",
    type: "Safety",
  },
  {
    id: "WI-006",
    title: "Welding Procedure for Stainless Steel",
    description: "Detailed welding procedure for 304 and 316 stainless steel components",
    department: "Welding",
    version: "1.7",
    lastUpdated: "2023-01-30",
    status: "Active",
    type: "Process",
  },
  {
    id: "WI-007",
    title: "Preventive Maintenance for Hydraulic Press",
    description: "Schedule and procedures for preventive maintenance of the hydraulic press",
    department: "Maintenance",
    version: "1.2",
    lastUpdated: "2022-11-15",
    status: "Archived",
    type: "Maintenance",
  },
  {
    id: "WI-008",
    title: "Packaging Instructions for Fragile Components",
    description: "Packaging guidelines to ensure safe transport of fragile machined components",
    department: "Shipping",
    version: "1.1",
    lastUpdated: "2023-04-02",
    status: "Active",
    type: "Packaging",
  },
  {
    id: "WI-009",
    title: "Surface Treatment Process",
    description: "Process instructions for applying various surface treatments including anodizing and powder coating",
    department: "Finishing",
    version: "2.0",
    lastUpdated: "2023-05-11",
    status: "Draft",
    type: "Process",
  },
]
