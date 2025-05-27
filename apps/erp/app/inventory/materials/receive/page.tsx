"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function ReceiveMaterialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/inventory/materials">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Receive Materials</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Material Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Material Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluminum">Aluminum 6061-T6</SelectItem>
                    <SelectItem value="steel">Stainless Steel 304</SelectItem>
                    <SelectItem value="plastic">ABS Plastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Form</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sheet">Sheet</SelectItem>
                    <SelectItem value="plate">Plate</SelectItem>
                    <SelectItem value="bar">Round Bar</SelectItem>
                    <SelectItem value="tube">Tube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Dimensions</label>
                <Input placeholder="Enter dimensions" className="mt-1" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input type="number" placeholder="Enter quantity" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Lot Number</label>
                <Input placeholder="Enter lot number" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Enter storage location" className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Supplier</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metal">Metal Suppliers Inc.</SelectItem>
                    <SelectItem value="steel">Steel Supply Co.</SelectItem>
                    <SelectItem value="plastic">Plastic Distributors Inc.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Purchase Order</label>
                <Input placeholder="Enter purchase order number" className="mt-1" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Cost</label>
                <Input placeholder="Enter cost" className="mt-1" />
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox id="certification" />
                <Label htmlFor="certification">Material certification available</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certification & Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea placeholder="Enter notes" className="mt-1" rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Upload Files</label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center mt-1">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                <p className="text-xs text-muted-foreground">Supported formats: .PDF, .JPG, .PNG</p>
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
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/inventory/materials">Cancel</Link>
        </Button>
        <Button>Receive Materials</Button>
      </div>
    </div>
  )
}
