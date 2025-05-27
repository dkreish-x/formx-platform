"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logoutUser } from "@/actions/auth-actions"
import { User, LogOut, Settings, FileText, ShoppingCart, ChevronDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type UserData = {
  id: string
  name: string
  email: string
  company?: string
  isPartner?: boolean
}

export function AuthStatus() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
        const authTokenCookie = cookies.find((cookie) => cookie.startsWith("auth_token="))
        const partnerTokenCookie = cookies.find((cookie) => cookie.startsWith("partner_token="))

        console.log("AuthStatus - Checking cookies:", {
          authTokenCookie: !!authTokenCookie,
          partnerTokenCookie: !!partnerTokenCookie,
        })

        if (authTokenCookie && authTokenCookie.split("=")[1]) {
          const isPartner = !!(partnerTokenCookie && partnerTokenCookie.split("=")[1])

          if (isPartner) {
            setUser({
              id: "partner-1",
              name: "Channel Partner",
              email: "partner@example.com",
              company: "Partner Company",
              isPartner: true,
            })
          } else {
            setUser({
              id: "user-1",
              name: "Demo User",
              email: "demo@formx.com",
              company: "FormX Demo",
              isPartner: false,
            })
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    setDropdownOpen(false)

    try {
      // Clear user state immediately
      setUser(null)

      // Call server action to clear cookies (returns success/error, doesn't redirect)
      await logoutUser()

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })

      // Navigate to home page
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error logging out:", error)

      // Fallback: manually clear cookies and redirect
      document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "user_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

      toast({
        title: "Logged out",
        description: "You have been logged out.",
      })

      router.push("/")
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Avatar clicked! Current dropdown state:", dropdownOpen)
    setDropdownOpen(!dropdownOpen)
  }

  if (isLoading) {
    return <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/auth/login">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full hover:bg-gray-100 focus:bg-gray-100"
        onClick={handleAvatarClick}
        type="button"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
          <AvatarFallback className="bg-blue-600 text-white text-sm">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="h-3 w-3 absolute -bottom-1 -right-1 bg-white rounded-full border" />
      </Button>

      {/* Custom Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info */}
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            {user.isPartner && <p className="text-xs text-blue-600 font-medium">Channel Partner</p>}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {user.isPartner ? (
              <Link
                href="/channel-partner"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Partner Portal
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            )}

            <Link
              href="/cart"
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
            </Link>

            {!user.isPartner && (
              <>
                <Link
                  href="/orders"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Orders
                </Link>
                <Link
                  href="/quote"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Get Quote
                </Link>
              </>
            )}

            <Link
              href="/dashboard/settings"
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
