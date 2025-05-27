import type { AdminRFQData, AdminRFQDetails } from "@/types/admin"

// This is a mock function that would be replaced with actual data fetching in a real app
export async function getAdminRFQData(): Promise<AdminRFQData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return mock data
  const rfqs = [
    {
      id: "RFQ-2023-001",
      partName: "Engine Bracket",
      customerName: "John Smith",
      process: "CNC Machining",
      submittedDate: "May 15, 2023",
      estimatedCost: 149.99,
      status: "Needs Review",
    },
    {
      id: "RFQ-2023-002",
      partName: "Control Panel",
      customerName: "Sarah Johnson",
      process: "Laser Cutting",
      submittedDate: "May 18, 2023",
      estimatedCost: 87.5,
      status: "Approved",
    },
    {
      id: "RFQ-2023-003",
      partName: "Mounting Brackets",
      customerName: "Michael Chen",
      process: "CNC Machining",
      submittedDate: "May 20, 2023",
      estimatedCost: 120.25,
      status: "Needs Review",
    },
    {
      id: "RFQ-2023-004",
      partName: "Custom Gears",
      customerName: "Emily Davis",
      process: "CNC Machining",
      submittedDate: "May 22, 2023",
      estimatedCost: 210.75,
      status: "Draft",
    },
    {
      id: "RFQ-2023-005",
      partName: "Sensor Housing",
      customerName: "Robert Wilson",
      process: "3D Printing",
      submittedDate: "May 25, 2023",
      estimatedCost: 65.25,
      status: "Needs Review",
    },
    {
      id: "RFQ-2023-006",
      partName: "Prototype Enclosure",
      customerName: "Jennifer Lee",
      process: "3D Printing",
      submittedDate: "May 27, 2023",
      estimatedCost: 95.0,
      status: "Approved",
    },
    {
      id: "RFQ-2023-007",
      partName: "Aluminum Faceplate",
      customerName: "David Brown",
      process: "Laser Cutting",
      submittedDate: "May 29, 2023",
      estimatedCost: 55.5,
      status: "Needs Review",
    },
  ]

  const needsReviewCount = rfqs.filter((rfq) => rfq.status === "Needs Review").length

  return {
    stats: {
      totalRfqs: rfqs.length,
      rfqsThisWeek: 4,
      needsReview: needsReviewCount,
      needsReviewThisWeek: 3,
      approved: rfqs.filter((rfq) => rfq.status === "Approved").length,
      approvedThisWeek: 1,
      avgResponseHours: 6.5,
      responseTimeTrend: -12, // negative means faster
    },
    rfqs,
    needsReviewCount,
  }
}

// This is a mock function that would be replaced with actual data fetching in a real app
export async function getAdminRFQDetails(id: string): Promise<AdminRFQDetails> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return mock data
  return {
    id,
    partName: "Engine Bracket",
    customerName: "John Smith",
    process: "CNC Machining",
    material: "Aluminum 6061",
    finish: "Anodized",
    quantity: 5,
    tolerance: 'Tight (±0.001")',
    leadTime: "Standard (7-10 days)",
    submittedDate: "May 15, 2023",
    status: "Needs Review",
    dimensions: {
      length: 120,
      width: 80,
      height: 25,
      volume: 240,
      weight: 648,
    },
    customerNotes: "Need these parts for a prototype demonstration. Tight tolerance required for the mounting holes.",
    internalNotes: [
      {
        id: "note_1",
        text: "Customer has requested expedited delivery if possible. Consider offering a 10% discount on future orders if we can meet their timeline.",
        author: "Jane Doe",
        date: "May 16, 2023 10:30 AM",
      },
      {
        id: "note_2",
        text: "Material cost has increased by 5% since our last quote for this customer. We should adjust our pricing accordingly.",
        author: "Mike Johnson",
        date: "May 16, 2023 2:15 PM",
      },
    ],
    customerInfo: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      company: "Acme Engineering",
      customerSince: "January 10, 2022",
      totalOrders: 8,
      lifetimeValue: 4250.75,
      lastOrderDate: "April 22, 2023",
      paymentStatus: "Good Standing",
    },
    files: [
      {
        name: "engine_bracket_v2.step",
        size: "2.4 MB",
        uploadDate: "May 15, 2023",
      },
      {
        name: "assembly_drawing.pdf",
        size: "1.2 MB",
        uploadDate: "May 15, 2023",
      },
      {
        name: "mounting_specs.pdf",
        size: "0.8 MB",
        uploadDate: "May 15, 2023",
      },
    ],
    pricing: {
      materialCost: 45.25,
      laborCost: 60.0,
      setupCost: 25.0,
      finishingCost: 15.0,
      overheadCost: 10.0,
      margin: 30,
      discount: 0,
      totalCost: 155.25,
      suggestedPrice: 201.83,
      finalPrice: 201.83,
      isPriceOverridden: false,
    },
  }
}
