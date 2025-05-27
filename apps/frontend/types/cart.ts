export interface CartItem {
  id: string
  partName: string
  process: string
  material: string
  finish: string
  quantity: number
  tolerance: string
  leadTime: string
  price: number
  fileUrl?: string
}
