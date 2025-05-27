import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentOrders } from "@/components/recent-orders"
import { QualityAlerts } from "@/components/quality-alerts"
import { SafetyInspections } from "@/components/safety-inspections"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Box,
  CheckCircle,
  Clock,
  DollarSign,
  Factory,
  FileText,
  LineChart,
  Package,
  ShieldCheck,
  Truck,
  Users,
  Zap,
  Layers,
  Percent,
  Calendar,
  Clipboard,
  Cpu,
  Database,
  Server,
  HardDrive,
  Bell,
  type LucideIcon,
} from "lucide-react"

interface DashboardStatsProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
}

function DashboardStats({ title, value, description, icon: Icon }: DashboardStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Form(X) Manufacturing System</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            <span>Last Updated: Just Now</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Performance Indicators */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="flex-1 p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">Revenue MTD</span>
                      <span className="text-2xl font-bold">$342,568</span>
                      <span className="text-xs text-success">+12.3% from last month</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-primary/10 p-4">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="flex-1 p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">Production Efficiency</span>
                      <span className="text-2xl font-bold">88.2%</span>
                      <span className="text-xs text-success">+5.4% from last week</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-primary/10 p-4">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="flex-1 p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">Material Utilization</span>
                      <span className="text-2xl font-bold">92.7%</span>
                      <span className="text-xs text-success">+1.8% from last month</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-primary/10 p-4">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="flex-1 p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">On-Time Delivery</span>
                      <span className="text-2xl font-bold">94.5%</span>
                      <span className="text-xs text-destructive">-2.3% from last month</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-primary/10 p-4">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status and Business Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* System Integration Status */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>System Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Factory className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">MES Integration</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-blue-100" />
                    <div className="text-xs text-muted-foreground">
                      12 machines connected, 4,328 data points collected today
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium">ERP Integration</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-indigo-100" />
                    <div className="text-xs text-muted-foreground">
                      Financial, inventory, and purchasing modules synchronized
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-violet-500" />
                        <span className="text-sm font-medium">CRM Integration</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-violet-100" />
                    <div className="text-xs text-muted-foreground">
                      24 active customer accounts, 8 new leads this week
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium">QMS Integration</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-emerald-100" />
                    <div className="text-xs text-muted-foreground">
                      7 open quality issues, 3 audits scheduled this month
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">All Systems Operational</p>
                      <p className="text-xs text-muted-foreground">Last incident: 15 days ago</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground">Database</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm font-medium">98.7% Uptime</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground">API Services</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm font-medium">99.9% Uptime</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground">Machine Connectivity</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="text-sm font-medium">95.2% Uptime</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground">File Storage</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm font-medium">99.5% Uptime</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Business Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Production Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Active Jobs</span>
                    </div>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Scheduled Jobs</span>
                    </div>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Completed Today</span>
                    </div>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Delayed Jobs</span>
                    </div>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/production">View Production</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Raw Materials</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">$342,500</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Healthy
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Work In Progress</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">$187,320</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Healthy
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Finished Goods</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">$278,450</span>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        High
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Low Stock Items</span>
                    </div>
                    <span className="font-medium">12 items</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/inventory">View Inventory</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quality Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Open NCRs</span>
                    </div>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clipboard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Pending Inspections</span>
                    </div>
                    <span className="font-medium">14</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">First Pass Yield</span>
                    </div>
                    <span className="font-medium">96.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Next Audit</span>
                    </div>
                    <span className="font-medium">May 15</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/quality">View Quality</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Activity and Alerts */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/orders">View All Orders</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quality Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <QualityAlerts />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/quality/non-conformance">View All Alerts</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Notifications</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Database className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Database Backup Completed</p>
                      <p className="text-xs text-muted-foreground">Today, 4:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Server className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">System Updates Installed</p>
                      <p className="text-xs text-muted-foreground">Yesterday, 11:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <HardDrive className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Storage Space Warning</p>
                      <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Cpu className="h-4 w-4 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">API Performance Optimized</p>
                      <p className="text-xs text-muted-foreground">May 8, 9:30 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/system/notifications">View All Notifications</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardStats title="Active Work Orders" value="24" description="+2 from yesterday" icon={FileText} />
            <DashboardStats
              title="Machine Utilization"
              value="78.3%"
              description="+3.2% from last week"
              icon={Activity}
            />
            <DashboardStats title="On-Time Production" value="92.7%" description="+1.1% from last month" icon={Clock} />
            <DashboardStats
              title="Inventory Accuracy"
              value="99.2%"
              description="+0.3% from last count"
              icon={Package}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Production Schedule</CardTitle>
                <CardDescription>Current and upcoming production jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Production schedule visualization</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/production/scheduling">View Full Schedule</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Machine Status</CardTitle>
                <CardDescription>Real-time machine monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">Laser Cutter #1</span>
                    </div>
                    <span className="text-sm">Running - 78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">CNC Mill #2</span>
                    </div>
                    <span className="text-sm">Running - 92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="font-medium">Press Brake #1</span>
                    </div>
                    <span className="text-sm">Setup - 0%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="font-medium">Waterjet #1</span>
                    </div>
                    <span className="text-sm">Maintenance - 0%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">3D Printer #3</span>
                    </div>
                    <span className="text-sm">Running - 45%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/production/monitoring">View All Machines</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardStats title="Open NCRs" value="7" description="-2 from last week" icon={AlertTriangle} />
            <DashboardStats
              title="First Pass Yield"
              value="96.8%"
              description="+0.5% from last month"
              icon={CheckCircle}
            />
            <DashboardStats title="Pending Audits" value="3" description="Next due in 5 days" icon={FileText} />
            <DashboardStats title="Document Reviews" value="12" description="4 overdue" icon={FileText} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Quality Metrics Trend</CardTitle>
                <CardDescription>6-month quality performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Quality metrics chart</p>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>CAPA Status</CardTitle>
                <CardDescription>Corrective and Preventive Actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Open</span>
                    <span className="font-medium">5</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">In Progress</span>
                    <span className="font-medium">8</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Pending Verification</span>
                    <span className="font-medium">3</span>
                  </div>
                  <Progress value={15} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Closed</span>
                    <span className="font-medium">4</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/quality/capa">View All CAPAs</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Quality Inspections</CardTitle>
              </CardHeader>
              <CardContent>
                <SafetyInspections />
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/quality/inspections">View All Inspections</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Quality Manual</span>
                    </div>
                    <Badge>Rev. 12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Inspection Procedure</span>
                    </div>
                    <Badge>Rev. 8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Calibration Procedure</span>
                    </div>
                    <Badge>Rev. 5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">CAPA Procedure</span>
                    </div>
                    <Badge>Rev. 7</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/quality/documents">View All Documents</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardStats
              title="Revenue MTD"
              value="$342,568"
              description="+12.3% from last month"
              icon={DollarSign}
            />
            <DashboardStats title="Open Opportunities" value="$1.2M" description="24 active deals" icon={LineChart} />
            <DashboardStats title="Inventory Value" value="$876,432" description="-5.2% from last month" icon={Box} />
            <DashboardStats title="Upcoming Shipments" value="18" description="Next 7 days" icon={Truck} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>Next 12 months projection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Revenue forecast chart</p>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sales Pipeline</CardTitle>
                <CardDescription>Current opportunities by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Qualification</span>
                    <span className="font-medium">$320,000</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Proposal</span>
                    <span className="font-medium">$480,000</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Negotiation</span>
                    <span className="font-medium">$280,000</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Closing</span>
                    <span className="font-medium">$120,000</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/opportunities">View All Opportunities</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>By revenue, last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-8 bg-blue-500 rounded"></div>
                      <span className="font-medium">Acme Corporation</span>
                    </div>
                    <span className="font-medium">$245,890</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-8 bg-indigo-500 rounded"></div>
                      <span className="font-medium">Globex Industries</span>
                    </div>
                    <span className="font-medium">$187,650</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-8 bg-violet-500 rounded"></div>
                      <span className="font-medium">Stark Enterprises</span>
                    </div>
                    <span className="font-medium">$142,380</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-8 bg-emerald-500 rounded"></div>
                      <span className="font-medium">Wayne Industries</span>
                    </div>
                    <span className="font-medium">$98,540</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/customers">View All Customers</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Activities</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 text-center">
                      <div className="font-bold">12</div>
                      <div className="text-xs text-muted-foreground">MAY</div>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <div className="font-medium">Customer Meeting</div>
                      <div className="text-sm text-muted-foreground">Acme Corporation - 10:00 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 text-center">
                      <div className="font-bold">13</div>
                      <div className="text-xs text-muted-foreground">MAY</div>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <div className="font-medium">Quality Audit</div>
                      <div className="text-sm text-muted-foreground">Internal - 9:00 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 text-center">
                      <div className="font-bold">14</div>
                      <div className="text-xs text-muted-foreground">MAY</div>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <div className="font-medium">Supplier Review</div>
                      <div className="text-sm text-muted-foreground">MetalSupply Inc. - 2:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 text-center">
                      <div className="font-bold">15</div>
                      <div className="text-xs text-muted-foreground">MAY</div>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <div className="font-medium">Production Planning</div>
                      <div className="text-sm text-muted-foreground">Weekly Meeting - 11:00 AM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/calendar">View Calendar</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
