import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CartItemsList from "@/components/cart/cart-items-list"
import CartSummary from "@/components/cart/cart-summary"
import { getCartItems } from "@/lib/cart"
import { Upload, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Your Cart | Form(X)",
  description: "Review and submit your manufacturing quote request",
}

export default async function CartPage() {
  // In a real app, this would fetch cart data from a database or API
  const cartItems = await getCartItems()
  const isEmpty = cartItems.length === 0

  return (
    <main className="container py-12">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/dashboard"
          className="flex items-center text-sm text-brand-light-grey hover:text-brand-dark-gold transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-dark-grey">
          Your Quote Cart
        </h1>
        <p className="max-w-[700px] text-brand-light-grey md:text-xl/relaxed">
          Review your parts and submit your quote request
        </p>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-brand-dark-grey">Your cart is empty</h2>
            <p className="text-brand-light-grey">
              You haven't added any parts to your quote yet. Start by uploading a part.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey">
              <Link href="/upload">Upload a Part</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsList items={cartItems} />
              <div className="mt-6">
                <Button asChild variant="outline" className="flex items-center">
                  <Link href="/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Add Another Part
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-1">
              <CartSummary items={cartItems} />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
