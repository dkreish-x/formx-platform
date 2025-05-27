"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"

interface QuantityPricingTableProps {
  initialQuantity: number
  onQuantityChange: (quantity: number) => void
  part: any
}

export default function QuantityPricingTable({ initialQuantity, onQuantityChange, part }: QuantityPricingTableProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleQuantityChange = (value: string) => {
    const newQuantity = Number.parseInt(value, 10)
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  const incrementQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onQuantityChange(newQuantity)
  }

  // Calculate volume discounts
  const getVolumeDiscount = (qty: number) => {
    if (qty >= 100) return 0.25 // 25% discount for 100+ units
    if (qty >= 50) return 0.2 // 20% discount for 50+ units
    if (qty >= 25) return 0.15 // 15% discount for 25+ units
    if (qty >= 10) return 0.1 // 10% discount for 10+ units
    if (qty >= 5) return 0.05 // 5% discount for 5+ units
    return 0 // No discount for less than 5 units
  }

  // Calculate base price (this would normally come from your pricing engine)
  const basePrice = 100 // Example base price

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quantity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <div className="relative flex-1">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="h-8 text-center"
            />
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={incrementQuantity}>
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Volume Discounts</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">5+ units</div>
              <div className="text-green-600">5% off</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">10+ units</div>
              <div className="text-green-600">10% off</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">25+ units</div>
              <div className="text-green-600">15% off</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">50+ units</div>
              <div className="text-green-600">20% off</div>
            </div>
          </div>

          {quantity >= 5 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md">
              <div className="text-green-800 font-medium">
                You qualify for a {getVolumeDiscount(quantity) * 100}% volume discount!
              </div>
              <div className="text-green-700 text-sm">Discount applied to your total price.</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
