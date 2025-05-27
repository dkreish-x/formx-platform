import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Calendar,
  LineChart,
  Users,
  Target,
  Briefcase,
  UserPlus,
  Share2,
  Filter,
  Clock,
  DollarSign,
} from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM Reports</h1>
          <p className="text-muted-foreground">Analyze your sales metrics and customer data</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="this_month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_quarter">This Quarter</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">
            <TrendingUp className="mr-2 h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="leads">
            <UserPlus className="mr-2 h-4 w-4" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="mr-2 h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="pipeline">
            <Target className="mr-2 h-4 w-4" />
            Pipeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42,350</div>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-green-600">+5% from last month</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28%</div>
                <p className="text-xs text-red-600">-3% from last month</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales Cycle</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 days</div>
                <p className="text-xs text-green-600">-5 days from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-muted-foreground" />
                  Monthly Sales Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <p className="ml-2 text-muted-foreground">Monthly sales trend chart</p>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-lg font-bold">Jan</div>
                    <p className="text-sm">$35,200</p>
                  </div>
                  <div>
                    <div className="text-lg font-bold">Feb</div>
                    <p className="text-sm">$28,500</p>
                  </div>
                  <div>
                    <div className="text-lg font-bold">Mar</div>
                    <p className="text-sm">$39,100</p>
                  </div>
                  <div>
                    <div className="text-lg font-bold">Apr</div>
                    <p className="text-sm">$42,350</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-muted-foreground" />
                  Sales by Product Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <p className="ml-2 text-muted-foreground">Sales distribution chart</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Machining (40%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Fabrication (25%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Assembly (20%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Other (15%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                Sales Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Team Member</th>
                      <th className="py-3 px-4 text-left font-medium">Sales ($)</th>
                      <th className="py-3 px-4 text-left font-medium">Deals Closed</th>
                      <th className="py-3 px-4 text-left font-medium">Win Rate</th>
                      <th className="py-3 px-4 text-left font-medium">Avg. Deal Size</th>
                      <th className="py-3 px-4 text-left font-medium">Quota Attainment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Jane Smith</td>
                      <td className="py-3 px-4 font-medium">$89,450</td>
                      <td className="py-3 px-4">12</td>
                      <td className="py-3 px-4">35%</td>
                      <td className="py-3 px-4">$7,454</td>
                      <td className="py-3 px-4">112%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">John Davis</td>
                      <td className="py-3 px-4 font-medium">$65,230</td>
                      <td className="py-3 px-4">9</td>
                      <td className="py-3 px-4">29%</td>
                      <td className="py-3 px-4">$7,248</td>
                      <td className="py-3 px-4">82%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Sarah Johnson</td>
                      <td className="py-3 px-4 font-medium">$53,900</td>
                      <td className="py-3 px-4">7</td>
                      <td className="py-3 px-4">25%</td>
                      <td className="py-3 px-4">$7,700</td>
                      <td className="py-3 px-4">67%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Michael Brown</td>
                      <td className="py-3 px-4 font-medium">$37,310</td>
                      <td className="py-3 px-4">5</td>
                      <td className="py-3 px-4">22%</td>
                      <td className="py-3 px-4">$7,462</td>
                      <td className="py-3 px-4">47%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18%</div>
                <p className="text-xs text-green-600">+2% from last month</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5 hrs</div>
                <p className="text-xs text-green-600">-30 min from last month</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Per Lead</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42</div>
                <p className="text-xs text-red-600">+$3 from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional lead reports would go here */}
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Customer reports would go here */}
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Pipeline reports would go here */}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share Report
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Report
        </Button>
      </div>
    </div>
  )
}
