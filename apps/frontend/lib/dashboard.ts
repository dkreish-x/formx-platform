import type { DashboardData } from "@/types/dashboard"

// This is a mock function that would be replaced with actual data fetching in a real app
export async function getUserDashboardData(): Promise<DashboardData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return mock data
  return {
    stats: {
      activeRfqs: 5,
      rfqsThisMonth: 3,
      pendingQuotes: 2,
      quotesThisMonth: 2,
      activeOrders: 3,
      ordersThisMonth: 1,
      completedOrders: 12,
      completedThisMonth: 2,
    },
    rfqs: [
      {
        id: "RFQ-2023-001",
        name: "Prototype Enclosure",
        date: "May 15, 2023",
        parts: 3,
        status: "Draft",
      },
      {
        id: "RFQ-2023-002",
        name: "Control Panel Components",
        date: "May 18, 2023",
        parts: 5,
        status: "Submitted",
      },
      {
        id: "RFQ-2023-003",
        name: "Mounting Brackets",
        date: "May 20, 2023",
        parts: 2,
        status: "In Review",
      },
      {
        id: "RFQ-2023-004",
        name: "Custom Gears",
        date: "May 22, 2023",
        parts: 4,
        status: "Quoted",
      },
      {
        id: "RFQ-2023-005",
        name: "Sensor Housing",
        date: "May 25, 2023",
        parts: 1,
        status: "In Review",
      },
    ],
    quotes: [
      {
        id: "QUO-2023-001",
        name: "Aluminum Brackets",
        date: "May 10, 2023",
        total: 450.75,
        status: "Approved",
      },
      {
        id: "QUO-2023-002",
        name: "Steel Components",
        date: "May 12, 2023",
        total: 875.25,
        status: "In Production",
      },
      {
        id: "QUO-2023-003",
        name: "Acrylic Panels",
        date: "May 14, 2023",
        total: 320.5,
        status: "Shipped",
      },
      {
        id: "QUO-2023-004",
        name: "Custom Fasteners",
        date: "May 16, 2023",
        total: 195.0,
        status: "In Production",
      },
      {
        id: "QUO-2023-005",
        name: "Prototype Housing",
        date: "May 18, 2023",
        total: 560.25,
        status: "Approved",
      },
    ],
    orders: [
      {
        id: "ORD-2023-001",
        name: "Stainless Steel Brackets",
        date: "April 5, 2023",
        total: 350.0,
        status: "Completed",
      },
      {
        id: "ORD-2023-002",
        name: "Aluminum Enclosure",
        date: "April 12, 2023",
        total: 725.5,
        status: "Completed",
      },
      {
        id: "ORD-2023-003",
        name: "Custom Gears",
        date: "April 18, 2023",
        total: 890.25,
        status: "Completed",
      },
      {
        id: "ORD-2023-004",
        name: "Plastic Components",
        date: "April 25, 2023",
        total: 275.0,
        status: "Cancelled",
      },
      {
        id: "ORD-2023-005",
        name: "Mounting Hardware",
        date: "May 2, 2023",
        total: 150.75,
        status: "Completed",
      },
      {
        id: "ORD-2023-006",
        name: "Control Panel",
        date: "May 8, 2023",
        total: 425.0,
        status: "Completed",
      },
    ],
  }
}
