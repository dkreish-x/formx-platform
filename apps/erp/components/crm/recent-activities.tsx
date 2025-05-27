"use client"

import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Mail, Phone, Calendar, FileText, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "email",
    title: "Email Sent",
    description: "Quote for machining project sent to John at Acme Industries",
    timestamp: "Today, 10:30 AM",
    entity: { type: "customer", id: "CUST-001", name: "Acme Industries" },
    user: "Jane Doe",
  },
  {
    id: 2,
    type: "call",
    title: "Call Logged",
    description: "Discussed project requirements with Sarah from TechPro Industries",
    timestamp: "Today, 9:15 AM",
    entity: { type: "customer", id: "CUST-002", name: "TechPro Industries" },
    user: "Mike Wilson",
  },
  {
    id: 3,
    type: "note",
    title: "Note Added",
    description: "Customer requested earlier delivery timeline for their order",
    timestamp: "Yesterday, 4:45 PM",
    entity: { type: "order", id: "ORD-2023-042", name: "Order #ORD-2023-042" },
    user: "Jane Doe",
  },
  {
    id: 4,
    type: "meeting",
    title: "Meeting Scheduled",
    description: "On-site visit scheduled with Precision Engineering",
    timestamp: "Yesterday, 2:30 PM",
    entity: { type: "customer", id: "CUST-004", name: "Precision Engineering" },
    user: "John Smith",
  },
  {
    id: 5,
    type: "new_lead",
    title: "New Lead Created",
    description: "Added Tech Dynamics as new lead from website contact form",
    timestamp: "May 8, 11:20 AM",
    entity: { type: "lead", id: "LEAD-002", name: "Tech Dynamics" },
    user: "System",
  },
]

export function RecentActivities() {
  const getIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "meeting":
        return <Calendar className="h-4 w-4" />
      case "note":
        return <MessageSquare className="h-4 w-4" />
      case "task":
        return <Clock className="h-4 w-4" />
      case "new_customer":
        return <Users className="h-4 w-4" />
      case "new_lead":
        return <UserPlus className="h-4 w-4" />
      case "opportunity":
        return <FileText className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getEntityLink = (entity: { type: string; id: string; name: string }) => {
    switch (entity.type) {
      case "customer":
        return `/customers/${entity.id}`
      case "lead":
        return `/leads/${entity.id}`
      case "opportunity":
        return `/opportunities/${entity.id}`
      case "order":
        return `/orders/${entity.id}`
      default:
        return "#"
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "call":
        return "bg-green-100 text-green-800 border-green-200"
      case "meeting":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "note":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "task":
        return "bg-slate-100 text-slate-800 border-slate-200"
      case "new_customer":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "new_lead":
        return "bg-red-100 text-red-800 border-red-200"
      case "opportunity":
        return "bg-teal-100 text-teal-800 border-teal-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                {getIcon(activity.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.title}</span>
                  <Badge variant="outline" className={getActivityColor(activity.type)}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1).replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-sm mt-1">{activity.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Link href={getEntityLink(activity.entity)} className="text-sm text-primary hover:underline">
                    {activity.entity.name}
                  </Link>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">By {activity.user}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
