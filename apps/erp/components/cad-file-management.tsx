"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  File,
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Clock,
  Copy,
  CheckCircle,
  History,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  FileCode,
  FilePlus,
  FileCheck,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for CAD files
const cadFiles = [
  {
    id: "CAD-001",
    name: "Bracket Assembly.step",
    type: "STEP",
    size: "2.4 MB",
    customer: "Acme Manufacturing",
    project: "Control Panel Redesign",
    workOrder: "WO-2023-0542",
    lastModified: "2025-05-10",
    modifiedBy: "John Smith",
    version: "1.2",
    status: "Released",
    tags: ["Bracket", "Assembly", "Control Panel"],
  },
  {
    id: "CAD-002",
    name: "Enclosure Front Panel.dxf",
    type: "DXF",
    size: "1.8 MB",
    customer: "TechPro Industries",
    project: "Server Enclosure",
    workOrder: "WO-2023-0541",
    lastModified: "2025-05-09",
    modifiedBy: "Sarah Johnson",
    version: "2.1",
    status: "In Review",
    tags: ["Enclosure", "Panel", "Server"],
  },
  {
    id: "CAD-003",
    name: "Mounting Plate.dwg",
    type: "DWG",
    size: "3.2 MB",
    customer: "Global Dynamics",
    project: "Precision Gear Assembly",
    workOrder: "WO-2023-0540",
    lastModified: "2025-05-08",
    modifiedBy: "Mike Williams",
    version: "1.0",
    status: "Draft",
    tags: ["Mounting", "Plate", "Gear"],
  },
  {
    id: "CAD-004",
    name: "Heat Sink.stl",
    type: "STL",
    size: "5.6 MB",
    customer: "Precision Engineering",
    project: "Cooling System",
    workOrder: "WO-2023-0539",
    lastModified: "2025-05-07",
    modifiedBy: "Lisa Brown",
    version: "1.3",
    status: "Released",
    tags: ["Heat Sink", "Cooling", "3D Print"],
  },
  {
    id: "CAD-005",
    name: "Control Box.stp",
    type: "STEP",
    size: "4.1 MB",
    customer: "Innovative Metals",
    project: "Control Panel Housing",
    workOrder: "WO-2023-0538",
    lastModified: "2025-05-06",
    modifiedBy: "John Smith",
    version: "2.0",
    status: "Released",
    tags: ["Control", "Box", "Housing"],
  },
]

// Mock data for file versions
const fileVersions = [
  {
    version: "1.2",
    date: "2025-05-10",
    author: "John Smith",
    changes: "Updated mounting hole positions per customer feedback",
    status: "Released",
  },
  {
    version: "1.1",
    date: "2025-05-05",
    author: "Sarah Johnson",
    changes: "Modified overall dimensions to meet new specifications",
    status: "Superseded",
  },
  {
    version: "1.0",
    date: "2025-04-28",
    author: "John Smith",
    changes: "Initial design",
    status: "Superseded",
  },
]

