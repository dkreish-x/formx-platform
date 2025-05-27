"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutUser } from "@/actions/auth-actions"
import { User, LogOut, Settings, FileText, ShoppingCart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type UserData = {
  id: string
  name: string
  email: string
  company?: string
}

export function AuthStatus() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if auth_token cookie exists
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
        const authTokenCookie = cookies.find((cookie) => cookie.startsWith("auth_token="))

        if (authTokenCookie) {
          // In a real app with an API, we would fetch user data
          // For this demo, we'll use mock data instead of making a fetch request
          setUser({
            id: "1",
            name: "Demo User",
            email: "demo@formx.com",
            company: "FormX Demo",
          })
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

  const handleLogout = async () => {
    try {
      await logoutUser()
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      setUser(null)
      router.push("/")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
      console.error("Error logging out:", error)
    }
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
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="User menu">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/cart" className="flex items-center cursor-pointer">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Cart</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/orders" className="flex items-center cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
