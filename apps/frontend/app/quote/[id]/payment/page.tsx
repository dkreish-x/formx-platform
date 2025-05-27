import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Lock, Calendar, CreditCardIcon, MapPin, ChevronRight, ShieldCheck } from "lucide-react"

interface PaymentPageProps {
  params: {
    id: string
  }
}

// This would be replaced with a real data fetching function in a production app
async function getQuoteDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    id,
    name: "Aluminum Brackets",
    total: 511.81,
  }
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const quote = await getQuoteDetails(params.id)

  return (
    <main className="container max-w-5xl py-8 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4 p-0 h-auto">
          <Link
            href={`/quote/${params.id}`}
            className="flex items-center text-brand-dark-grey hover:text-brand-dark-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Quote</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-brand-dark-grey">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Payment Information</CardTitle>
              <CardDescription>Enter your payment details to complete your order</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-brand-dark-grey">Payment Method</h3>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-green-600">Secure Payment</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-1">
                      <div className="border rounded-md p-3 flex items-center justify-center bg-white hover:border-brand-light-gold cursor-pointer">
                        <CreditCardIcon className="h-6 w-6 text-brand-dark-grey" />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="border rounded-md p-3 flex items-center justify-center bg-white hover:border-brand-light-gold cursor-pointer">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M22 9.51V8.51C22 6.71 20.54 5.25 18.74 5.25H5.26C3.46 5.25 2 6.71 2 8.51V9.51H22Z"
                            fill="#3C4043"
                          />
                          <path
                            d="M2 11.51V15.51C2 17.31 3.46 18.77 5.26 18.77H18.74C20.54 18.77 22 17.31 22 15.51V11.51H2Z"
                            fill="#4285F4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="border rounded-md p-3 flex items-center justify-center bg-white hover:border-brand-light-gold cursor-pointer">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M17.5 7.2H19.4V3.1H16.7V3C14.2 3 12.4 4.8 12.4 7.3V8.7H9.7V12.8H12.4V21H16.5V12.8H19.2L19.8 8.7H16.5V7.3C16.5 7.2 17 7.2 17.5 7.2Z"
                            fill="#1877F2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="border rounded-md p-3 flex items-center justify-center bg-white hover:border-brand-light-gold cursor-pointer">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M16.5 3H7.5C4.5 3 3 4.5 3 7.5V16.5C3 19.5 4.5 21 7.5 21H16.5C19.5 21 21 19.5 21 16.5V7.5C21 4.5 19.5 3 16.5 3Z"
                            fill="url(#paint0_linear)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear"
                              x1="3"
                              y1="21"
                              x2="21"
                              y2="3"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FFDD55" />
                              <stop offset="0.5" stopColor="#FF543E" />
                              <stop offset="1" stopColor="#C837AB" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName" className="text-brand-dark-grey">
                      Cardholder Name
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="cardName"
                        placeholder="John Smith"
                        className="pl-10 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-brand-light-grey"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-brand-dark-grey">
                      Card Number
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="pl-10 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <CreditCard className="h-5 w-5 text-brand-light-grey" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-brand-dark-grey">
                        Expiry Date
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          className="pl-10 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="h-5 w-5 text-brand-light-grey" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-brand-dark-grey">
                        CVV
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="pl-10 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-brand-light-grey" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-brand-dark-grey">Billing Address</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-brand-dark-grey">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        className="mt-1.5 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-brand-dark-grey">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        className="mt-1.5 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-brand-dark-grey">
                      Address
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="address"
                        className="pl-10 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-brand-light-grey" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="city" className="text-brand-dark-grey">
                        City
                      </Label>
                      <Input
                        id="city"
                        className="mt-1.5 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-brand-dark-grey">
                        State
                      </Label>
                      <Input
                        id="state"
                        className="mt-1.5 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-brand-dark-grey">
                        ZIP Code
                      </Label>
                      <Input
                        id="zip"
                        className="mt-1.5 bg-white border-brand-light-grey/30 focus:border-brand-light-gold focus:ring-brand-light-gold/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-brand-dark-grey">Quote {quote.id}</span>
                  <Link
                    href={`/quote/${quote.id}`}
                    className="text-sm text-brand-dark-gold hover:underline flex items-center"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-brand-light-grey">{quote.name}</span>
                    <span className="text-sm font-medium text-brand-dark-grey">${quote.total.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-brand-light-grey">Includes all parts, taxes, and shipping</div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-brand-dark-grey">Total</span>
                <span className="text-xl font-bold text-brand-dark-gold">${quote.total.toFixed(2)}</span>
              </div>

              <Button className="w-full h-11 bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">
                <Lock className="mr-2 h-5 w-5" />
                Complete Payment
              </Button>

              <div className="flex items-center justify-center space-x-4 pt-2">
                <svg className="h-8" viewBox="0 0 60 40" fill="none">
                  <rect width="60" height="40" rx="4" fill="#F7F7F7" />
                  <path d="M17.4 13.8H12.6V26.2H17.4V13.8Z" fill="#FF5F00" />
                  <path
                    d="M13.2 20C13.2 17.5 14.4 15.3 16.2 13.8C14.9 12.7 13.2 12 11.4 12C7.2 12 4 15.6 4 20C4 24.4 7.2 28 11.4 28C13.2 28 14.9 27.3 16.2 26.2C14.4 24.7 13.2 22.5 13.2 20Z"
                    fill="#EB001B"
                  />
                  <path
                    d="M26 20C26 24.4 22.8 28 18.6 28C16.8 28 15.1 27.3 13.8 26.2C15.6 24.7 16.8 22.5 16.8 20C16.8 17.5 15.6 15.3 13.8 13.8C15.1 12.7 16.8 12 18.6 12C22.8 12 26 15.6 26 20Z"
                    fill="#F79E1B"
                  />
                </svg>
                <svg className="h-8" viewBox="0 0 60 40" fill="none">
                  <rect width="60" height="40" rx="4" fill="#F7F7F7" />
                  <path d="M22.8 26.2H19.2L21.6 13.8H25.2L22.8 26.2Z" fill="#00579F" />
                  <path
                    d="M34.8 14.1C34 13.8 32.7 13.5 31.2 13.5C27.6 13.5 25 15.3 25 17.9C25 19.8 26.9 20.7 28.3 21.3C29.7 21.9 30.2 22.3 30.2 22.8C30.2 23.6 29.1 24 28.1 24C26.7 24 25.9 23.8 24.7 23.3L24.2 23.1L23.7 26.1C24.6 26.5 26.3 26.9 28 26.9C31.8 26.9 34.3 25.1 34.3 22.3C34.3 20.8 33.4 19.6 31.3 18.7C30 18.1 29.2 17.7 29.2 17.1C29.2 16.6 29.8 16.1 31.1 16.1C32.2 16.1 33 16.3 33.6 16.6L34 16.8L34.5 13.9L34.8 14.1Z"
                    fill="#00579F"
                  />
                  <path
                    d="M40.2 13.8C39.4 13.8 38.8 14 38.4 14.8L33 26.2H36.8L37.6 24H41.8L42.2 26.2H45.6L43 13.8H40.2ZM38.6 21.6C38.9 20.8 40 17.7 40 17.7C40 17.7 40.3 16.9 40.5 16.4L40.7 17.6C40.7 17.6 41.4 20.8 41.5 21.6H38.6Z"
                    fill="#00579F"
                  />
                  <path
                    d="M18 13.8L14.4 22.3L14.1 21.1C13.4 19 11.4 16.7 9.2 15.5L12.6 26.2H16.4L22.4 13.8H18Z"
                    fill="#00579F"
                  />
                  <path
                    d="M11.4 13.8H5.4L5.2 14.1C9.8 15.2 12.8 17.9 14 21.1L12.8 14.9C12.6 14 12.1 13.8 11.4 13.8Z"
                    fill="#FAA61A"
                  />
                </svg>
                <svg className="h-8" viewBox="0 0 60 40" fill="none">
                  <rect width="60" height="40" rx="4" fill="#F7F7F7" />
                  <path
                    d="M30 12C25.6 12 22 15.6 22 20C22 24.4 25.6 28 30 28C34.4 28 38 24.4 38 20C38 15.6 34.4 12 30 12ZM30 25.6C26.9 25.6 24.4 23.1 24.4 20C24.4 16.9 26.9 14.4 30 14.4C33.1 14.4 35.6 16.9 35.6 20C35.6 23.1 33.1 25.6 30 25.6Z"
                    fill="#3C4043"
                  />
                  <path
                    d="M30 15.6C27.6 15.6 25.6 17.6 25.6 20C25.6 22.4 27.6 24.4 30 24.4C32.4 24.4 34.4 22.4 34.4 20C34.4 17.6 32.4 15.6 30 15.6Z"
                    fill="#4285F4"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white rounded-lg border border-brand-light-grey/30 shadow-md p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-brand-dark-grey">Secure Transaction</h3>
                <p className="text-xs text-brand-light-grey mt-1">
                  Your payment information is encrypted and secure. We never store your full credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
