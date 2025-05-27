import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import QuoteClient from "./quote-client"

export default async function QuotePage() {
  const user = await getCurrentUser()

  // If not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login?callbackUrl=/quote")
  }

  // If user is a partner, redirect to partner portal
  if (user.type === "partner") {
    redirect("/channel-partner")
  }

  // User is authenticated and is a regular user
  return <QuoteClient user={user} />
}
