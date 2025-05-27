"use server"

import { cookies } from "next/headers"

// Mock user database
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@formx.com",
    password: "password123", // In a real app, this would be hashed
    company: "FormX Demo",
  },
]

// Mock partner database
const partners = [
  {
    id: "p1",
    name: "Partner Company",
    email: "partner@example.com",
    password: "partner123", // In a real app, this would be hashed
    partnerCode: "PARTNER001",
    company: "Partner Solutions Inc.",
    isActive: true,
    totalReferred: 125000,
    totalCommission: 12500,
  },
]

type LoginData = {
  email: string
  password: string
}

type PartnerLoginData = {
  email: string
  password: string
  partnerCode: string
}

type RegisterData = {
  name: string
  email: string
  company?: string
  password: string
}

export async function loginUser(data: LoginData) {
  // In a real app, this would check against a database and use proper password hashing
  const user = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password)

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }

  // Set a cookie to indicate the user is logged in
  const cookieStore = cookies()
  cookieStore.set("auth_token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company,
    },
  }
}

export async function loginPartner(data: PartnerLoginData) {
  // In a real app, this would check against a database and use proper password hashing
  const partner = partners.find(
    (p) =>
      p.email.toLowerCase() === data.email.toLowerCase() &&
      p.password === data.password &&
      p.partnerCode === data.partnerCode,
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

  // Set cookies to indicate the partner is logged in
  const cookieStore = cookies()
  cookieStore.set("auth_token", partner.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Set a partner-specific cookie to identify them as a partner
  cookieStore.set("partner_token", partner.partnerCode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    success: true,
    partner: {
      id: partner.id,
      name: partner.name,
      email: partner.email,
      company: partner.company,
      partnerCode: partner.partnerCode,
    },
  }
}

export async function registerUser(data: RegisterData) {
  // Check if user already exists
  const existingUser = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())

  if (existingUser) {
    return {
      success: false,
      message: "User with this email already exists",
    }
  }

  // In a real app, this would create a new user in the database
  const newUser = {
    id: (users.length + 1).toString(),
    name: data.name,
    email: data.email,
    password: data.password, // In a real app, this would be hashed
    company: data.company || "",
  }

  // Add user to our mock database
  users.push(newUser)

  // Set a cookie to indicate the user is logged in
  const cookieStore = cookies()
  cookieStore.set("auth_token", newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      company: newUser.company,
    },
  }
}

export async function logoutUser() {
  const cookieStore = cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("partner_token") // Also delete partner token if it exists

  return {
    success: true,
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies()
  const authToken = cookieStore.get("auth_token")

  if (!authToken) {
    return null
  }

  // Check if this is a partner
  const partnerToken = cookieStore.get("partner_token")
  if (partnerToken) {
    // In a real app, this would fetch the partner from the database
    const partner = partners.find((p) => p.id === authToken.value)

    if (!partner) {
      return null
    }

    return {
      id: partner.id,
      name: partner.name,
      email: partner.email,
      company: partner.company,
      isPartner: true,
      partnerCode: partner.partnerCode,
    }
  }

  // Regular user
  const user = users.find((u) => u.id === authToken.value)

  if (!user) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company,
    isPartner: false,
  }
}

export async function checkAuth() {
  const cookieStore = cookies()
  const authToken = cookieStore.get("auth_token")
  return !!authToken?.value
}

export async function checkPartnerAuth() {
  const cookieStore = cookies()
  const partnerToken = cookieStore.get("partner_token")
  return !!partnerToken?.value
}
