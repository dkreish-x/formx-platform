"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CalendarIcon, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ChangeOrderForm() {
  const [productionStage, setProductionStage] = useState("pre-production")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Order Details</CardTitle>
          <CardDescription>Provide information about the requested changes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order-id">Order ID</Label>
              <Select defaultValue="ord-5782">
                <SelectTrigger>
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ord-5782">ORD-5782 - Acme Industries</SelectItem>
                  <SelectItem value="ord-5790">ORD-5790 - TechCorp Solutions</SelectItem>
                  <SelectItem value="ord-5801">ORD-5801 - Precision Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="expedited">Expedited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Production Stage</Label>
            <RadioGroup
              defaultValue="pre-production"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onValueChange={setProductionStage}
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="pre-production" id="pre-production" />
                <Label htmlFor="pre-production" className="cursor-pointer">
                  Pre-Production
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="in-production" id="in-production" />
                <Label htmlFor="in-production" className="cursor-pointer">
                  In Production
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="post-production" id="post-production" />
                <Label htmlFor="post-production" className="cursor-pointer">
                  Post-Production
                </Label>
              </div>
            </RadioGroup>
          </div>

          {productionStage === "in-production" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Production Impact Warning</AlertTitle>
              <AlertDescription>
                This order is currently in production. Changes will require an immediate production stop and will incur
                additional costs for materials used and machine time.
              </AlertDescription>
            </Alert>
          )}

          {productionStage === "post-production" && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Post-Production Notice</AlertTitle>
              <AlertDescription>
                This order has completed production. Customer will be charged for the full original lot plus the new
                job.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="change-description">Change Description</Label>
            <Textarea id="change-description" placeholder="Describe the requested changes in detail..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Change</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design-change">Design Change</SelectItem>
                <SelectItem value="material-change">Material Change</SelectItem>
                <SelectItem value="quantity-change">Quantity Change</SelectItem>
                <SelectItem value="specification-change">Specification Change</SelectItem>
                <SelectItem value="customer-request">Customer Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Supporting Documents</Label>
            <div className="border border-dashed rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Drag and drop files here or click to browse</p>
              <Button variant="outline" size="sm" className="mt-2">
                Upload Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impact Assessment</CardTitle>
          <CardDescription>Evaluate the impact of this change order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="cost">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="cost">Cost Impact</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Impact</TabsTrigger>
              <TabsTrigger value="material">Material Impact</TabsTrigger>
              <TabsTrigger value="quality">Quality Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="cost" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="additional-material-cost">Additional Material Cost ($)</Label>
                  <Input id="additional-material-cost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional-labor-cost">Additional Labor Cost ($)</Label>
                  <Input id="additional-labor-cost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="machine-time-cost">Machine Time Cost ($)</Label>
                  <Input id="machine-time-cost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scrap-cost">Scrap/Waste Cost ($)</Label>
                  <Input id="scrap-cost" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost-notes">Cost Impact Notes</Label>
                <Textarea id="cost-notes" placeholder="Additional notes on cost impact..." />
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="delay-days">Expected Delay (Days)</Label>
                  <Input id="delay-days" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-delivery-date">New Estimated Delivery Date</Label>
                  <div className="relative">
                    <Input id="new-delivery-date" type="date" />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-notes">Schedule Impact Notes</Label>
                <Textarea id="schedule-notes" placeholder="Additional notes on schedule impact..." />
              </div>
            </TabsContent>
            {/* Other tab contents would follow the same pattern */}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Submit Change Order</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
