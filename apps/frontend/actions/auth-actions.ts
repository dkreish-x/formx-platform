"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const callbackUrl = formData.get("callbackUrl") as string

  console.log("Login attempt - Callback URL:", callbackUrl)

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }

  // Set cookies
  const cookieStore = await cookies()
  cookieStore.set("auth_token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  cookieStore.set("user_type", "user", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  // Determine redirect URL
  let redirectTo = "/dashboard"

  if (callbackUrl && callbackUrl.trim() !== "") {
    redirectTo = callbackUrl
    console.log("Redirecting to callback URL:", redirectTo)
  } else {
    console.log("No callback URL, redirecting to dashboard")
  }

  redirect(redirectTo)
}

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const company = formData.get("company") as string
  const password = formData.get("password") as string
  const callbackUrl = formData.get("callbackUrl") as string

  // Check if user already exists
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (existingUser) {
    return {
      success: false,
      message: "User with this email already exists",
    }
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
    company: company || "",
  }

  users.push(newUser)

  // Set cookies
  const cookieStore = await cookies()
  cookieStore.set("auth_token", newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  cookieStore.set("user_type", "user", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  // Redirect
  const redirectTo = callbackUrl || "/dashboard"
  redirect(redirectTo)
}

export async function loginPartner(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const partnerCode = formData.get("partnerCode") as string

  const partner = partners.find(
    (p) => p.email.toLowerCase() === email.toLowerCase() && p.password === password && p.partnerCode === partnerCode,
  )

  if (!partner) {
    return {
      success: false,
      message: "Invalid partner credentials or partner code",
    }
  }

  if (!partner.isActive) {
    return {
      success: false,
      message: "Your partner account is currently inactive. Please contact support.",
    }
  }

  // Set cookies
  const cookieStore = await cookies()
  cookieStore.set("auth_token", partner.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  cookieStore.set("user_type", "partner", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  // Partners always go to partner portal
  redirect("/channel-partner")
}

export async function logoutUser() {
  const cookieStore = await cookies()

  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  })

  cookieStore.set("user_type", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  })

  return { success: true }
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")
  const userType = cookieStore.get("user_type")

  if (!authToken?.value || !userType?.value) {
    return null
  }

  if (userType.value === "partner") {
    const partner = partners.find((p) => p.id === authToken.value)
    if (partner) {
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
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        type: "user" as const,
      }
    }
  }

  return null
}
