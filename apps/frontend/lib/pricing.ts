type PricingParams = {
  process: string
  material: string
  quantity: number
  tolerance: string
  leadTime: string
}

// Base prices by process and material
const basePrices = {
  CNC: {
    aluminum: 75,
    steel: 95,
    stainless_steel: 120,
    brass: 110,
    copper: 130,
    titanium: 200,
    plastic: 60,
  },
  "Laser Cutting": {
    mild_steel: 50,
    stainless_steel: 70,
    aluminum: 65,
    acrylic: 40,
    wood: 35,
  },
  "3D Printing": {
    pla: 30,
    abs: 35,
    petg: 40,
    nylon: 60,
    tpu: 55,
    resin: 70,
  },
  "Injection Molding": {
    abs: 500,
    polypropylene: 450,
    polyethylene: 400,
    polycarbonate: 550,
    nylon: 600,
    acetal: 580,
  },
}

// Multipliers for different options
const toleranceMultipliers = {
  Standard: 1.0,
  Tight: 1.5,
  Custom: 2.0,
}

const leadTimeMultipliers = {
  Standard: 1.0,
  Expedited: 1.3,
  Rush: 1.8,
}

// Quantity discount tiers
function getQuantityMultiplier(quantity: number): number {
  if (quantity >= 100) return 0.6
  if (quantity >= 50) return 0.7
  if (quantity >= 20) return 0.8
  if (quantity >= 10) return 0.9
  return 1.0
}

export function calculatePrice(params: PricingParams): number {
  const { process, material, quantity, tolerance, leadTime } = params

  // Get base price for the selected process and material
  const basePrice =
    basePrices[process as keyof typeof basePrices]?.[material as keyof (typeof basePrices)[keyof typeof basePrices]] ||
    100

  // Apply multipliers
  const toleranceMultiplier = toleranceMultipliers[tolerance as keyof typeof toleranceMultipliers]
  const leadTimeMultiplier = leadTimeMultipliers[leadTime as keyof typeof leadTimeMultipliers]
  const quantityMultiplier = getQuantityMultiplier(quantity)

  // Calculate total price
  let totalPrice = basePrice * toleranceMultiplier * leadTimeMultiplier * quantityMultiplier * quantity

  // Add some randomness to make it look more realistic
  totalPrice = totalPrice * (0.95 + Math.random() * 0.1)

  // Round to 2 decimal places
  return Math.round(totalPrice * 100) / 100
}
