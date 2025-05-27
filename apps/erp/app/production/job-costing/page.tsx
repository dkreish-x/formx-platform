import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ManufacturingJobCosting } from "@/components/manufacturing-job-costing"
import { Button } from "@/components/ui/button"
import { FileText, BarChart, Download, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Manufacturing Job Costing",
  description: "Track and analyze costs for manufacturing jobs",
}

export default function JobCostingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturing Job Costing</h1>
          <p className="text-muted-foreground">
            Track and analyze costs for laser cutting, CNC machining, and sheet metal fabrication jobs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button variant="outline" size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Cost Overview</TabsTrigger>
          <TabsTrigger value="jobs">Job Analysis</TabsTrigger>
          <TabsTrigger value="materials">Material Costs</TabsTrigger>
          <TabsTrigger value="labor">Labor Costs</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manufacturing Cost Overview</CardTitle>
              <CardDescription>Analyze costs across different manufacturing processes</CardDescription>
            </CardHeader>
            <CardContent>
              <ManufacturingJobCosting />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Cost Analysis</CardTitle>
              <CardDescription>Detailed cost breakdown for individual jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Job cost analysis module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Material Cost Analysis</CardTitle>
              <CardDescription>Track and analyze material costs across jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Material cost analysis module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="labor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Labor Cost Analysis</CardTitle>
              <CardDescription>Track and analyze labor costs across jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Labor cost analysis module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
