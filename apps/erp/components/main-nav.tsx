"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  type LucideIcon,
  Users,
  ClipboardList,
  Package,
  Settings,
  BarChart3,
  ShieldAlert,
  PenToolIcon as Tool,
  SprayCanIcon as Spray,
  FileCheck,
  FileSearch,
  Briefcase,
  Clipboard,
} from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "flex items-center text-lg font-semibold text-foreground mr-6",
                pathname === "/" && "text-primary",
              )}
            >
              Form(X)
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>CRM</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <NavItem href="/customers" icon={Users} title="Customers" description="Manage customer information" />
              <NavItem href="/leads" icon={Users} title="Leads" description="Track and manage leads" />
              <NavItem
                href="/opportunities"
                icon={Briefcase}
                title="Opportunities"
                description="Manage sales opportunities"
              />
              <NavItem href="/rfq" icon={FileSearch} title="RFQs" description="Request for quotes" />
              <NavItem href="/estimates" icon={FileCheck} title="Estimates" description="Manage estimates" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Production</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <NavItem href="/orders" icon={Package} title="Orders" description="Manage customer orders" />
              <NavItem
                href="/work-orders"
                icon={ClipboardList}
                title="Work Orders"
                description="Production work orders"
              />
              <NavItem
                href="/travelers"
                icon={Clipboard}
                title="Travelers"
                description="Digital manufacturing travelers"
              />
              <NavItem
                href="/production-planning"
                icon={BarChart3}
                title="Production Planning"
                description="Schedule production tasks"
              />
              <NavItem href="/finishing" icon={Spray} title="Finishing" description="Powdercoating and finishing" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <NavItem href="/inventory" icon={Package} title="Inventory" description="Manage inventory" />
              <NavItem href="/materials" icon={Package} title="Materials" description="Raw materials" />
              <NavItem href="/hardware" icon={Package} title="Hardware" description="Hardware components" />
              <NavItem href="/suppliers" icon={Users} title="Suppliers" description="Manage suppliers" />
              <NavItem
                href="/purchasing/orders"
                icon={ClipboardList}
                title="Purchase Orders"
                description="Manage purchase orders"
              />
              <NavItem href="/receiving" icon={Package} title="Receiving" description="Receive inventory" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Quality</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <NavItem
                href="/quality/non-conformance"
                icon={ShieldAlert}
                title="Non-Conformance"
                description="Track quality issues"
              />
              <NavItem
                href="/quality/corrective-actions"
                icon={ShieldAlert}
                title="Corrective Actions"
                description="Manage corrective actions"
              />
              <NavItem
                href="/quality/customer-complaints"
                icon={Users}
                title="Customer Complaints"
                description="Track customer complaints"
              />
              <NavItem
                href="/quality/calibration"
                icon={Tool}
                title="Calibration"
                description="Measurement tool calibration"
              />
              <NavItem href="/quality/training" icon={Users} title="Training" description="Employee training records" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Maintenance</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <NavItem href="/maintenance/equipment" icon={Tool} title="Equipment" description="Manage equipment" />
              <NavItem
                href="/maintenance/schedules"
                icon={ClipboardList}
                title="Schedules"
                description="Maintenance schedules"
              />
              <NavItem href="/maintenance/logs" icon={ClipboardList} title="Logs" description="Maintenance history" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Safety</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <NavItem
                href="/safety/inspections"
                icon={ShieldAlert}
                title="Inspections"
                description="Safety inspections"
              />
              <NavItem href="/safety/incidents" icon={ShieldAlert} title="Incidents" description="Safety incidents" />
              <NavItem href="/safety/training" icon={Users} title="Training" description="Safety training" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <NavItem href="/reports/sales" icon={BarChart3} title="Sales" description="Sales reports" />
              <NavItem
                href="/reports/production"
                icon={BarChart3}
                title="Production"
                description="Production metrics"
              />
              <NavItem href="/reports/quality" icon={BarChart3} title="Quality" description="Quality metrics" />
              <NavItem href="/reports/inventory" icon={BarChart3} title="Inventory" description="Inventory reports" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname.startsWith("/settings") && "text-primary",
              )}
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface NavItemProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
}

function NavItem({ href, icon: Icon, title, description }: NavItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex p-3 select-none space-y-1 rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
