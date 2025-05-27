import { CardFooter } from "@/components/ui/card"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calculator,
  Calendar,
  CreditCard,
  Plus,
  Receipt,
  Settings,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Finance | Form(X) Manufacturing",
  description: "Financial management and accounting",
}

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-muted-foreground">
            Manage financial operations and accounting.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/finance/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button asChild>
            <Link href="/finance/transactions/new">
              <Plus className="mr-2 h-4 w-4" />
              New Transaction
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue (MTD)</CardTitle>
            <CardDescription>Accounting records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$342,568</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Expenses (MTD)</CardTitle>
            <CardDescription>Manage vendor payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$218,425</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Accounts Receivable</CardTitle>
            <CardDescription>Manage customer payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156,890</div>
            <p className="text-xs text-muted-foreground">$42,350 overdue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Accounts Payable</CardTitle>
            <CardDescription>Financial statements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$98,540</div>
            <p className="text-xs text-muted-foreground">$12,780 due this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="general-ledger">General Ledger</TabsTrigger>
          <TabsTrigger value="accounts-receivable">Accounts Receivable</TabsTrigger>
          <TabsTrigger value="accounts-payable">Accounts Payable</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Revenue vs. Expenses (Last 12 Months)</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Financial performance chart</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Current Month</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Expense pie chart</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Invoice #INV-2025-042</p>
                        <p className="text-sm text-muted-foreground">Acme Corporation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+$12,580.00</p>
                      <p className="text-sm text-muted-foreground">May 9, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">PO #PO-2025-038</p>
                        <p className="text-sm text-muted-foreground">MetalSupply Inc.</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">-$8,450.00</p>
                      <p className="text-sm text-muted-foreground">May 8, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Invoice #INV-2025-041</p>
                        <p className="text-sm text-muted-foreground">Globex Industries</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+$9,875.00</p>
                      <p className="text-sm text-muted-foreground">May 7, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Payroll</p>
                        <p className="text-sm text-muted-foreground">Bi-weekly payroll</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">-$42,350.00</p>
                      <p className="text-sm text-muted-foreground">May 5, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/finance/transactions">View All Transactions</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Link href="/finance/invoices/new">
                      <Receipt className="h-6 w-6 mb-1" />
                      <span>Create Invoice</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Link href="/finance/expenses/new">
                      <CreditCard className="h-6 w-6 mb-1" />
                      <span>Record Expense</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Link href="/finance/reports/generate">
                      <BarChart3 className="h-6 w-6 mb-1" />
                      <span>Generate Report</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Link href="/finance/reconciliation">
                      <Calculator className="h-6 w-6 mb-1" />
                      <span>Reconciliation</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 text-center">
                      <div className="font-bold">12</div>
                      <div className="text-xs text-muted-foreground">MAY</div>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <div className="font-medium">MetalSupply Inc.</div>
                      <div className="text-sm text-muted-foreground">PO-2025-035 - $12,450.00</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 text-center">
                      <div className="font-bold">15</div>
                      <div className="text-xs text-muted-foreground">MAY</div>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <div className="font-medium">Utility Payment</div>
                      <div className="text-sm text-muted-foreground">Monthly utilities - $3,850.00</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 text-center">
                      <div className="font-bold">19</div>
                      <div className="text-xs text-muted-foreground">MAY</div>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <div className="font-medium">Payroll</div>
                      <div className="text-sm text-muted-foreground">Bi-weekly payroll - $42,350.00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/finance/calendar">View Payment Calendar</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overdue Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">INV-2025-032</p>
                      <p className="text-sm text-muted-foreground">Acme Corporation</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$18,540.00</p>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">15 days</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">INV-2025-028</p>
                      <p className="text-sm text-muted-foreground">Stark Enterprises</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$12,350.00</p>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">22 days</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">INV-2025-025</p>
                      <p className="text-sm text-muted-foreground">Wayne Industries</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$8,450.00</p>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">30 days</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/finance/accounts-receivable/overdue">View All Overdue</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Monthly Close</p>
                      <p className="text-sm text-muted-foreground">May 31, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Quarterly Tax Filing</p>
                      <p className="text-sm text-muted-foreground">June 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Annual Audit</p>
                      <p className="text-sm text-muted-foreground">July 10, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Budget Planning</p>
                      <p className="text-sm text-muted-foreground">August 5, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/finance/calendar">View Full Calendar</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="general-ledger">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>General Ledger</CardTitle>
                <Button asChild>
                  <Link href="/finance/general-ledger/new-entry">
                    <Plus className="mr-2 h-4 w-4" />
                    New Entry
                  </Link>
                </Button>
              </div>
              <CardDescription>Manage chart of accounts and journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">General Ledger</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    View and manage your chart of accounts and journal entries.
                  </p>
                  <Button className="mt-4">View General Ledger</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts-receivable">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Accounts Receivable</CardTitle>
                <Button asChild>
                  <Link href="/finance/invoices/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Invoice
                  </Link>
                </Button>
              </div>
              <CardDescription>Manage customer invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <ArrowUpRight className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Accounts Receivable</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    View and manage your customer invoices and payments.
                  </p>
                  <Button className="mt-4">View Accounts Receivable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts-payable">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Accounts Payable</CardTitle>
                <Button asChild>
                  <Link href="/finance/bills/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Bill
                  </Link>
                </Button>
              </div>
              <CardDescription>Manage vendor bills and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <ArrowDownRight className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Accounts Payable</h3>
