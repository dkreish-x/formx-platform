export interface DashboardStats {
  activeRfqs: number
  rfqsThisMonth: number
  pendingQuotes: number
  quotesThisMonth: number
  activeOrders: number
  ordersThisMonth: number
  completedOrders: number
  completedThisMonth: number
}

export interface RFQ {
  id: string
  name: string
  date: string
  parts: number
  status: string
}

export interface Quote {
  id: string
  name: string
  date: string
  total: number
  status: string
}

export interface Order {
  id: string
  name: string
  date: string
  total: number
  status: string
}

export interface DashboardData {
  stats: DashboardStats
  rfqs: RFQ[]
  quotes: Quote[]
  orders: Order[]
}
