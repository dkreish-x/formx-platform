"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function NewRFQPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    toast({
      title: "RFQ Created",
      description: "The RFQ has been successfully created.",
    })
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/rfq">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">New Request for Quote</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Enter the customer details for this RFQ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-type">Customer Type</Label>
                    <Select defaultValue="new">
                      <SelectTrigger id="customer-type">
                        <SelectValue placeholder="Select customer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Customer</SelectItem>
                        <SelectItem value="existing">Existing Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input id="contact-name" placeholder="Enter contact name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-source">Lead Source</Label>
                    <Select defaultValue="website">
                      <SelectTrigger id="lead-source">
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="trade-show">Trade Show</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="direct">Direct Contact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Enter the details of the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input id="project-title" placeholder="Enter project title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Project Description</Label>
                  <Textarea id="project-description" placeholder="Enter detailed description of the project" rows={4} />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Anticipated Due Date</Label>
                    <DatePicker />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itar">ITAR Requirements</Label>
                    <Select defaultValue="no">
                      <SelectTrigger id="itar">
                        <SelectValue placeholder="Select ITAR requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - ITAR Controlled</SelectItem>
                        <SelectItem value="no">No - Not ITAR Controlled</SelectItem>
                        <SelectItem value="unknown">Unknown - Needs Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="design" />
                      <Label htmlFor="design" className="font-normal">
                        Design Services
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="machined-parts" />
                      <Label htmlFor="machined-parts" className="font-normal">
                        Machined Parts
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="additive-parts" />
                      <Label htmlFor="additive-parts" className="font-normal">
                        Additive Manufacturing
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="finishing" />
                      <Label htmlFor="finishing" className="font-normal">
                        Finishing/Powdercoating
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="automation" />
                      <Label htmlFor="automation" className="font-normal">
                        Automation Cells
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fulfillment" />
                      <Label htmlFor="fulfillment" className="font-normal">
                        Fulfillment
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">File Upload</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supported formats: .STEP, .STL, .PDF, .DXF, .DWG</p>
                    <Input id="file-upload" type="file" multiple className="hidden" />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Provide any additional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promotion">Promotion Eligibility</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="promotion" />
                    <Label htmlFor="promotion" className="font-normal">
                      Eligible for current promotions
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping & Billing</CardTitle>
                <CardDescription>Enter shipping and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="same">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="same">Same Address</TabsTrigger>
                    <TabsTrigger value="different">Different Address</TabsTrigger>
                  </TabsList>
                  <TabsContent value="same" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="Enter address" rows={3} />
                    </div>
                  </TabsContent>
                  <TabsContent value="different" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-address">Billing Address</Label>
                      <Textarea id="billing-address" placeholder="Enter billing address" rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-address">Shipping Address</Label>
                      <Textarea id="shipping-address" placeholder="Enter shipping address" rows={3} />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="tax-exemption">Tax Exemption</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="tax-exemption" />
                    <Label htmlFor="tax-exemption" className="font-normal">
                      Customer is tax exempt
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <Button variant="outline" asChild>
            <Link href="/rfq">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create RFQ"}
          </Button>
        </div>
      </form>
    </div>
  )
}
