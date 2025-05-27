import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Quote Submitted | Form(X)",
  description: "Your manufacturing quote request has been submitted successfully",
}

export default function QuoteConfirmationPage() {
  return (
    <main className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="border-brand-dark-gold">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-brand-dark-gold" />
            </div>
            <CardTitle className="text-3xl">Quote Request Submitted</CardTitle>
            <CardDescription className="text-lg">
              Thank you for submitting your manufacturing quote request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-brand-light-gold/10 border border-brand-light-gold/30 rounded-md p-4">
              <h3 className="font-medium text-brand-dark-grey mb-2">What happens next?</h3>
              <ol className="list-decimal list-inside space-y-2 text-brand-light-grey">
                <li>Our team will review your quote request</li>
                <li>We'll analyze your parts for manufacturability</li>
                <li>You'll receive a detailed quote within 24 hours</li>
                <li>Once approved, we'll begin production</li>
              </ol>
            </div>

            <div className="text-center text-brand-light-grey">
              <p>Your quote reference number:</p>
              <p className="text-xl font-bold text-brand-dark-grey mt-1">
                QUO-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button asChild className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey">
              <Link href="/dashboard">
                View Your Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