export function CADFileManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFile, setSelectedFile] = useState<string | null>("CAD-001")

  const filteredFiles = cadFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "released" && file.status === "Released") ||
      (activeTab === "review" && file.status === "In Review") ||
      (activeTab === "draft" && file.status === "Draft")

    return matchesSearch && matchesTab
  })

  const selectedFileData = cadFiles.find((file) => file.id === selectedFile)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">CAD/CAM File Management</h2>
          <p className="text-muted-foreground">Manage design files for manufacturing processes</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Files
          </Button>
          <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            New File
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Files</p>
                <h3 className="text-2xl font-bold">{cadFiles.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <File className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Released</p>
                <h3 className="text-2xl font-bold">{cadFiles.filter((file) => file.status === "Released").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Review</p>
                <h3 className="text-2xl font-bold">{cadFiles.filter((file) => file.status === "In Review").length}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Draft</p>
                <h3 className="text-2xl font-bold">{cadFiles.filter((file) => file.status === "Draft").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Edit className="h-6 w-6 text-blue-600" />
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
            placeholder="Search files..."
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>File Directory</CardTitle>
              <CardDescription>Browse and manage CAD/CAM files</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="released">Released</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedFile === file.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedFile(file.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {file.type === "STEP" || file.type === "STP" ? (
                              <FileCode className="h-5 w-5 text-blue-500" />
                            ) : file.type === "DXF" ? (
                              <FileText className="h-5 w-5 text-amber-500" />
                            ) : file.type === "STL" ? (
                              <File className="h-5 w-5 text-green-500" />
                            ) : (
                              <File className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {file.customer} • {file.size}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            file.status === "Released"
                              ? "default"
                              : file.status === "In Review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {file.status}
                        </Badge>
                      </div>

                      <div className="mt-3 flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          Modified {file.lastModified} • v{file.version}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {file.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {file.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{file.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="released" className="space-y-4 mt-4">
                  {filteredFiles
                    .filter((file) => file.status === "Released")
                    .map((file) => (
                      <div
                        key={file.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedFile === file.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedFile(file.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {file.type === "STEP" || file.type === "STP" ? (
                                <FileCode className="h-5 w-5 text-blue-500" />
                              ) : file.type === "DXF" ? (
                                <FileText className="h-5 w-5 text-amber-500" />
                              ) : file.type === "STL" ? (
                                <File className="h-5 w-5 text-green-500" />
                              ) : (
                                <File className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{file.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {file.customer} • {file.size}
                              </p>
                            </div>
                          </div>
                          <Badge variant="default">Released</Badge>
                        </div>

                        <div className="mt-3 flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            Modified {file.lastModified} • v{file.version}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {file.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {file.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{file.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="review" className="space-y-4 mt-4">
                  {filteredFiles
                    .filter((file) => file.status === "In Review")
                    .map((file) => (
                      <div
                        key={file.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedFile === file.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedFile(file.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {file.type === "STEP" || file.type === "STP" ? (
                                <FileCode className="h-5 w-5 text-blue-500" />
                              ) : file.type === "DXF" ? (
                                <FileText className="h-5 w-5 text-amber-500" />
                              ) : file.type === "STL" ? (
                                <File className="h-5 w-5 text-green-500" />
                              ) : (
                                <File className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{file.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {file.customer} • {file.size}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">In Review</Badge>
                        </div>

                        <div className="mt-3 flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            Modified {file.lastModified} • v{file.version}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {file.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {file.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{file.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="draft" className="space-y-4 mt-4">
                  {filteredFiles
                    .filter((file) => file.status === "Draft")
                    .map((file) => (
                      <div
                        key={file.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedFile === file.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedFile(file.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {file.type === "STEP" || file.type === "STP" ? (
                                <FileCode className="h-5 w-5 text-blue-500" />
                              ) : file.type === "DXF" ? (
                                <FileText className="h-5 w-5 text-amber-500" />
                              ) : file.type === "STL" ? (
                                <File className="h-5 w-5 text-green-500" />
                              ) : (
                                <File className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{file.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {file.customer} • {file.size}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">Draft</Badge>
                        </div>

                        <div className="mt-3 flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            Modified {file.lastModified} • v{file.version}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {file.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {file.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{file.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>File Details</CardTitle>
                  <CardDescription>
                    {selectedFileData ? selectedFileData.name : "Select a file to view details"}
                  </CardDescription>
                </div>
                {selectedFileData && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
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
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileCheck className="h-4 w-4 mr-2" />
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedFileData ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">File Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">File Name</span>
                          <span className="font-medium">{selectedFileData.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">File Type</span>
                          <span className="font-medium">{selectedFileData.type}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">File Size</span>
                          <span className="font-medium">{selectedFileData.size}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Version</span>
                          <span className="font-medium">{selectedFileData.version}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Status</span>
                          <Badge
                            variant={
                              selectedFileData.status === "Released"
                                ? "default"
                                : selectedFileData.status === "In Review"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {selectedFileData.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Last Modified</span>
                          <span className="font-medium">{selectedFileData.lastModified}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Project Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Customer</span>
                          <span className="font-medium">{selectedFileData.customer}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Project</span>
                          <span className="font-medium">{selectedFileData.project}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Work Order</span>
                          <span className="font-medium">{selectedFileData.workOrder}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Modified By</span>
                          <span className="font-medium">{selectedFileData.modifiedBy}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Tags</span>
                          <div className="flex flex-wrap gap-1 justify-end">
                            {selectedFileData.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium">File Preview</h3>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Open in Viewer
                      </Button>
                    </div>
                    <div className="border rounded-md bg-muted/20 aspect-video flex items-center justify-center">
                      <div className="text-center p-6">
                        <FileCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Preview not available</p>
                        <Button variant="link" size="sm" className="mt-2">
                          Generate Preview
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Version History</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left font-medium p-3">Version</th>
                            <th className="text-left font-medium p-3">Date</th>
                            <th className="text-left font-medium p-3">Author</th>
                            <th className="text-left font-medium p-3">Changes</th>
                            <th className="text-left font-medium p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fileVersions.map((version, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3 font-medium">{version.version}</td>
                              <td className="p-3">{version.date}</td>
                              <td className="p-3">{version.author}</td>
                              <td className="p-3">{version.changes}</td>
                              <td className="p-3">
                                <Badge
                                  variant={version.status === "Released" ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {version.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
                    <Button variant="outline">
                      <History className="h-4 w-4 mr-2" />
                      Revert to Previous
                    </Button>
                    <Button variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Create New Version
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Release for Production
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No File Selected</h3>
                    <p className="text-muted-foreground">Select a file to view details</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
