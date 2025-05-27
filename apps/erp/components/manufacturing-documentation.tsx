"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Download,
  FileText,
  History,
  CheckCircle,
  ChevronRight,
  UploadCloud,
  Calendar,
  Edit,
  Eye,
  Lock,
  Copy,
  Plus,
  Clock,
  ArrowUpDown,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for manufacturing documentation
const documentData = [
  {
    id: "DOC-1042",
    name: "Bracket Assembly Work Instructions",
    type: "Work Instructions",
    partNumber: "PA-1042",
    revision: "C",
    status: "Released",
    author: "John Smith",
    approvedBy: "Robert Johnson",
    lastUpdated: "2025-04-15",
    effectiveDate: "2025-04-20",
    expirationDate: "2026-04-20",
    department: "Production",
    viewCount: 45,
    hasAttachments: true,
    revisionHistory: [
      {
        revision: "C",
        date: "2025-04-15",
        author: "John Smith",
        notes: "Updated tooling requirements and added step 7",
      },
      {
        revision: "B",
        date: "2024-11-10",
        author: "John Smith",
        notes: "Updated inspection criteria and quality checkpoints",
      },
      { revision: "A", date: "2024-05-22", author: "Sarah Johnson", notes: "Initial release" },
    ],
  },
  {
    id: "DOC-2310",
    name: "CNC Setup Sheet - Mounting Plate",
    type: "Setup Sheet",
    partNumber: "PA-2310",
    revision: "B",
    status: "Released",
    author: "Michael Chen",
    approvedBy: "Robert Johnson",
    lastUpdated: "2025-03-28",
    effectiveDate: "2025-04-01",
    expirationDate: "2026-04-01",
    department: "CNC",
    viewCount: 32,
    hasAttachments: true,
    revisionHistory: [
      { revision: "B", date: "2025-03-28", author: "Michael Chen", notes: "Updated tool list and fixture details" },
      { revision: "A", date: "2024-08-15", author: "Michael Chen", notes: "Initial release" },
    ],
  },
  {
    id: "DOC-4502",
    name: "Quality Inspection Procedure - Housing",
    type: "Quality Procedure",
    partNumber: "PA-4502",
    revision: "A",
    status: "Released",
    author: "Lisa Brown",
    approvedBy: "Jennifer Williams",
    lastUpdated: "2025-02-10",
    effectiveDate: "2025-02-15",
    expirationDate: "2026-02-15",
    department: "Quality",
    viewCount: 28,
    hasAttachments: true,
    revisionHistory: [{ revision: "A", date: "2025-02-10", author: "Lisa Brown", notes: "Initial release" }],
  },
  {
    id: "DOC-1205",
    name: "Assembly Process - Shaft Coupling",
    type: "Assembly Procedure",
    partNumber: "PA-1205",
    revision: "D",
    status: "Released",
    author: "David Wilson",
    approvedBy: "Robert Johnson",
    lastUpdated: "2025-04-22",
    effectiveDate: "2025-04-25",
    expirationDate: "2026-04-25",
    department: "Assembly",
    viewCount: 56,
    hasAttachments: true,
    revisionHistory: [
      {
        revision: "D",
        date: "2025-04-22",
        author: "David Wilson",
        notes: "Updated torque specifications and assembly sequence",
      },
      {
        revision: "C",
        date: "2024-12-05",
        author: "David Wilson",
        notes: "Added quality checkpoints and updated images",
      },
      { revision: "B", date: "2024-08-20", author: "Sarah Johnson", notes: "Updated tooling requirements" },
      { revision: "A", date: "2024-05-10", author: "Sarah Johnson", notes: "Initial release" },
    ],
  },
  {
    id: "DOC-3301",
    name: "Finishing Process - Anodizing",
    type: "Process Specification",
    partNumber: "Multiple",
    revision: "B",
    status: "In Review",
    author: "Michael Chen",
    approvedBy: "Pending",
    lastUpdated: "2025-05-05",
    effectiveDate: "Pending",
    expirationDate: "Pending",
    department: "Finishing",
    viewCount: 12,
    hasAttachments: true,
    revisionHistory: [
      {
        revision: "B",
        date: "2025-05-05",
        author: "Michael Chen",
        notes: "Updated process parameters and quality requirements",
      },
      { revision: "A", date: "2024-09-15", author: "Michael Chen", notes: "Initial release" },
    ],
  },
]

