"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing auth token on mount
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        // Invalid user data, clear storage
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      }
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (!isLoading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - replace with real API call
      if (email === "admin@manufacturing.com" && password === "admin123") {
        const userData: User = {
          id: "1",
          email,
          name: "Admin User",
          role: "admin",
          permissions: ["materials", "processes", "routings", "finishes", "margins", "features", "versions"],
        }

        localStorage.setItem("auth_token", "mock_token_123")
        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
    router.push("/login")
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || user?.role === "admin" || false
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
