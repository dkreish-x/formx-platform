"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { checkPartnerAuth, getCurrentUser } from "@/actions/auth-actions"
import { ReferralForm } from "@/components/channel-partner/referral-form"
import { ReferralsTable } from "@/components/channel-partner/referrals-table"
import { PartnerProfile } from "@/components/channel-partner/partner-profile"
import { ProgramTerms } from "@/components/channel-partner/program-terms"
import { Loader2 } from "lucide-react"

export default function ChannelPartnerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const isPartner = await checkPartnerAuth()
        if (!isPartner) {
          router.push("/auth/login?error=unauthorized&tab=partner")
          return
        }

        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Authentication error:", error)
        router.push("/auth/login?error=session_expired&tab=partner")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading partner portal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Channel Partner Portal</h1>
        <p className="text-muted-foreground">Manage your referrals and track your commissions</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="submit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="submit">Submit Referral</TabsTrigger>
              <TabsTrigger value="history">Referral History</TabsTrigger>
            </TabsList>

            <TabsContent value="submit">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a New Referral</CardTitle>
                  <CardDescription>Refer a customer to Form(X) and earn commission on their orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReferralForm partnerCode={user?.partnerCode} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Your Referral History</CardTitle>
                  <CardDescription>Track the status and commissions for your referrals</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReferralsTable partnerCode={user?.partnerCode} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Partner Profile</CardTitle>
                <CardDescription>Your partner information and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <PartnerProfile user={user} />
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <ProgramTerms />

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Contact our partner support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Our dedicated partner support team is here to help you with any questions or issues.
                </p>
                <Button className="w-full">Contact Partner Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
