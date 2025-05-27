"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Loader2, Send, Upload } from "lucide-react"
import type { CartItem } from "@/types/cart"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

interface CartSummaryProps {
  items: CartItem[]
}

export default function CartSummary({ items }: CartSummaryProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notes, setNotes] = useState("")

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price, 0)

  // Calculate estimated lead time
  const leadTimes = items.map((item) => {
    if (item.leadTime === "Rush") return 2
    if (item.leadTime === "Expedited") return 5
    return 10 // Standard
  })

  const minLeadTime = Math.max(...leadTimes)
  const maxLeadTime = minLeadTime + 3

  const handleSubmitQuote = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to submit the quote
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Quote submitted successfully",
        description: "We'll review your quote and get back to you shortly.",
      })

      // Navigate to confirmation page
      router.push("/quote-confirmation")
    } catch (error) {
      console.error("Error submitting quote:", error)
      toast({
        title: "Error submitting quote",
        description: "There was an error submitting your quote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-brand-light-grey">Subtotal</span>
            <span className="font-medium text-brand-dark-grey">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-light-grey">Parts</span>
            <span className="text-brand-dark-grey">{items.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-light-grey">Estimated Lead Time</span>
            <span className="text-brand-dark-grey">
              {minLeadTime}-{maxLeadTime} business days
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span className="text-brand-dark-grey">Total</span>
          <span className="text-brand-dark-grey">${subtotal.toFixed(2)}</span>
        </div>

        <div className="pt-4">
          <label htmlFor="notes" className="block text-sm font-medium text-brand-dark-grey mb-2">
            Additional Notes
          </label>
          <Textarea
            id="notes"
            placeholder="Add any special instructions or requirements here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button
          className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey"
          disabled={isSubmitting}
          onClick={handleSubmitQuote}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Quote Request
            </>
          )}
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Continue Uploading Parts
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
