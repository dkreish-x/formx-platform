import { cookies } from "next/headers"

// Mock user database
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@formx.com",
    password: "password123",
    company: "FormX Demo",
  },
]

// Mock partner database
const partners = [
  {
    id: "p1",
    name: "Partner Company",
    email: "partner@example.com",
    password: "partner123",
    partnerCode: "PARTNER001",
    company: "Partner Solutions Inc.",
    isActive: true,
  },
]

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")
  const userType = cookieStore.get("user_type")

  console.log("getCurrentUser - Auth token:", authToken?.value)
  console.log("getCurrentUser - User type:", userType?.value)

  if (!authToken?.value || !userType?.value) {
    console.log("getCurrentUser - No auth token or user type")
    return null
  }

  if (userType.value === "partner") {
    const partner = partners.find((p) => p.id === authToken.value)
    if (partner) {
      console.log("getCurrentUser - Found partner:", partner.name)
      return {
        id: partner.id,
        name: partner.name,
        email: partner.email,
        company: partner.company,
        type: "partner" as const,
        partnerCode: partner.partnerCode,
      }
    }
  } else {
    const user = users.find((u) => u.id === authToken.value)
    if (user) {
      console.log("getCurrentUser - Found user:", user.name)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        type: "user" as const,
      }
    }
  }

  console.log("getCurrentUser - No user found")
  return null
}
