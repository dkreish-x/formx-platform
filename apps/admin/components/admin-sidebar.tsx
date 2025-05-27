"use client"

import {
  Package,
  Wrench,
  Palette,
  DollarSign,
  ToggleLeft,
  GitBranch,
  Building2,
  Route,
  LogOut,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "./auth-provider"

const navigationItems = [
  {
    title: "Materials",
    url: "/materials",
    icon: Package,
  },
  {
    title: "Processes",
    url: "/processes",
    icon: Wrench,
  },
  {
    title: "Routings",
    url: "/routings",
    icon: Route,
  },
  {
    title: "Finishes & Coatings",
    url: "/finishes",
    icon: Palette,
  },
  {
    title: "Margins & Pricing",
    url: "/margins",
    icon: DollarSign,
  },
  {
    title: "Feature Flags",
    url: "/features",
    icon: ToggleLeft,
  },
  {
    title: "Pricing Versions",
    url: "/versions",
    icon: GitBranch,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <Sidebar className="bg-[#fefefe] border-r border-[#908d8d] shadow-sm" collapsible="icon">
      <SidebarHeader className="border-b border-[#908d8d] bg-gradient-to-r from-[#e8dcaa] to-[#fefefe]">
        <div className="flex items-center gap-3 px-6 py-4 group-data-[collapsible=icon]:px-3 group-data-[collapsible=icon]:justify-center transition-all duration-200">
          <div className="w-10 h-10 bg-gradient-to-br from-[#d4c273] to-[#d4c273] rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden transition-all duration-200">
            <span className="font-bold text-lg text-[#525253]">Manufacturing</span>
            <p className="text-sm text-[#908d8d]">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4 group-data-[collapsible=icon]:p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-[#908d8d] uppercase tracking-wider mb-3 group-data-[collapsible=icon]:hidden">
            Configuration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="rounded-xl hover:bg-[#e8dcaa] data-[active=true]:bg-[#d4c273] data-[active=true]:text-[#fefefe] transition-all duration-200 group-data-[collapsible=icon]:justify-center"
                  >
                    <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          pathname === item.url ? "bg-[#fefefe] text-[#525253]" : "bg-[#e8dcaa] text-[#525253]"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium group-data-[collapsible=icon]:hidden transition-all duration-200">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-[#908d8d]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#e8dcaa]/30 group-data-[collapsible=icon]:justify-center">
            <div className="w-8 h-8 bg-[#d4c273] rounded-lg flex items-center justify-center">
              <User className="h-4 w-4 text-[#fefefe]" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden transition-all duration-200 flex-1">
              <p className="font-medium text-[#525253] text-sm">{user?.name}</p>
              <p className="text-xs text-[#908d8d]">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="w-6 h-6 rounded-md hover:bg-[#d4c273]/20 flex items-center justify-center transition-colors group-data-[collapsible=icon]:hidden"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-[#908d8d] hover:text-[#d4c273]" />
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
