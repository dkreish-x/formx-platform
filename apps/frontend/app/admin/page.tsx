import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "lucide-react"
import AdminOrdersTable from "@/components/admin/admin-orders-table"
import AdminAnalytics from "@/components/admin/admin-analytics"
import AdminCapacity from "@/components/admin/admin-capacity"

export default function AdminDashboardPage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders, capacity, and system settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Add New Material</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (MTD)</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,685.00</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">12 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Machine Utilization</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="capacity">Capacity</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage all customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminOrdersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>Track performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Capacity</CardTitle>
              <CardDescription>Monitor and manage machine capacity and scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCapacity />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
