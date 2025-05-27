import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Settings, FileUp, Clock, PenToolIcon as Tool } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "CNC Machining Operations",
  description: "Manage and monitor CNC machining operations",
}

export default function CncMachiningPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CNC Machining Operations</h1>
          <p className="text-muted-foreground">Monitor and manage CNC machines and operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileUp className="mr-2 h-4 w-4" />
            Upload G-code
          </Button>
          <Button variant="outline" size="sm">
            <Tool className="mr-2 h-4 w-4" />
            Tool Library
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
          <TabsTrigger value="tooling">Tooling</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>
        <TabsContent value="machines" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>CNC Mill #1</CardTitle>
                  <Badge className="bg-green-500">Running</Badge>
                </div>
                <CardDescription>Haas VF-2 - Bay D</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Job: #CNC-2023-0124</span>
                      <span>43%</span>
                    </div>
                    <Progress value={43} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Material</p>
                      <p className="font-medium">Al 6061</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Completion</p>
                      <p className="font-medium">16:45 (2h 12m)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Parts</p>
                      <p className="font-medium">8 / 20 Complete</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Operator</p>
                      <p className="font-medium">T. Williams</p>
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
                  <CardTitle>CNC Lathe #1</CardTitle>
                  <Badge className="bg-yellow-500">Setup</Badge>
                </div>
                <CardDescription>Haas ST-20 - Bay E</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Setup Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Next Job</p>
                      <p className="font-medium">#CNC-2023-0126</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Material</p>
                      <p className="font-medium">Steel 1045</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Start</p>
                      <p className="font-medium">15:00 (18 min)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Operator</p>
                      <p className="font-medium">A. Garcia</p>
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
                  <CardTitle>CNC Mill #2</CardTitle>
                  <Badge variant="destructive">Maintenance</Badge>
                </div>
                <CardDescription>DMG Mori NMV 5000 - Bay F</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">Scheduled Maintenance</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Job</p>
                      <p className="font-medium">#CNC-2023-0119</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Completion</p>
                      <p className="font-medium">Tomorrow, 10:00</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Technician</p>
                      <p className="font-medium">J. Martinez</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Clock className="mr-2 h-4 w-4" />
                      View Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      Maintenance Log
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
              <CardTitle>CNC Job Queue</CardTitle>
              <CardDescription>Manage and prioritize CNC machining jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Job queue module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tooling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CNC Tooling Management</CardTitle>
              <CardDescription>Track and manage tooling for CNC operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Tooling management module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CNC Programs</CardTitle>
              <CardDescription>Manage and version control CNC programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                CNC programs module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
