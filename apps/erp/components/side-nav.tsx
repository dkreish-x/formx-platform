"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  UserCircle,
  Users,
  Target,
  FileSearch,
  FileCheck,
  BarChart,
  HeartHandshake,
  DollarSign,
  ShoppingCart,
  Receipt,
  CreditCard,
  FileText,
  Factory,
  ClipboardList,
  Calendar,
  Activity,
  SprayCanIcon as Spray,
  PenToolIcon as Tool,
  FolderKanban,
  Pencil,
  ListTree,
  History,
  Package,
  Wrench,
  BoxSelect,
  Warehouse,
  MoveHorizontal,
  ShoppingBag,
  TruckIcon,
  ShieldAlert,
  Microscope,
  AlertTriangle,
  ClipboardCheck,
  GraduationCap,
  Truck,
  PackageOpen,
  MapPin,
  User,
  Clock,
  Award,
  Wallet,
  BookOpen,
  ArrowDownRight,
  ArrowUpRight,
  LineChart,
  FileBarChart,
  Brain,
  Settings,
  UserCog,
  Plug,
  Palette,
  ChevronLeft,
  ChevronRight,
  Menu,
  TrendingUp,
  Share2,
  Clipboard,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: NavItem[]
}

// Update the navItems array to include all necessary modules for a comprehensive MES/ERP/CRM/QMS system

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "CRM",
    href: "/crm",
    icon: UserCircle,
    submenu: [
      { title: "Customers", href: "/customers", icon: Users },
      { title: "Leads", href: "/leads", icon: Users },
      { title: "Opportunities", href: "/opportunities", icon: Target },
      { title: "Meetings", href: "/crm/meetings", icon: Clock },
      { title: "Deals", href: "/crm/deals", icon: DollarSign },
      { title: "Calendar", href: "/crm/calendar-integration", icon: Calendar },
      { title: "Booking Page", href: "/crm/booking/settings", icon: Share2 },
      { title: "RFQs", href: "/rfq", icon: FileSearch },
      { title: "Estimates", href: "/estimates", icon: FileCheck },
      { title: "Marketing", href: "/marketing", icon: BarChart },
      { title: "Service", href: "/service", icon: HeartHandshake },
    ],
  },
  {
    title: "Sales",
    href: "/sales",
    icon: DollarSign,
    submenu: [
      { title: "Orders", href: "/orders", icon: ShoppingCart },
      // Add the Change Orders entry right after Orders
      { title: "Change Orders", href: "/orders/change-orders", icon: FileText },
      { title: "Invoices", href: "/invoices", icon: Receipt },
      { title: "Payments", href: "/payments", icon: CreditCard },
      { title: "Contracts", href: "/contracts", icon: FileText },
    ],
  },
  {
    title: "Production",
    href: "/production",
    icon: Factory,
    submenu: [
      { title: "Work Orders", href: "/work-orders", icon: ClipboardList },
      { title: "Travelers", href: "/travelers", icon: Clipboard },
      { title: "Scheduling", href: "/production/scheduling", icon: Calendar },
      { title: "Machine Monitoring", href: "/production/monitoring", icon: Activity },
      { title: "Finishing", href: "/production/finishing", icon: Spray },
      { title: "Work Instructions", href: "/production/instructions", icon: FileText },
      { title: "Capacity Planning", href: "/production/capacity", icon: BarChart },
      { title: "CAD/CAM", href: "/production/cad-cam", icon: Pencil },
      { title: "3D Printing", href: "/production/3d-printing", icon: Tool },
      { title: "Machine Setup", href: "/production/machine-setup", icon: Settings },
      { title: "Job Costing", href: "/production/job-costing", icon: DollarSign },
      { title: "Laser Cutting", href: "/production/laser-cutting", icon: Tool },
      { title: "CNC Machining", href: "/production/cnc-machining", icon: Tool },
      { title: "Sheet Metal", href: "/production/sheet-metal", icon: Tool },
      { title: "Nesting", href: "/production/nesting", icon: Tool },
    ],
  },
  {
    title: "Engineering",
    href: "/engineering",
    icon: Tool,
    submenu: [
      { title: "Projects", href: "/projects", icon: FolderKanban },
      { title: "CAD/CAM", href: "/engineering/cad-cam", icon: Pencil },
      { title: "BOM", href: "/inventory/bom", icon: ListTree },
      { title: "Revisions", href: "/engineering/revisions", icon: History },
    ],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    submenu: [
      { title: "Materials", href: "/inventory/materials", icon: Package },
      { title: "Hardware", href: "/inventory/hardware", icon: Wrench },
      { title: "Finished Goods", href: "/inventory/finished-goods", icon: BoxSelect },
      { title: "Warehousing", href: "/inventory/warehousing", icon: Warehouse },
      { title: "Transfers", href: "/inventory/transfers", icon: MoveHorizontal },
      { title: "BOM", href: "/inventory/bom", icon: ListTree },
      { title: "Suppliers", href: "/inventory/suppliers", icon: Users },
      // Removed duplicate purchase orders entry
    ],
  },
  {
    title: "Purchasing",
    href: "/purchasing",
    icon: ShoppingBag,
    submenu: [
      { title: "Purchase Orders", href: "/purchasing/orders", icon: ClipboardList },
      { title: "Suppliers", href: "/purchasing/suppliers", icon: Users },
      { title: "Receiving", href: "/purchasing/receiving", icon: TruckIcon },
      { title: "Supplier Performance", href: "/purchasing/performance", icon: BarChart },
    ],
  },
  {
    title: "Quality",
    href: "/quality",
    icon: ShieldAlert,
    submenu: [
      { title: "Inspections", href: "/quality/inspections", icon: Microscope },
      { title: "Non-Conformance", href: "/quality/non-conformance", icon: AlertTriangle },
      { title: "CAPA", href: "/quality/capa", icon: ClipboardCheck },
      { title: "Document Control", href: "/quality/documents", icon: FileText },
      { title: "Audits", href: "/quality/audits", icon: ClipboardList },
      { title: "Training", href: "/quality/training", icon: GraduationCap },
    ],
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
    submenu: [
      { title: "Equipment", href: "/maintenance/equipment", icon: Tool },
      { title: "Schedules", href: "/maintenance/schedules", icon: Calendar },
      { title: "Work Orders", href: "/maintenance/work-orders", icon: ClipboardList },
      { title: "Predictive", href: "/maintenance/predictive", icon: TrendingUp },
    ],
  },
  {
    title: "Shipping",
    href: "/shipping",
    icon: Truck,
    submenu: [
      { title: "Shipments", href: "/shipping/shipments", icon: PackageOpen },
      { title: "Carriers", href: "/shipping/carriers", icon: Truck },
      { title: "Tracking", href: "/shipping/tracking", icon: MapPin },
    ],
  },
  {
    title: "HR",
    href: "/hr",
    icon: Users,
    submenu: [
      { title: "Employees", href: "/hr/employees", icon: User },
      { title: "Time Tracking", href: "/hr/time-tracking", icon: Clock },
      { title: "Training", href: "/hr/training", icon: GraduationCap },
      { title: "Performance", href: "/hr/performance", icon: Award },
    ],
  },
  {
    title: "Finance",
    href: "/finance",
    icon: Wallet,
    submenu: [
      { title: "General Ledger", href: "/finance/general-ledger", icon: BookOpen },
      { title: "Accounts Payable", href: "/finance/accounts-payable", icon: ArrowDownRight },
      { title: "Accounts Receivable", href: "/finance/accounts-receivable", icon: ArrowUpRight },
      { title: "Financial Reports", href: "/finance/reports", icon: BarChart },
    ],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: LineChart,
    submenu: [
      { title: "Dashboards", href: "/analytics/dashboards", icon: LayoutDashboard },
      { title: "Reports", href: "/reports", icon: FileBarChart },
      { title: "KPIs", href: "/analytics/kpis", icon: Target },
      { title: "Business Intelligence", href: "/analytics/bi", icon: Brain },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    submenu: [
      { title: "General", href: "/settings", icon: Settings },
      { title: "Users & Permissions", href: "/settings/users", icon: UserCog },
      { title: "Integrations", href: "/settings/integrations", icon: Plug },
      { title: "Appearance", href: "/settings/appearance", icon: Palette },
    ],
  },
]

