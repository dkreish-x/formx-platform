"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateBasePrice } from "@/lib/manufacturing-processes"
import { Loader2 } from "lucide-react"

interface RealTimePricingProps {
  part: {
    process: string
    material: string
    finish?: string
    quantity: number
    additionalOptions?: Record<string, any>
  }
  quantity: number
}

export default function RealTimePricing({ part, quantity }: RealTimePricingProps) {
  const [price, setPrice] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    const calculatePrice = async () => {
      if (!part.process || !part.material || !part.finish) {
        setPrice(null)
        return
      }

      setIsCalculating(true)

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Calculate price
        const calculatedPrice = calculateBasePrice(
          part.process,
          part.material,
          part.finish || "",
          quantity,
          part.additionalOptions || {},
        )

        setPrice(calculatedPrice)
      } catch (error) {
        console.error("Error calculating price:", error)
        setPrice(null)
      } finally {
        setIsCalculating(false)
      }
    }

    calculatePrice()
  }, [part.process, part.material, part.finish, quantity, part.additionalOptions])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Real-Time Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        {isCalculating ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-brand-dark-gold" />
            <span className="ml-2 text-gray-600">Calculating price...</span>
          </div>
        ) : price !== null ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">${price.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium">{quantity}</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-2 mt-2">
              <span className="text-gray-700 font-medium">Total:</span>
              <span className="text-xl font-bold text-brand-dark-gold">${(price * quantity).toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-gray-500">Select process, material, and finish to see pricing</div>
        )}
      </CardContent>
    </Card>
  )
}
