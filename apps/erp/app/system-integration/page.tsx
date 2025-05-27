import type { Metadata } from "next"
import {
  ArrowDownUp,
  CheckCircle2,
  Clock,
  Database,
  GitMerge,
  Globe,
  LayoutDashboard,
  RefreshCw,
  Server,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "System Integration",
  description: "Manage and monitor all system integrations",
}

export default function SystemIntegrationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Integration</h1>
          <p className="text-muted-foreground">
            Manage and monitor all system integrations across MES, ERP, CRM, and QMS
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Status
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data-flows">Data Flows</TabsTrigger>
          <TabsTrigger value="api-endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">98.7%</div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                  Last checked 2 minutes ago
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Data Sync Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">All data synchronized</p>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  Last sync 5 minutes ago
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">API Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <Zap className="mr-1 h-4 w-4" />
                  Avg response: 124ms
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Integration Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Across all systems</p>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <GitMerge className="mr-1 h-4 w-4" />4 new this month
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>System Integration Map</CardTitle>
                <CardDescription>Visual representation of all system integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] rounded-md border bg-muted/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex flex-col items-center">
                      <LayoutDashboard className="h-16 w-16 text-muted-foreground/50" />
                      <p className="mt-2 text-sm text-muted-foreground">Integration map visualization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Status</CardTitle>
                <CardDescription>Current status of all system integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                        <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">ERP Integration</p>
                        <p className="text-xs text-muted-foreground">Financial & Inventory</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                        <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">CRM Integration</p>
                        <p className="text-xs text-muted-foreground">Customer & Sales</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                        <Server className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">MES Integration</p>
                        <p className="text-xs text-muted-foreground">Production & Scheduling</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                        <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">QMS Integration</p>
                        <p className="text-xs text-muted-foreground">Quality & Compliance</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-red-100 p-2 dark:bg-red-900">
                        <ArrowDownUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Supply Chain Integration</p>
                        <p className="text-xs text-muted-foreground">Suppliers & Logistics</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                    >
                      Partial
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-flows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Flow Mapping</CardTitle>
              <CardDescription>Visualize how data flows between different systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] rounded-md border bg-muted/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    <ArrowDownUp className="h-16 w-16 text-muted-foreground/50" />
                    <p className="mt-2 text-sm text-muted-foreground">Data flow visualization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Manage and monitor all API endpoints across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Rate Limit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last 24h</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">/api/v1/orders</TableCell>
                    <TableCell>ERP</TableCell>
                    <TableCell>GET, POST</TableCell>
                    <TableCell>1000/hour</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>12,458 calls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/api/v1/customers</TableCell>
                    <TableCell>CRM</TableCell>
                    <TableCell>GET, POST, PUT</TableCell>
                    <TableCell>500/hour</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>8,721 calls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/api/v1/production</TableCell>
                    <TableCell>MES</TableCell>
                    <TableCell>GET, POST</TableCell>
                    <TableCell>2000/hour</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>24,105 calls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/api/v1/quality</TableCell>
                    <TableCell>QMS</TableCell>
                    <TableCell>GET, POST, PUT</TableCell>
                    <TableCell>800/hour</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>6,342 calls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/api/v1/inventory</TableCell>
                    <TableCell>ERP</TableCell>
                    <TableCell>GET, POST, PUT, DELETE</TableCell>
                    <TableCell>1500/hour</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>18,974 calls</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>View and analyze system integration logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-muted p-4 font-mono text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="text-green-500">[INFO]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 08:12:34</span> - ERP to MES data sync completed
                    successfully. 1,245 records processed.
                  </div>
                  <div>
                    <span className="text-green-500">[INFO]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 08:10:12</span> - CRM customer data synchronized
                    with ERP. 87 records updated.
                  </div>
                  <div>
                    <span className="text-amber-500">[WARN]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 08:05:47</span> - API rate limit approaching for
                    /api/v1/production endpoint. Current usage: 85% of limit.
                  </div>
                  <div>
                    <span className="text-green-500">[INFO]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 08:01:23</span> - QMS audit data synchronized
                    with document management system. 34 documents updated.
                  </div>
                  <div>
                    <span className="text-red-500">[ERROR]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 07:58:11</span> - Failed to connect to supplier
                    portal API. Retrying in 5 minutes.
                  </div>
                  <div>
                    <span className="text-green-500">[INFO]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 07:55:02</span> - MES production data
                    synchronized with ERP inventory. 156 items updated.
                  </div>
                  <div>
                    <span className="text-green-500">[INFO]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 07:50:18</span> - Scheduled maintenance completed
                    for database connections. All systems operational.
                  </div>
                  <div>
                    <span className="text-amber-500">[WARN]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 07:45:33</span> - Slow response time detected for
                    QMS document retrieval API. Average response: 850ms.
                  </div>
                  <div>
                    <span className="text-green-500">[INFO]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 07:40:09</span> - CRM sales pipeline data
                    synchronized with ERP order management. 42 opportunities updated.
                  </div>
                  <div>
                    <span className="text-green-500">[INFO]</span>{" "}
                    <span className="text-muted-foreground">2023-05-10 07:35:27</span> - MES machine integration service
                    restarted successfully. All connections restored.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
