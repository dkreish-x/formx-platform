"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Save, ArrowLeft } from "lucide-react"
import type { AdminRFQDetails } from "@/types/admin"

interface AdminRFQEditFormProps {
  rfq: AdminRFQDetails
}

export default function AdminRFQEditForm({ rfq }: AdminRFQEditFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    partName: rfq.partName,
    process: rfq.process,
    material: rfq.material,
    finish: rfq.finish,
    quantity: rfq.quantity,
    tolerance: rfq.tolerance,
    leadTime: rfq.leadTime,
    length: rfq.dimensions.length,
    width: rfq.dimensions.width,
    height: rfq.dimensions.height,
    notes: rfq.customerNotes || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to update the RFQ
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "RFQ updated",
        description: "The RFQ configuration has been updated successfully.",
      })

      // Redirect back to the RFQ details page
      router.push(`/admin/rfq/${rfq.id}`)
    } catch (error) {
      console.error("Error updating RFQ:", error)
      toast({
        title: "Error updating RFQ",
        description: "There was an error updating the RFQ. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="partName">Part Name</Label>
            <Input
              id="partName"
              value={formData.partName}
              onChange={(e) => handleInputChange("partName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="process">Manufacturing Process</Label>
            <Select value={formData.process} onValueChange={(value) => handleInputChange("process", value)}>
              <SelectTrigger id="process">
                <SelectValue placeholder="Select process" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CNC Machining">CNC Machining</SelectItem>
                <SelectItem value="Laser Cutting">Laser Cutting</SelectItem>
                <SelectItem value="3D Printing">3D Printing</SelectItem>
                <SelectItem value="Injection Molding">Injection Molding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Select value={formData.material} onValueChange={(value) => handleInputChange("material", value)}>
              <SelectTrigger id="material">
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aluminum 6061">Aluminum 6061</SelectItem>
                <SelectItem value="Stainless Steel 304">Stainless Steel 304</SelectItem>
                <SelectItem value="Mild Steel">Mild Steel</SelectItem>
                <SelectItem value="Brass">Brass</SelectItem>
                <SelectItem value="Copper">Copper</SelectItem>
                <SelectItem value="Titanium">Titanium</SelectItem>
                <SelectItem value="ABS">ABS</SelectItem>
                <SelectItem value="PLA">PLA</SelectItem>
                <SelectItem value="Nylon">Nylon</SelectItem>
                <SelectItem value="Acrylic">Acrylic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="finish">Finish</Label>
            <Select value={formData.finish} onValueChange={(value) => handleInputChange("finish", value)}>
              <SelectTrigger id="finish">
                <SelectValue placeholder="Select finish" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="As Machined">As Machined</SelectItem>
                <SelectItem value="Bead Blasted">Bead Blasted</SelectItem>
                <SelectItem value="Anodized">Anodized</SelectItem>
                <SelectItem value="Powder Coated">Powder Coated</SelectItem>
                <SelectItem value="Polished">Polished</SelectItem>
                <SelectItem value="Painted">Painted</SelectItem>
                <SelectItem value="Brushed">Brushed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tolerance">Tolerance</Label>
            <Select value={formData.tolerance} onValueChange={(value) => handleInputChange("tolerance", value)}>
              <SelectTrigger id="tolerance">
                <SelectValue placeholder="Select tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard (±0.005&quot;)">Standard (±0.005")</SelectItem>
                <SelectItem value="Tight (±0.001&quot;)">Tight (±0.001")</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leadTime">Lead Time</Label>
            <Select value={formData.leadTime} onValueChange={(value) => handleInputChange("leadTime", value)}>
              <SelectTrigger id="leadTime">
                <SelectValue placeholder="Select lead time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard (7-10 days)">Standard (7-10 days)</SelectItem>
                <SelectItem value="Expedited (3-5 days)">Expedited (3-5 days)</SelectItem>
                <SelectItem value="Rush (1-2 days)">Rush (1-2 days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="length">Length (mm)</Label>
              <Input
                id="length"
                type="number"
                min="0"
                step="0.1"
                value={formData.length}
                onChange={(e) => handleInputChange("length", Number.parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width (mm)</Label>
              <Input
                id="width"
                type="number"
                min="0"
                step="0.1"
                value={formData.width}
                onChange={(e) => handleInputChange("width", Number.parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (mm)</Label>
              <Input
                id="height"
                type="number"
                min="0"
                step="0.1"
                value={formData.height}
                onChange={(e) => handleInputChange("height", Number.parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Customer Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => router.push(`/admin/rfq/${rfq.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
