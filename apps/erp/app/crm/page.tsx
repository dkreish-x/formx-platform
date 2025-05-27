import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Users,
  UserPlus,
  BarChart3,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  PieChart,
  ListChecks,
  Activity,
} from "lucide-react"
import { StatusBadge } from "@/components/ui/status-badge"
import { SalesPipeline } from "@/components/crm/sales-pipeline"
import { RecentActivities } from "@/components/crm/recent-activities"

export default function CRMPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage customer relationships and sales pipeline.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" asChild>
            <Link href="/customers/new">
              <Users className="mr-2 h-4 w-4" />
              New Customer
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/leads/new">
              <UserPlus className="mr-2 h-4 w-4" />
              New Lead
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/opportunities/new">
              <Briefcase className="mr-2 h-4 w-4" />
              New Opportunity
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/crm/tasks">
              <ListChecks className="mr-2 h-4 w-4" />
              Tasks
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Active customers</p>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link href="/customers">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-green-600">
              <span className="font-medium">+12%</span>
              <span className="ml-1">from last month</span>
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link href="/leads">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Opportunities</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-muted-foreground">
              Valued at <span className="font-semibold">$343,500</span>
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link href="/opportunities">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,350</div>
            <div className="flex items-center text-xs text-green-600">
              <span className="font-medium">+8%</span>
              <span className="ml-1">from last month</span>
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link href="/crm/reports">View Reports</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesPipeline />
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Meeting with TechPro</div>
                  <div className="text-sm text-muted-foreground">Today, 10:30 AM</div>
                  <div className="text-sm">Discuss new project requirements</div>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Call with Acme Manufacturing</div>
                  <div className="text-sm text-muted-foreground">Today, 2:15 PM</div>
                  <div className="text-sm">Follow up on latest quote</div>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Send Proposal</div>
                  <div className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</div>
                  <div className="text-sm">Custom machining project for Precision Engineering</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Site Visit</div>
                  <div className="text-sm text-muted-foreground">May 15, 10:00 AM</div>
                  <div className="text-sm">Visit Global Fabrication facility</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link href="/crm/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <Tabs defaultValue="leads">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Overview</CardTitle>
                <TabsList>
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                  <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="leads" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-semibold">Lead</span>
                    <span className="font-semibold">Status</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Tech Dynamics</div>
                      <div className="text-sm text-muted-foreground">Sarah Williams</div>
                    </div>
                    <StatusBadge status="info">New</StatusBadge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Innovative Solutions</div>
                      <div className="text-sm text-muted-foreground">Robert Johnson</div>
                    </div>
                    <StatusBadge status="warning">Contacted</StatusBadge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Precision Fabricators</div>
                      <div className="text-sm text-muted-foreground">Emily Chen</div>
                    </div>
                    <StatusBadge status="success">Qualified</StatusBadge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Advanced Engineering</div>
                      <div className="text-sm text-muted-foreground">Michael Brown</div>
                    </div>
                    <StatusBadge status="warning">Proposal</StatusBadge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href="/leads">View All Leads</Link>
                </Button>
              </TabsContent>
              <TabsContent value="opportunities" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-semibold">Opportunity</span>
                    <span className="font-semibold">Value</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Custom Machining Project</div>
                      <div className="text-sm text-muted-foreground">Acme Industries</div>
                    </div>
                    <div className="font-semibold">$45,000</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Production Line Automation</div>
                      <div className="text-sm text-muted-foreground">TechCorp</div>
                    </div>
                    <div className="font-semibold">$120,000</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Prototype Development</div>
                      <div className="text-sm text-muted-foreground">Innovative Solutions</div>
                    </div>
                    <div className="font-semibold">$28,500</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Equipment Upgrade</div>
                      <div className="text-sm text-muted-foreground">Precision Engineering</div>
                    </div>
                    <div className="font-semibold">$85,000</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href="/opportunities">View All Opportunities</Link>
                </Button>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead Sources</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">Lead source distribution chart</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Website (40%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Referral (25%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Trade Show (20%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">Other (15%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Performance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">Monthly sales trend chart</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <div className="text-xl font-bold">$245,890</div>
                <p className="text-xs text-muted-foreground">YTD Sales</p>
              </div>
              <div>
                <div className="text-xl font-bold">$42,350</div>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
              <div>
                <div className="text-xl font-bold">18%</div>
                <p className="text-xs text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Team Performance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">Sales by team member chart</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Jane Smith</span>
                <span className="text-sm font-medium">$89,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">John Davis</span>
                <span className="text-sm font-medium">$65,230</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Sarah Johnson</span>
                <span className="text-sm font-medium">$53,900</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Michael Brown</span>
                <span className="text-sm font-medium">$37,310</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <Button variant="outline" className="flex flex-col h-auto py-4 px-2 justify-center items-center" asChild>
                <Link href="/customers/new">
                  <Users className="mb-2 h-5 w-5" />
                  <span className="text-sm">Add Customer</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 px-2 justify-center items-center" asChild>
                <Link href="/leads/new">
                  <UserPlus className="mb-2 h-5 w-5" />
                  <span className="text-sm">Add Lead</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 px-2 justify-center items-center" asChild>
                <Link href="/opportunities/new">
                  <Briefcase className="mb-2 h-5 w-5" />
                  <span className="text-sm">Add Opportunity</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 px-2 justify-center items-center" asChild>
                <Link href="/crm/tasks/new">
                  <ListChecks className="mb-2 h-5 w-5" />
                  <span className="text-sm">Add Task</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 px-2 justify-center items-center" asChild>
                <Link href="/crm/email">
                  <Mail className="mb-2 h-5 w-5" />
                  <span className="text-sm">Send Email</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 px-2 justify-center items-center" asChild>
                <Link href="/crm/reports">
                  <BarChart3 className="mb-2 h-5 w-5" />
                  <span className="text-sm">Reports</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 px-2 justify-center items-center" asChild>
                <Link href="/crm/calendar-integration">
                  <Calendar className="mb-2 h-5 w-5" />
                  <span className="text-sm">Calendar Integration</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
