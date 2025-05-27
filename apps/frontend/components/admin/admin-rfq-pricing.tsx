"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Save, Calculator } from "lucide-react"

interface PricingData {
  materialCost: number
  laborCost: number
  setupCost: number
  finishingCost: number
  overheadCost: number
  margin: number
  discount: number
  totalCost: number
  suggestedPrice: number
  finalPrice: number
  isPriceOverridden: boolean
}

interface AdminRFQPricingProps {
  rfqId: string
  initialPricing: PricingData
}

export default function AdminRFQPricing({ rfqId, initialPricing }: AdminRFQPricingProps) {
  const [pricing, setPricing] = useState<PricingData>(initialPricing)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof PricingData, value: string) => {
    const numValue = Number.parseFloat(value) || 0

    const updatedPricing = {
      ...pricing,
      [field]: numValue,
    }

    // Recalculate totals if not overridden
    if (!pricing.isPriceOverridden || field === "finalPrice") {
      const totalCost =
        updatedPricing.materialCost +
        updatedPricing.laborCost +
        updatedPricing.setupCost +
        updatedPricing.finishingCost +
        updatedPricing.overheadCost

      const suggestedPrice = totalCost * (1 + updatedPricing.margin / 100) * (1 - updatedPricing.discount / 100)

      updatedPricing.totalCost = totalCost
      updatedPricing.suggestedPrice = suggestedPrice

      if (!pricing.isPriceOverridden) {
        updatedPricing.finalPrice = suggestedPrice
      }
    }

    setPricing(updatedPricing)
  }

  const handleToggleOverride = (checked: boolean) => {
    setPricing({
      ...pricing,
      isPriceOverridden: checked,
      finalPrice: checked ? pricing.finalPrice : pricing.suggestedPrice,
    })
  }

  const handleSavePricing = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to save the pricing
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Pricing updated",
        description: "The pricing information has been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving pricing:", error)
      toast({
        title: "Error saving pricing",
        description: "There was an error saving the pricing information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRecalculate = () => {
    const totalCost =
      pricing.materialCost + pricing.laborCost + pricing.setupCost + pricing.finishingCost + pricing.overheadCost

    const suggestedPrice = totalCost * (1 + pricing.margin / 100) * (1 - pricing.discount / 100)

    setPricing({
      ...pricing,
      totalCost,
      suggestedPrice,
      finalPrice: pricing.isPriceOverridden ? pricing.finalPrice : suggestedPrice,
    })

    toast({
      title: "Pricing recalculated",
      description: "The pricing has been recalculated based on current values.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="materialCost">Material Cost</Label>
              <Input
                id="materialCost"
                type="number"
                min="0"
                step="0.01"
                value={pricing.materialCost}
                onChange={(e) => handleInputChange("materialCost", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="laborCost">Labor Cost</Label>
              <Input
                id="laborCost"
                type="number"
                min="0"
                step="0.01"
                value={pricing.laborCost}
                onChange={(e) => handleInputChange("laborCost", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="setupCost">Setup Cost</Label>
              <Input
                id="setupCost"
                type="number"
                min="0"
                step="0.01"
                value={pricing.setupCost}
                onChange={(e) => handleInputChange("setupCost", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="finishingCost">Finishing Cost</Label>
              <Input
                id="finishingCost"
                type="number"
                min="0"
                step="0.01"
                value={pricing.finishingCost}
                onChange={(e) => handleInputChange("finishingCost", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="overheadCost">Overhead Cost</Label>
              <Input
                id="overheadCost"
                type="number"
                min="0"
                step="0.01"
                value={pricing.overheadCost}
                onChange={(e) => handleInputChange("overheadCost", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="margin">Margin (%)</Label>
              <Input
                id="margin"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={pricing.margin}
                onChange={(e) => handleInputChange("margin", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={pricing.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleRecalculate}>
            <Calculator className="h-4 w-4 mr-1" />
            Recalculate
          </Button>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-brand-light-grey">Total Cost:</span>
            <span className="font-medium text-brand-dark-grey">${pricing.totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-light-grey">Suggested Price:</span>
            <span className="font-medium text-brand-dark-grey">${pricing.suggestedPrice.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="override-price">Override Price</Label>
              <p className="text-xs text-muted-foreground">Manually set the final price</p>
            </div>
            <Switch id="override-price" checked={pricing.isPriceOverridden} onCheckedChange={handleToggleOverride} />
          </div>

          <div className="space-y-1 pt-2">
            <Label htmlFor="finalPrice" className="font-medium">
              Final Price
            </Label>
            <Input
              id="finalPrice"
              type="number"
              min="0"
              step="0.01"
              value={pricing.finalPrice}
              onChange={(e) => handleInputChange("finalPrice", e.target.value)}
              className={pricing.isPriceOverridden ? "border-brand-dark-gold" : ""}
              disabled={!pricing.isPriceOverridden}
            />
          </div>
        </div>

        <Button
          onClick={handleSavePricing}
          disabled={isSubmitting}
          className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey"
        >
          {isSubmitting ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save Pricing
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
