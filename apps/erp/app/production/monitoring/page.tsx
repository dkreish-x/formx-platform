import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, CheckCircle, Clock, Settings, Zap } from "lucide-react"

export default function ProductionMonitoringPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Machine Monitoring</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Last Updated: Just Now
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Configure Alerts
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Equipment Effectiveness</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.3%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                <Progress value={78.3} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Machine Utilization</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82.5%</div>
                <p className="text-xs text-muted-foreground">+3.2% from last week</p>
                <Progress value={82.5} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Machines</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12/15</div>
                <p className="text-xs text-muted-foreground">3 machines in maintenance</p>
                <Progress value={80} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 critical, 1 warning</p>
                <Progress value={30} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Machine Status Overview</CardTitle>
                <CardDescription>Real-time status of all production machines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">Laser Cutter #1</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Running - Job #4582</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        78% Complete
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">CNC Mill #2</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Running - Job #4587</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        92% Complete
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="font-medium">Press Brake #1</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Setup</span>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        In Progress
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="font-medium">Waterjet #1</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Maintenance</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Scheduled
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">3D Printer #3</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Running - Job #4590</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        45% Complete
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Critical Alerts</CardTitle>
                <CardDescription>Issues requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-600">CNC Router #2 - Spindle Overheating</span>
                    </div>
                    <p className="text-sm text-red-600 mt-1">Temperature exceeds threshold by 12°C</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="destructive">
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-600">Laser Cutter #3 - Air Pressure Low</span>
                    </div>
                    <p className="text-sm text-red-600 mt-1">Pressure at 72 PSI, minimum required is 80 PSI</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="destructive">
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-600">Press Brake #1 - Maintenance Due</span>
                    </div>
                    <p className="text-sm text-yellow-600 mt-1">Scheduled maintenance overdue by 2 days</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="machines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Machine Details</CardTitle>
              <CardDescription>Detailed information for each machine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Select a machine to view detailed information</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Historical performance data and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Performance analytics visualization</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Record of all alerts and resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Alert history will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
