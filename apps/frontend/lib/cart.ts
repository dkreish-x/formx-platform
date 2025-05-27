import type { CartItem } from "@/types/cart"

// This is a mock function that would be replaced with actual data fetching in a real app
export async function getCartItems(): Promise<CartItem[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return mock data
  return [
    {
      id: "part_1",
      partName: "Engine Bracket",
      process: "CNC",
      material: "aluminum",
      finish: "anodized",
      quantity: 2,
      tolerance: "Tight",
      leadTime: "Standard",
      price: 149.99,
    },
    {
      id: "part_2",
      partName: "Control Panel",
      process: "Laser Cutting",
      material: "stainless_steel",
      finish: "deburred",
      quantity: 5,
      tolerance: "Standard",
      leadTime: "Expedited",
      price: 87.5,
    },
    {
      id: "part_3",
      partName: "Prototype Housing",
      process: "3D Printing",
      material: "abs",
      finish: "as_printed",
      quantity: 1,
      tolerance: "Standard",
      leadTime: "Rush",
      price: 65.25,
    },
  ]
}
