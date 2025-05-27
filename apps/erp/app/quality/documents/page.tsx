import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Filter,
  History,
  Plus,
  Search,
  Settings,
  Upload,
} from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Document Control</h1>
          <p className="text-muted-foreground">Manage quality system documentation</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/quality/documents/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button asChild>
            <Link href="/quality/documents/new">
              <Plus className="mr-2 h-4 w-4" />
              New Document
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Document Types</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/quality/documents?type=all"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground"
                >
                  <span>All Documents</span>
                  <Badge>245</Badge>
                </Link>
                <Link
                  href="/quality/documents?type=procedures"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Procedures</span>
                  <Badge variant="outline">24</Badge>
                </Link>
                <Link
                  href="/quality/documents?type=work-instructions"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Work Instructions</span>
                  <Badge variant="outline">56</Badge>
                </Link>
                <Link
                  href="/quality/documents?type=forms"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Forms</span>
                  <Badge variant="outline">38</Badge>
                </Link>
                <Link
                  href="/quality/documents?type=manuals"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Manuals</span>
                  <Badge variant="outline">5</Badge>
                </Link>
                <Link
                  href="/quality/documents?type=records"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Records</span>
                  <Badge variant="outline">122</Badge>
                </Link>
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/quality/documents?status=released"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Released</span>
                  <Badge variant="outline">198</Badge>
                </Link>
                <Link
                  href="/quality/documents?status=in-review"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>In Review</span>
                  <Badge variant="outline">12</Badge>
                </Link>
                <Link
                  href="/quality/documents?status=draft"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Draft</span>
                  <Badge variant="outline">28</Badge>
                </Link>
                <Link
                  href="/quality/documents?status=obsolete"
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <span>Obsolete</span>
                  <Badge variant="outline">7</Badge>
                </Link>
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/quality/documents/pending-review"
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Pending Review</span>
                </Link>
                <Link
                  href="/quality/documents/pending-approval"
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  <span>Pending Approval</span>
                </Link>
                <Link
                  href="/quality/documents/recent"
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <History className="mr-2 h-4 w-4" />
                  <span>Recently Modified</span>
                </Link>
                <Link
                  href="/quality/documents/import"
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Import Documents</span>
                </Link>
                <Link
                  href="/quality/documents/export"
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Export Documents</span>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Documents</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search documents..." className="pl-8 w-full md:w-[300px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="mine">My Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground border-b">
                        <th className="pb-3 font-medium">Document ID</th>
                        <th className="pb-3 font-medium">Title</th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Revision</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Last Modified</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">QM-001</td>
                        <td className="py-3">Quality Manual</td>
                        <td className="py-3">Manual</td>
                        <td className="py-3">Rev. 12</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Released</Badge>
                        </td>
                        <td className="py-3">May 1, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">QP-7.5.1</td>
                        <td className="py-3">Production Control Procedure</td>
                        <td className="py-3">Procedure</td>
                        <td className="py-3">Rev. 8</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Released</Badge>
                        </td>
                        <td className="py-3">May 7, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">WI-8.2.4</td>
                        <td className="py-3">Final Inspection Work Instruction</td>
                        <td className="py-3">Work Instruction</td>
                        <td className="py-3">Rev. 5</td>
                        <td className="py-3">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Review</Badge>
                        </td>
                        <td className="py-3">May 6, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">QF-8.3.1</td>
                        <td className="py-3">Non-Conformance Report Form</td>
                        <td className="py-3">Form</td>
                        <td className="py-3">Rev. 3</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Released</Badge>
                        </td>
                        <td className="py-3">May 5, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">QP-8.5.2</td>
                        <td className="py-3">Corrective Action Procedure</td>
                        <td className="py-3">Procedure</td>
                        <td className="py-3">Rev. 6</td>
                        <td className="py-3">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Draft</Badge>
                        </td>
                        <td className="py-3">May 4, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">WI-7.5.3</td>
                        <td className="py-3">Material Handling Work Instruction</td>
                        <td className="py-3">Work Instruction</td>
                        <td className="py-3">Rev. 4</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Released</Badge>
                        </td>
                        <td className="py-3">May 3, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">QP-4.2.3</td>
                        <td className="py-3">Document Control Procedure</td>
                        <td className="py-3">Procedure</td>
                        <td className="py-3">Rev. 9</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Released</Badge>
                        </td>
                        <td className="py-3">May 2, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">QF-7.4.1</td>
                        <td className="py-3">Supplier Evaluation Form</td>
                        <td className="py-3">Form</td>
                        <td className="py-3">Rev. 5</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Released</Badge>
                        </td>
                        <td className="py-3">May 1, 2025</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-4 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="px-4">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="px-4">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="recent">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">Recent Documents</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Documents you've recently viewed or modified.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="favorites">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">Favorite Documents</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Documents you've marked as favorites.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mine">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">My Documents</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Documents you've created or are responsible for.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
