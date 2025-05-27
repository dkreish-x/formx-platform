"use client"

import { Input } from "@/components/ui/input"
import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Edit, FileText, QrCode, Package, Plus, Minus, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MaterialComplianceTab } from "@/components/inventory/material-compliance-tab"

export default function MaterialDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real implementation, this would be fetched from the API
  const material = {
    id: params.id,
    name: "Aluminum 6061-T6",
    type: "Raw Material",
    form: "Sheet",
    dimensions: '48" x 96" x 0.25"',
    lotNumber: "LOT-AL6061-2023-042",
    quantity: "25 sheets",
    location: "Rack A-12",
    supplier: "Metal Suppliers Inc.",
    purchaseOrder: "PO-2023-0098",
    receivedDate: "2023-04-28",
    expirationDate: "N/A",
    cost: "$125.00 per sheet",
    totalCost: "$3,125.00",
    certificationAvailable: true,
    allocated: "10 sheets",
    remaining: "15 sheets",
    properties: {
      material: "Aluminum Alloy",
      specification: "AMS 4027",
      temper: "T6",
      density: "0.098 lb/in³",
      tensileStrength: "42,000 psi",
      yieldStrength: "35,000 psi",
      elongation: "8%",
    },
    allocations: [
      {
        id: "ALLOC-2023-0142",
        project: "Acme Robotics Automation",
        workOrder: "WO-2023-0542",
        part: "Bracket Assembly",
        quantity: "5 sheets",
        allocatedDate: "2023-05-01",
        allocatedBy: "John Doe",
      },
      {
        id: "ALLOC-2023-0143",
        project: "TechCorp Medical Device",
        workOrder: "WO-2023-0543",
        part: "Mounting Plate",
        quantity: "3 sheets",
        allocatedDate: "2023-05-03",
        allocatedBy: "Sarah Williams",
      },
      {
        id: "ALLOC-2023-0144",
        project: "Innovate Engineering Prototype",
        workOrder: "WO-2023-0544",
        part: "Housing Cover",
        quantity: "2 sheets",
        allocatedDate: "2023-05-05",
        allocatedBy: "Mike Johnson",
      },
    ],
    transactions: [
      {
        id: "TRANS-2023-0142",
        type: "Received",
        quantity: "25 sheets",
        date: "2023-04-28",
        user: "David Chen",
        notes: "Initial receipt from supplier",
      },
      {
        id: "TRANS-2023-0143",
        type: "Allocated",
        quantity: "5 sheets",
        date: "2023-05-01",
        user: "John Doe",
        notes: "Allocated to WO-2023-0542",
      },
      {
        id: "TRANS-2023-0144",
        type: "Allocated",
        quantity: "3 sheets",
        date: "2023-05-03",
        user: "Sarah Williams",
        notes: "Allocated to WO-2023-0543",
      },
      {
        id: "TRANS-2023-0145",
        type: "Allocated",
        quantity: "2 sheets",
        date: "2023-05-05",
        user: "Mike Johnson",
        notes: "Allocated to WO-2023-0544",
      },
    ],
    files: [
      { name: "Material_Certification.pdf", type: "Certification", date: "2023-04-28" },
      { name: "Inspection_Report.pdf", type: "Quality Doc", date: "2023-04-28" },
      { name: "Supplier_Invoice.pdf", type: "Invoice", date: "2023-04-28" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/inventory/materials">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{material.name}</h1>
            <p className="text-muted-foreground">
              ID: {params.id} | Lot: {material.lotNumber}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <QrCode className="h-4 w-4 mr-2" />
            Print Label
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button size="sm">
            <Package className="h-4 w-4 mr-2" />
            Allocate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{material.remaining}</div>
              <Badge variant="outline" className="text-base py-1 px-3">
                Available
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Quantity</span>
                <span className="text-sm font-medium">{material.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Allocated</span>
                <span className="text-sm font-medium">{material.allocated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm font-medium">{material.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Supplier Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Supplier</span>
                <span className="text-sm font-medium">{material.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Purchase Order</span>
                <span className="text-sm font-medium">{material.purchaseOrder}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Received Date</span>
                <span className="text-sm font-medium">{material.receivedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Cost</span>
                <span className="text-sm font-medium">{material.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Certification</span>
                <span className="text-sm font-medium">
                  {material.certificationAvailable ? (
                    <Badge variant="success">Available</Badge>
                  ) : (
                    <Badge variant="outline">Not Available</Badge>
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Material Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Material</span>
                <span className="text-sm font-medium">{material.properties.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Specification</span>
                <span className="text-sm font-medium">{material.properties.specification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Temper</span>
                <span className="text-sm font-medium">{material.properties.temper}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Density</span>
                <span className="text-sm font-medium">{material.properties.density}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tensile Strength</span>
                <span className="text-sm font-medium">{material.properties.tensileStrength}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocations">Allocations</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="compliance">
            <Shield className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Material Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium">Basic Information</h3>
                  <dl className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Material ID:</dt>
                      <dd className="text-sm font-medium">{params.id}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Name:</dt>
                      <dd className="text-sm font-medium">{material.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Type:</dt>
                      <dd className="text-sm font-medium">{material.type}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Form:</dt>
                      <dd className="text-sm font-medium">{material.form}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Dimensions:</dt>
                      <dd className="text-sm font-medium">{material.dimensions}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Lot Number:</dt>
                      <dd className="text-sm font-medium">{material.lotNumber}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-medium">Inventory Information</h3>
                  <dl className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Total Quantity:</dt>
                      <dd className="text-sm font-medium">{material.quantity}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Allocated:</dt>
                      <dd className="text-sm font-medium">{material.allocated}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Remaining:</dt>
                      <dd className="text-sm font-medium">{material.remaining}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Location:</dt>
                      <dd className="text-sm font-medium">{material.location}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Total Cost:</dt>
                      <dd className="text-sm font-medium">{material.totalCost}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Expiration Date:</dt>
                      <dd className="text-sm font-medium">{material.expirationDate}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium">Material Properties</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(material.properties).map(([key, value]) => (
                    <div key={key} className="p-3 border rounded-md">
                      <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                      <p className="text-sm font-medium mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Allocations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {material.allocations.slice(0, 3).map((allocation) => (
                    <div key={allocation.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <div className="font-medium">{allocation.project}</div>
                        <div className="text-xs text-muted-foreground">
                          {allocation.workOrder} • {allocation.part}
                        </div>
                      </div>
                      <Badge variant="outline">{allocation.quantity}</Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="#" onClick={() => setActiveTab("allocations")}>
                      View All Allocations
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {material.transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <div className="font-medium">{transaction.type}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.date} • {transaction.user}
                        </div>
                      </div>
                      <Badge variant={transaction.type === "Received" ? "success" : "outline"}>
                        {transaction.quantity}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="#" onClick={() => setActiveTab("transactions")}>
                      View All Transactions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocations" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Material Allocations</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Allocate Material
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Allocation ID</th>
                    <th className="text-left font-medium p-4">Project</th>
                    <th className="text-left font-medium p-4">Work Order</th>
                    <th className="text-left font-medium p-4">Part</th>
                    <th className="text-left font-medium p-4">Quantity</th>
                    <th className="text-left font-medium p-4">Date</th>
                    <th className="text-left font-medium p-4">Allocated By</th>
                  </tr>
                </thead>
                <tbody>
                  {material.allocations.map((allocation) => (
                    <tr key={allocation.id} className="border-b">
                      <td className="p-4">{allocation.id}</td>
                      <td className="p-4">{allocation.project}</td>
                      <td className="p-4">{allocation.workOrder}</td>
                      <td className="p-4">{allocation.part}</td>
                      <td className="p-4">{allocation.quantity}</td>
                      <td className="p-4">{allocation.allocatedDate}</td>
                      <td className="p-4">{allocation.allocatedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allocate Material</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proj1">Acme Robotics Automation</SelectItem>
                        <SelectItem value="proj2">TechCorp Medical Device</SelectItem>
                        <SelectItem value="proj3">Innovate Engineering Prototype</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Order</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wo1">WO-2023-0542</SelectItem>
                        <SelectItem value="wo2">WO-2023-0543</SelectItem>
                        <SelectItem value="wo3">WO-2023-0544</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Part</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select part" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part1">Bracket Assembly</SelectItem>
                        <SelectItem value="part2">Mounting Plate</SelectItem>
                        <SelectItem value="part3">Housing Cover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="flex">
                      <Button variant="outline" size="icon">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" defaultValue="1" className="mx-2 text-center" />
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Allocate Material</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
                <Button variant="outline" size="sm">
                  <Minus className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-4">Transaction ID</th>
                    <th className="text-left font-medium p-4">Type</th>
                    <th className="text-left font-medium p-4">Quantity</th>
                    <th className="text-left font-medium p-4">Date</th>
                    <th className="text-left font-medium p-4">User</th>
                    <th className="text-left font-medium p-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {material.transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="p-4">{transaction.id}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            transaction.type === "Received"
                              ? "success"
                              : transaction.type === "Allocated"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </td>
                      <td className="p-4">{transaction.quantity}</td>
                      <td className="p-4">{transaction.date}</td>
                      <td className="p-4">{transaction.user}</td>
                      <td className="p-4">{transaction.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {material.transactions.map((transaction, index) => (
                  <div key={transaction.id} className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        transaction.type === "Received"
                          ? "bg-green-100 text-green-600"
                          : transaction.type === "Allocated"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "Received" ? (
                        <Plus className="h-5 w-5" />
                      ) : transaction.type === "Allocated" ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Minus className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">
                          {transaction.type} {transaction.quantity}
                        </h3>
                        <span className="text-sm text-muted-foreground">{transaction.date}</span>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span>User: {transaction.user}</span>
                      </div>
                      {transaction.notes && <p className="mt-1 text-sm">{transaction.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Material Files</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Certifications</h3>
                  <ul className="mt-2 space-y-2">
                    {material.files
                      .filter((file) => file.type === "Certification")
                      .map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.type} • {file.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Quality Documents</h3>
                  <ul className="mt-2 space-y-2">
                    {material.files
                      .filter((file) => file.type === "Quality Doc")
                      .map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.type} • {file.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Invoices</h3>
                  <ul className="mt-2 space-y-2">
                    {material.files
                      .filter((file) => file.type === "Invoice")
                      .map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.type} • {file.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Material Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <div className="relative h-96 w-full">
                  <Image
                    src="/material-certification.png"
                    alt="Material Certification"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-3 border-t flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Material_Certification.pdf</p>
                    <p className="text-xs text-muted-foreground">Certification • 2023-04-28</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <MaterialComplianceTab material={material} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
