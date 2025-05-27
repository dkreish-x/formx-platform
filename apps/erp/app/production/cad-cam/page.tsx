import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CADFileManagement } from "@/components/cad-file-management"
import { Button } from "@/components/ui/button"
import { Upload, FolderPlus, RefreshCw, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "CAD/CAM File Management",
  description: "Manage CAD and CAM files for manufacturing processes",
}

export default function CadCamPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CAD/CAM File Management</h1>
          <p className="text-muted-foreground">Manage, version, and prepare CAD/CAM files for manufacturing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button variant="outline" size="sm">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="versions">Version History</TabsTrigger>
          <TabsTrigger value="processing">CAM Processing</TabsTrigger>
          <TabsTrigger value="shared">Shared Files</TabsTrigger>
        </TabsList>
        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CAD/CAM Files</CardTitle>
              <CardDescription>Manage design and manufacturing files</CardDescription>
            </CardHeader>
            <CardContent>
              <CADFileManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Track file revisions and changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Version history module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CAM Processing</CardTitle>
              <CardDescription>Process CAD files for manufacturing operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                CAM processing module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared Files</CardTitle>
              <CardDescription>Files shared with customers and vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Shared files module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
