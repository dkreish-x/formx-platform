import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThreeDPrintingManagement } from "@/components/3d-printing-management"
import { Button } from "@/components/ui/button"
import { Upload, Printer, BarChart, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "3D Printing Management",
  description: "Manage 3D printing operations and materials",
}

export default function ThreeDPrintingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">3D Printing Management</h1>
          <p className="text-muted-foreground">Schedule, monitor, and manage 3D printing operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload STL
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Printer Status
          </Button>
          <Button variant="outline" size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            Material Usage
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="queue" className="w-full">
        <TabsList>
          <TabsTrigger value="queue">Print Queue</TabsTrigger>
          <TabsTrigger value="printers">Printers</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="history">Print History</TabsTrigger>
        </TabsList>
        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Print Queue</CardTitle>
              <CardDescription>Manage and prioritize 3D printing jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreeDPrintingManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="printers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Printer Management</CardTitle>
              <CardDescription>Monitor and manage 3D printer status and maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Printer management module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Material Management</CardTitle>
              <CardDescription>Track filament and resin inventory and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Material management module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Print History</CardTitle>
              <CardDescription>View past print jobs and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Print history module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
