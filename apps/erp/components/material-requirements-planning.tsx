"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Filter,
  Search,
  Download,
  ShoppingCart,
  AlertTriangle,
  Calendar,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for MRP
const mrpItems = [
  {
    id: "MRP-001",
    partNumber: "ALU-6061-0.25",
    description: 'Aluminum 6061-T6 Sheet, 0.25"',
    currentStock: 150,
    reorderPoint: 100,
    safetyStock: 50,
    onOrder: 0,
    leadTime: 14,
    allocated: 75,
    available: 75,
    requiredQty: 200,
    shortfall: 125,
    suggestedOrder: 200,
    unitCost: 125.0,
    supplier: "Metal Suppliers Inc.",
    lastOrdered: "2025-03-15",
  },
  {
    id: "MRP-002",
    partNumber: "SS-304-1.00",
    description: 'Stainless Steel 304 Rod, 1.00" Dia',
    currentStock: 80,
    reorderPoint: 50,
    safetyStock: 30,
    onOrder: 100,
    leadTime: 21,
    allocated: 60,
    available: 120,
    requiredQty: 120,
    shortfall: 0,
    suggestedOrder: 0,
    unitCost: 95.0,
    supplier: "Steel Supply Co.",
    lastOrdered: "2025-04-02",
  },
  {
    id: "MRP-003",
    partNumber: "BOLT-M8-25",
    description: "M8x1.25 Hex Bolt, 25mm Length",
    currentStock: 250,
    reorderPoint: 500,
    safetyStock: 200,
    onOrder: 0,
    leadTime: 7,
    allocated: 350,
    available: -100,
    requiredQty: 1000,
    shortfall: 1100,
    suggestedOrder: 1500,
    unitCost: 0.85,
    supplier: "Fastener Supply Inc.",
    lastOrdered: "2025-02-28",
  },
  {
    id: "MRP-004",
    partNumber: "BRG-608-ZZ",
    description: "608ZZ Ball Bearing",
    currentStock: 120,
    reorderPoint: 100,
    safetyStock: 50,
    onOrder: 200,
    leadTime: 14,
    allocated: 90,
    available: 230,
    requiredQty: 180,
    shortfall: 0,
    suggestedOrder: 0,
    unitCost: 3.25,
    supplier: "Bearing Distributors",
    lastOrdered: "2025-04-10",
  },
  {
    id: "MRP-005",
    partNumber: "O-RING-V75",
    description: "Viton O-Ring, 75mm ID",
    currentStock: 40,
    reorderPoint: 75,
    safetyStock: 30,
    onOrder: 150,
    leadTime: 10,
    allocated: 35,
    available: 155,
    requiredQty: 100,
    shortfall: 0,
    suggestedOrder: 0,
    unitCost: 2.15,
    supplier: "Seal Masters LLC",
    lastOrdered: "2025-04-05",
  },
]

// Material demand forecast data
const demandForecastData = [
  { month: "May", demand: 120, capacity: 150 },
  { month: "Jun", demand: 150, capacity: 150 },
  { month: "Jul", demand: 170, capacity: 150 },
  { month: "Aug", demand: 140, capacity: 150 },
  { month: "Sep", demand: 180, capacity: 150 },
  { month: "Oct", demand: 190, capacity: 150 },
]

export function MaterialRequirementsPlanning() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCritical, setFilterCritical] = useState(false)

  const filteredItems = mrpItems.filter((item) => {
    const matchesSearch =
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterCritical ? item.shortfall > 0 : true

    return matchesSearch && matchesFilter
  })

  const criticalItemsCount = mrpItems.filter((item) => item.shortfall > 0).length
  const totalOrderValue = filteredItems
    .filter((item) => item.suggestedOrder > 0)
    .reduce((sum, item) => sum + item.suggestedOrder * item.unitCost, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Material Requirements Planning</h2>
          <p className="text-muted-foreground">Plan and optimize material requirements based on production schedule</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Generate Purchase Orders
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Materials</p>
                <h3 className="text-2xl font-bold">{mrpItems.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Items</p>
                <h3 className="text-2xl font-bold">{criticalItemsCount}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suggested Orders</p>
                <h3 className="text-2xl font-bold">{mrpItems.filter((item) => item.suggestedOrder > 0).length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Order Value</p>
                <h3 className="text-2xl font-bold">
                  $
                  {totalOrderValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search materials..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant={filterCritical ? "default" : "outline"}
            className="w-full sm:w-auto"
            onClick={() => setFilterCritical(!filterCritical)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {filterCritical ? "Critical Items Only" : "All Items"}
          </Button>
        </div>

        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>On Order</TableHead>
                  <TableHead>Allocated</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Shortfall</TableHead>
                  <TableHead>Suggested Order</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{item.partNumber}</TableCell>
                    <TableCell>
                      <div>
                        <span>{item.description}</span>
                        <div className="text-xs text-muted-foreground">{item.supplier}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>{item.onOrder}</TableCell>
                    <TableCell>{item.allocated}</TableCell>
                    <TableCell className={item.available < 0 ? "text-red-500 font-medium" : ""}>
                      {item.available}
                    </TableCell>
                    <TableCell>{item.requiredQty}</TableCell>
                    <TableCell className={item.shortfall > 0 ? "text-red-500 font-medium" : ""}>
                      {item.shortfall > 0 ? item.shortfall : "-"}
                    </TableCell>
                    <TableCell className={item.suggestedOrder > 0 ? "text-amber-600 font-medium" : ""}>
                      {item.suggestedOrder > 0 ? item.suggestedOrder : "-"}
                    </TableCell>
                    <TableCell>{item.leadTime} days</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.available < 0
                            ? "destructive"
                            : item.currentStock < item.reorderPoint
                              ? "warning"
                              : "default"
                        }
                      >
                        {item.available < 0 ? "Critical" : item.currentStock < item.reorderPoint ? "Reorder" : "OK"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Material Demand Forecast</CardTitle>
            <CardDescription>Projected material requirements vs. capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                demand: {
                  label: "Projected Demand",
                  color: "hsl(var(--chart-1))",
                },
                capacity: {
                  label: "Available Capacity",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={demandForecastData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: "Units", angle: -90, position: "insideLeft" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="demand" fill="var(--color-demand)" name="Projected Demand" />
                  <Bar dataKey="capacity" fill="var(--color-capacity)" name="Available Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span>Projected demand exceeds capacity in July, September and October</span>
              </p>
              <p className="flex items-center gap-2 mt-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span>Order additional materials by June 1st to avoid shortages</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>Based on production schedule and inventory levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-200">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-red-700">Critical Shortage</h4>
                  <p className="text-sm text-red-600 mt-1">
                    Immediate order needed for M8 Hex Bolts (BOLT-M8-25). Required for upcoming production.
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline">
                      Generate PO
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-md bg-amber-50 border border-amber-200">
                <div className="flex-shrink-0">
                  <TrendingDown className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-amber-700">Low Inventory Alert</h4>
                  <p className="text-sm text-amber-600 mt-1">
                    Aluminum 6061-T6 Sheet (ALU-6061-0.25) inventory below reorder point. Place order within 7 days.
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline">
                      Generate PO
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-md bg-green-50 border border-green-200">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-green-700">Upcoming Delivery</h4>
                  <p className="text-sm text-green-600 mt-1">
                    Expected delivery of 608ZZ Ball Bearings (BRG-608-ZZ) on May 15, 2025.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-md border border-gray-200">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Optimization Opportunity</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider bulk order of Viton O-Rings to reduce unit cost. Potential savings of 15%.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
