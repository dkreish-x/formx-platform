"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "./auth-provider"
import { User, Settings, LogOut, Shield } from "lucide-react"

export function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 bg-[#d4c273]">
            <AvatarFallback className="bg-[#d4c273] text-[#fefefe] font-medium">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#fefefe] border-[#908d8d]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-[#525253]">{user.name}</p>
            <p className="text-xs leading-none text-[#908d8d]">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#908d8d]" />
        <DropdownMenuItem className="hover:bg-[#e8dcaa]/50 text-[#525253]">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-[#e8dcaa]/50 text-[#525253]">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-[#e8dcaa]/50 text-[#525253]">
          <Shield className="mr-2 h-4 w-4" />
          <span>Permissions</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#908d8d]" />
        <DropdownMenuItem className="hover:bg-red-50 text-red-600 focus:bg-red-50 focus:text-red-600" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
