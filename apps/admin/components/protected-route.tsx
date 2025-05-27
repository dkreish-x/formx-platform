"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Lock } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth()
  const pathname = usePathname()

  // Don't protect the login page
  if (pathname === "/login") {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8dcaa]/20 flex items-center justify-center">
        <Card className="w-full max-w-md bg-[#fefefe] shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4c273] to-[#d4c273] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Building2 className="h-8 w-8 text-[#fefefe]" />
            </div>
            <div className="w-8 h-8 border-2 border-[#d4c273]/30 border-t-[#d4c273] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#525253] font-medium">Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null // AuthProvider will handle redirect
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8dcaa]/20 flex items-center justify-center">
        <Card className="w-full max-w-md bg-[#fefefe] shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-[#525253] mb-2">Access Denied</h2>
            <p className="text-[#908d8d]">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
