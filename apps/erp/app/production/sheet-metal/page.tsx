import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Settings, FileUp, Clock, PenToolIcon as Tool } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Sheet Metal Fabrication",
  description: "Manage and monitor sheet metal fabrication operations",
}

export default function SheetMetalPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sheet Metal Fabrication</h1>
          <p className="text-muted-foreground">Monitor and manage sheet metal fabrication operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileUp className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button variant="outline" size="sm">
            <Tool className="mr-2 h-4 w-4" />
            Tool Setup
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="machines" className="w-full">
        <TabsList>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="jobs">Job Queue</TabsTrigger>
          <TabsTrigger value="bending">Bending</TabsTrigger>
          <TabsTrigger value="welding">Welding</TabsTrigger>
        </TabsList>
        <TabsContent value="machines" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Press Brake #1</CardTitle>
                  <Badge className="bg-green-500">Running</Badge>
                </div>
                <CardDescription>Amada HG 1303 - Bay G</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Job: #SM-2023-0087</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Material</p>
                      <p className="font-medium">Al 5052 - 2mm</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Completion</p>
                      <p className="font-medium">15:15 (32 min)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Parts</p>
                      <p className="font-medium">35 / 45 Complete</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Operator</p>
                      <p className="font-medium">L. Chen</p>
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
                  <CardTitle>Turret Punch #1</CardTitle>
                  <Badge variant="outline">Idle</Badge>
                </div>
                <CardDescription>Amada EM 2510 NT - Bay H</CardDescription>
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
                      <p className="font-medium">#SM-2023-0085</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Job</p>
                      <p className="font-medium">#SM-2023-0089</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Scheduled Start</p>
                      <p className="font-medium">16:00</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Start Job
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Tool className="mr-2 h-4 w-4" />
                      Tool Setup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Welding Station #2</CardTitle>
                  <Badge className="bg-green-500">Running</Badge>
                </div>
                <CardDescription>TIG Welding - Bay J</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Job: #SM-2023-0086</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Material</p>
                      <p className="font-medium">304 Stainless Steel</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Completion</p>
                      <p className="font-medium">16:30 (1h 47m)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assemblies</p>
                      <p className="font-medium">9 / 20 Complete</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Welder</p>
                      <p className="font-medium">K. Patel</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      Details
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
              <CardTitle>Sheet Metal Job Queue</CardTitle>
              <CardDescription>Manage and prioritize sheet metal fabrication jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Job queue module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bending Operations</CardTitle>
              <CardDescription>Manage press brake operations and bend sequences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Bending operations module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="welding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welding Operations</CardTitle>
              <CardDescription>Manage welding operations and quality control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Welding operations module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
