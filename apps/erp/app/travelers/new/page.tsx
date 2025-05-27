"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTravelerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/travelers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Digital Traveler</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Part Number</label>
                <Input placeholder="Enter part number" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Part Name</label>
                <Input placeholder="Enter part name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Revision</label>
                <Input placeholder="Enter revision" className="mt-1" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Industries</SelectItem>
                    <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                    <SelectItem value="innovate">Innovate Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Order Number</label>
                <Input placeholder="Enter order number" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input type="number" placeholder="Enter quantity" className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Material Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Material</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluminum">Aluminum 6061-T6</SelectItem>
                    <SelectItem value="steel">Stainless Steel 304</SelectItem>
                    <SelectItem value="plastic">ABS Plastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Material Lot</label>
                <Input placeholder="Enter material lot" className="mt-1" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Finish</label>
                <Input placeholder="Enter finish" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea placeholder="Enter notes" className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/travelers">Cancel</Link>
        </Button>
        <Button>Create Traveler</Button>
      </div>
    </div>
  )
}
