"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChangeOrderStageBadge, ChangeOrderPriorityBadge } from "@/components/orders/change-order-status-badge"
import { AlertTriangle, CheckCircle, Clock, FileText, MessageSquare, User } from "lucide-react"

export function ChangeOrderDetail() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Change Order CO-1001</CardTitle>
              <CardDescription>Submitted on May 10, 2025</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <ChangeOrderStageBadge stage="In Production" />
              <ChangeOrderPriorityBadge priority="High" />
              <Badge variant="warning">Pending Approval</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Information</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Order ID:</span> ORD-5782
                </p>
                <p>
                  <span className="font-medium">Customer:</span> Acme Industries
                </p>
                <p>
                  <span className="font-medium">Original Due Date:</span> June 15, 2025
                </p>
                <p>
                  <span className="font-medium">Revised Due Date:</span>{" "}
                  <span className="text-amber-500">June 22, 2025</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Change Request Details</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Requested By:</span> John Smith
                </p>
                <p>
                  <span className="font-medium">Department:</span> Engineering
                </p>
                <p>
                  <span className="font-medium">Reason:</span> Design Change
                </p>
                <p>
                  <span className="font-medium">Production Impact:</span>{" "}
                  <span className="text-destructive font-medium">High</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Change Description</h3>
            <p className="text-sm">
              Customer has requested a change to the material specification from 6061-T6 aluminum to 7075-T6 aluminum
              for increased strength. This affects all components in the assembly. The change requires re-programming of
              CNC operations and adjustment of tooling parameters.
            </p>
          </div>

          <div className="bg-muted p-4 rounded-md border">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-destructive">Production Impact Warning</h4>
                <p className="text-sm">
                  This change order affects an order currently in production. Production has been paused pending
                  approval. Additional costs will be incurred for materials already used and machine time.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="impact">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="impact">Impact Assessment</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="impact" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cost Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Additional Material Cost:</span>
                        <span className="font-medium">$1,250.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional Labor Cost:</span>
                        <span className="font-medium">$850.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Machine Time Cost:</span>
                        <span className="font-medium">$625.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scrap/Waste Cost:</span>
                        <span className="font-medium">$375.00</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total Additional Cost:</span>
                        <span className="text-destructive">$3,100.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Schedule Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Production Delay:</span>
                        <span className="font-medium">7 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Original Delivery Date:</span>
                        <span className="font-medium">June 15, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revised Delivery Date:</span>
                        <span className="font-medium text-amber-500">June 22, 2025</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-sm text-muted-foreground">
                          Note: This change will impact the production schedule for other orders in the queue.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="approvals" className="pt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Engineering Approval</p>
                          <p className="text-sm text-muted-foreground">Approved by Michael Chen</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">May 10, 2025 • 2:45 PM</div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Production Approval</p>
                          <p className="text-sm text-muted-foreground">Approved by Sarah Johnson</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">May 11, 2025 • 9:30 AM</div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Finance Approval</p>
                          <p className="text-sm text-muted-foreground">Pending approval from Robert Davis</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Awaiting response</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Customer Approval</p>
                          <p className="text-sm text-muted-foreground">Pending approval from Acme Industries</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Awaiting response</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Other tab contents would follow the same pattern */}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <div className="flex gap-2">
            <Button variant="destructive">Reject</Button>
            <Button>Approve</Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments & Notes</CardTitle>
          <CardDescription>Communication history for this change order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Sarah Johnson (Production Manager)</p>
                  <span className="text-xs text-muted-foreground">May 11, 2025 • 9:30 AM</span>
                </div>
                <p className="text-sm">
                  I've reviewed the change request and we can accommodate the material change. However, we'll need to
                  adjust our production schedule and this will impact other orders in the queue. I've approved from the
                  production side, but we should discuss the schedule implications with the customer.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Michael Chen (Engineering Lead)</p>
                  <span className="text-xs text-muted-foreground">May 10, 2025 • 2:45 PM</span>
                </div>
                <p className="text-sm">
                  The change from 6061-T6 to 7075-T6 aluminum is feasible from an engineering perspective. We'll need to
                  adjust our CNC programming and tool paths, but the design intent can be maintained. I've approved this
                  change from the engineering side.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex w-full items-center space-x-2">
            <div className="flex-1">
              <textarea
                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add a comment..."
              />
            </div>
            <Button type="submit">
              <MessageSquare className="mr-2 h-4 w-4" />
              Comment
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
