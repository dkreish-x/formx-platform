import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Settings, FileUp, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Laser Cutting Operations",
  description: "Manage and monitor laser cutting operations",
}

export default function LaserCuttingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laser Cutting Operations</h1>
          <p className="text-muted-foreground">Monitor and manage laser cutting machines and operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileUp className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="machines" className="w-full">
        <TabsList>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="jobs">Job Queue</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="machines" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Laser Cutter #1</CardTitle>
                  <Badge className="bg-green-500">Running</Badge>
                </div>
                <CardDescription>4kW Fiber Laser - Bay A</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Job: #LC-2023-0458</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Material</p>
                      <p className="font-medium">304 SS - 3mm</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Completion</p>
                      <p className="font-medium">14:35 (23 min)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Parts</p>
                      <p className="font-medium">42 / 63 Complete</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Operator</p>
                      <p className="font-medium">M. Johnson</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Laser Cutter #2</CardTitle>
                  <Badge className="bg-yellow-500">Setup</Badge>
                </div>
                <CardDescription>6kW Fiber Laser - Bay B</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Setup Progress</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Next Job</p>
                      <p className="font-medium">#LC-2023-0461</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Material</p>
                      <p className="font-medium">Al 6061 - 6mm</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Start</p>
                      <p className="font-medium">14:15 (3 min)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Operator</p>
                      <p className="font-medium">R. Smith</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Start Job
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Laser Cutter #3</CardTitle>
                  <Badge variant="outline">Idle</Badge>
                </div>
                <CardDescription>2kW CO2 Laser - Bay C</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">Available</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Job</p>
                      <p className="font-medium">#LC-2023-0452</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Maintenance</p>
                      <p className="font-medium">48 hours</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assigned To</p>
                      <p className="font-medium">Unassigned</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Clock className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      Maintenance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laser Cutting Job Queue</CardTitle>
              <CardDescription>Manage and prioritize laser cutting jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Job queue module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Material Management</CardTitle>
              <CardDescription>Track and manage materials for laser cutting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Material management module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laser Cutter Maintenance</CardTitle>
              <CardDescription>Schedule and track maintenance for laser cutting machines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Maintenance module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
