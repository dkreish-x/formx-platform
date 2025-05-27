export interface AdminRFQStats {
  totalRfqs: number
  rfqsThisWeek: number
  needsReview: number
  needsReviewThisWeek: number
  approved: number
  approvedThisWeek: number
  avgResponseHours: number
  responseTimeTrend: number
}

export interface AdminRFQ {
  id: string
  partName: string
  customerName: string
  process: string
  submittedDate: string
  estimatedCost: number
  status: string
}

export interface AdminRFQData {
  stats: AdminRFQStats
  rfqs: AdminRFQ[]
  needsReviewCount: number
}

export interface AdminRFQDetails {
  id: string
  partName: string
  customerName: string
  process: string
  material: string
  finish: string
  quantity: number
  tolerance: string
  leadTime: string
  submittedDate: string
  status: string
  dimensions: {
    length: number
    width: number
    height: number
    volume: number
    weight: number
  }
  customerNotes: string | null
  internalNotes: Array<{
    id: string
    text: string
    author: string
    date: string
  }>
  customerInfo: {
    name: string
    email: string
    phone: string
    company: string
    customerSince: string
    totalOrders: number
    lifetimeValue: number
    lastOrderDate: string | null
    paymentStatus: string
  }
  files: Array<{
    name: string
    size: string
    uploadDate: string
  }>
  pricing: {
    materialCost: number
    laborCost: number
    setupCost: number
    finishingCost: number
    overheadCost: number
    margin: number
    discount: number
    totalCost: number
    suggestedPrice: number
    finalPrice: number
    isPriceOverridden: boolean
  }
}