export function ManufacturingDocumentation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  const filteredDocuments = documentData.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedDocumentData = documentData.find((doc) => doc.id === selectedDocument)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manufacturing Documentation</h2>
          <p className="text-muted-foreground">Manage work instructions, processes, and manufacturing documentation</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <UploadCloud className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <div className="flex items-center">
                      ID
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Document
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Revision
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Last Updated
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className={`cursor-pointer hover:bg-muted/50 ${selectedDocument === doc.id ? "bg-muted/50" : ""}`}
                    onClick={() => setSelectedDocument(doc.id === selectedDocument ? null : doc.id)}
                  >
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.partNumber}</TableCell>
                    <TableCell>Rev {doc.revision}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{doc.lastUpdated}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.status === "Released" ? "default" : doc.status === "In Review" ? "warning" : "outline"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" /> Create New Revision
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="mr-2 h-4 w-4" /> View History
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedDocumentData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedDocumentData.name}</CardTitle>
                    <CardDescription>
                      {selectedDocumentData.id} | Part: {selectedDocumentData.partNumber} | Type:{" "}
                      {selectedDocumentData.type}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      selectedDocumentData.status === "Released"
                        ? "default"
                        : selectedDocumentData.status === "In Review"
                          ? "warning"
                          : "outline"
                    }
                  >
                    {selectedDocumentData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Document Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Revision:</span>
                          <span className="text-sm font-medium">Rev {selectedDocumentData.revision}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Department:</span>
                          <span className="text-sm font-medium">{selectedDocumentData.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Views:</span>
                          <span className="text-sm font-medium">{selectedDocumentData.viewCount}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Dates</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Updated:</span>
                          <span className="text-sm font-medium">{selectedDocumentData.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Effective Date:</span>
                          <span className="text-sm font-medium">{selectedDocumentData.effectiveDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Expiration:</span>
                          <span className="text-sm font-medium">{selectedDocumentData.expirationDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Approvals</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-primary">
                              {selectedDocumentData.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{selectedDocumentData.author}</p>
                            <p className="text-xs text-muted-foreground">Author</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Signed
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-primary">
                              {selectedDocumentData.approvedBy === "Pending"
                                ? "P"
                                : selectedDocumentData.approvedBy
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{selectedDocumentData.approvedBy}</p>
                            <p className="text-xs text-muted-foreground">Approver</p>
                          </div>
                        </div>
                        {selectedDocumentData.approvedBy !== "Pending" ? (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Signed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Revision History</h4>
                    <div className="space-y-3">
                      {selectedDocumentData.revisionHistory.map((revision, index) => (
                        <div key={revision.revision} className="flex items-start gap-3">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <History className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">Revision {revision.revision}</h3>
                              <span className="text-sm text-muted-foreground">{revision.date}</span>
                            </div>
                            <p className="text-sm mt-1">{revision.notes}</p>
                            <div className="text-xs text-muted-foreground mt-1">By: {revision.author}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Document Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-2 aspect-[3/4] bg-gray-50 flex flex-col items-center justify-center text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium">{selectedDocumentData.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rev {selectedDocumentData.revision} | {selectedDocumentData.type}
                  </p>
                  <div className="mt-6">
                    <Button>
                      <Eye className="mr-2 h-4 w-4" />
                      View Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Document Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full flex justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download Document
                  </Button>

                  <Button variant="outline" className="w-full flex justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Document
                  </Button>

                  <Button variant="outline" className="w-full flex justify-start">
                    <Copy className="mr-2 h-4 w-4" />
                    Create New Revision
                  </Button>

                  {selectedDocumentData.status === "In Review" ? (
                    <Button variant="outline" className="w-full flex justify-start">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Document
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full flex justify-start">
                      <Lock className="mr-2 h-4 w-4" />
                      Lock Document
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Related Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Quality Requirements</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Engineering Drawing</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Bill of Materials</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