export function SideNav() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  const [expanded, setExpanded] = useState(true)

  // Initialize open groups based on current path and preserve existing open state
  useEffect(() => {
    // Load saved open groups from localStorage
    const savedOpenGroups = localStorage.getItem("sidebar-open-groups")
    const initialOpenGroups: Record<string, boolean> = savedOpenGroups ? JSON.parse(savedOpenGroups) : {}

    // Also open the group for the current path
    navItems.forEach((item) => {
      if (item.submenu && (pathname === item.href || pathname.startsWith(`${item.href}/`))) {
        initialOpenGroups[item.title] = true
      }
    })

    setOpenGroups(initialOpenGroups)
  }, []) // Only run on initial mount, not on pathname changes

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-expanded")
    if (savedState !== null) {
      setExpanded(savedState === "true")
    }
  }, [])

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => {
      const newState = {
        ...prev,
        [title]: !prev[title],
      }
      // Save to localStorage
      localStorage.setItem("sidebar-open-groups", JSON.stringify(newState))
      return newState
    })
  }

  const toggleSidebar = () => {
    const newState = !expanded
    setExpanded(newState)
    localStorage.setItem("sidebar-expanded", String(newState))
  }

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div
        className={`hidden md:flex h-screen ${
          expanded ? "w-64" : "w-16"
        } flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground">FX</span>
            </div>
            {expanded && <span className="gradient-heading">Form(X)</span>}
          </Link>
          <button onClick={toggleSidebar} className="text-muted-foreground hover:text-foreground transition-colors">
            {expanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <NavGroup
                key={item.title}
                item={item}
                pathname={pathname}
                isOpen={openGroups[item.title] || false}
                toggleGroup={() => toggleGroup(item.title)}
                expanded={expanded}
              />
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            {expanded && (
              <div className="text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function MobileNav() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground">FX</span>
          </div>
          <span className="gradient-heading">Form(X)</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <NavGroup
              key={item.title}
              item={item}
              pathname={pathname}
              isOpen={openGroups[item.title] || false}
              toggleGroup={() => toggleGroup(item.title)}
              expanded={true}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-sm">
            <p className="font-medium">John Doe</p>
            <p className="text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface NavGroupProps {
  item: NavItem
  pathname: string
  isOpen: boolean
  toggleGroup: () => void
  expanded?: boolean
}

function NavGroup({ item, pathname, isOpen, toggleGroup, expanded = true }: NavGroupProps) {
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
  const hasSubmenu = item.submenu && item.submenu.length > 0

  if (!hasSubmenu) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground",
        )}
        title={!expanded ? item.title : undefined}
      >
        <item.icon className="h-4 w-4" />
        {expanded && <span>{item.title}</span>}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={toggleGroup}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
        )}
        title={!expanded ? item.title : undefined}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          {expanded && <span>{item.title}</span>}
        </div>
        {expanded && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
      {expanded && isOpen && item.submenu && (
        <div className="mt-1 ml-4 pl-2 border-l">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === subItem.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <subItem.icon className="h-4 w-4" />
              <span>{subItem.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
