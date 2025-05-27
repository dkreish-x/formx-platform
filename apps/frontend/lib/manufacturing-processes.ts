// Manufacturing processes configuration with visual styling considerations

export type MaterialOption = {
  id: string
  name: string
  description?: string
  priceMultiplier: number
  minThickness?: number
  maxThickness?: number
  availableFinishes?: string[]
  color?: string // For visual representation
  notes?: string
}

export type FinishOption = {
  id: string
  name: string
  description?: string
  priceMultiplier: number
  leadTimeAdd?: number
  compatibleMaterials?: string[]
  color?: string // For visual representation
  notes?: string
}

export type ProcessOption = {
  id: string
  name: string
  description: string
  icon: string
  accentColor: string // For visual styling
  materials: MaterialOption[]
  finishes: FinishOption[]
  minQuantity: number
  maxQuantity: number
  basePrice: number
  acceptedFileTypes: string[]
  leadTimeRange: {
    min: number
    max: number
  }
  dimensionLimits?: {
    maxLength?: number
    maxWidth?: number
    maxHeight?: number
    maxDiameter?: number
    minDiameter?: number
    maxWeight?: number
  }
  additionalFields?: Array<{
    id: string
    name: string
    type: "select" | "number" | "text" | "checkbox"
    options?: Array<{ id: string; name: string; priceMultiplier?: number }>
    required: boolean
    default?: string | number | boolean
  }>
}

// Flat Laser Cutting
const flatLaserCutting: ProcessOption = {
  id: "flat-laser-cutting",
  name: "Flat Laser Cutting",
  description: "Precision cutting of flat sheet materials using a high-powered laser",
  icon: "laser",
  accentColor: "#E8A95C", // Gold accent
  materials: [
    {
      id: "mild-steel",
      name: "Mild Steel",
      description: "Economical and versatile",
      priceMultiplier: 1.0,
      minThickness: 0.5,
      maxThickness: 20,
      availableFinishes: ["as-cut", "deburred", "powder-coated", "painted"],
      color: "#7A8287",
    },
    {
      id: "stainless-steel",
      name: "Stainless Steel",
      description: "Corrosion resistant and durable",
      priceMultiplier: 1.8,
      minThickness: 0.5,
      maxThickness: 16,
      availableFinishes: ["as-cut", "deburred", "brushed", "polished"],
      color: "#C0C0C0",
    },
    {
      id: "aluminum",
      name: "Aluminum",
      description: "Lightweight and corrosion resistant",
      priceMultiplier: 1.5,
      minThickness: 0.5,
      maxThickness: 12,
      availableFinishes: ["as-cut", "deburred", "anodized", "powder-coated"],
      color: "#D6D6D6",
    },
    {
      id: "brass",
      name: "Brass",
      description: "Excellent for decorative applications",
      priceMultiplier: 2.2,
      minThickness: 0.5,
      maxThickness: 8,
      availableFinishes: ["as-cut", "deburred", "polished"],
      color: "#CFB53B",
    },
    {
      id: "copper",
      name: "Copper",
      description: "Excellent thermal and electrical conductivity",
      priceMultiplier: 2.5,
      minThickness: 0.5,
      maxThickness: 6,
      availableFinishes: ["as-cut", "deburred", "polished"],
      color: "#B87333",
    },
    {
      id: "acrylic",
      name: "Acrylic",
      description: "Clear or colored plastic with excellent optical properties",
      priceMultiplier: 1.2,
      minThickness: 1,
      maxThickness: 25,
      availableFinishes: ["as-cut", "flame-polished"],
      color: "#ADD8E6",
    },
  ],
  finishes: [
    {
      id: "as-cut",
      name: "As Cut",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "deburred",
      name: "Deburred",
      description: "Edges smoothed to remove burrs",
      priceMultiplier: 1.2,
      leadTimeAdd: 1,
    },
    {
      id: "powder-coated",
      name: "Powder Coated",
      description: "Durable colored finish",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["mild-steel", "aluminum"],
    },
    {
      id: "painted",
      name: "Painted",
      description: "Custom color application",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["mild-steel", "aluminum"],
    },
    {
      id: "brushed",
      name: "Brushed",
      description: "Brushed finish for a professional look",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["stainless-steel"],
    },
    {
      id: "polished",
      name: "Polished",
      description: "Mirror-like finish",
      priceMultiplier: 1.6,
      leadTimeAdd: 3,
      compatibleMaterials: ["stainless-steel", "brass", "copper"],
    },
    {
      id: "anodized",
      name: "Anodized",
      description: "Protective and decorative oxide layer",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum"],
    },
    {
      id: "flame-polished",
      name: "Flame Polished",
      description: "Edges polished using flame treatment",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["acrylic"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 1000,
  basePrice: 50,
  acceptedFileTypes: [".dxf", ".dwg", ".svg", ".ai", ".pdf"],
  leadTimeRange: {
    min: 3,
    max: 7,
  },
  dimensionLimits: {
    maxLength: 3000,
    maxWidth: 1500,
  },
  additionalFields: [
    {
      id: "thickness",
      name: "Material Thickness (mm)",
      type: "number",
      required: true,
    },
    {
      id: "sheet-size",
      name: "Sheet Size",
      type: "select",
      options: [
        { id: "custom", name: "Custom Dimensions" },
        { id: "4x8", name: "4' x 8' (1220mm x 2440mm)", priceMultiplier: 1.0 },
        { id: "5x10", name: "5' x 10' (1525mm x 3050mm)", priceMultiplier: 1.5 },
      ],
      required: true,
      default: "4x8",
    },
    {
      id: "kerf-compensation",
      name: "Kerf Compensation",
      type: "checkbox",
      required: false,
      default: true,
    },
    {
      id: "laser-power",
      name: "Laser Power",
      type: "select",
      options: [
        { id: "standard", name: "Standard (2kW)", priceMultiplier: 1.0 },
        { id: "high", name: "High Power (4kW)", priceMultiplier: 1.2 },
        { id: "ultra", name: "Ultra Power (6kW)", priceMultiplier: 1.4 },
      ],
      required: false,
      default: "standard",
    },
  ],
}

// Tube Laser Cutting
const tubeLaserCutting: ProcessOption = {
  id: "tube-laser-cutting",
  name: "Tube Laser Cutting",
  description: "Precision cutting of tubes and pipes using a high-powered laser",
  icon: "tube-laser",
  accentColor: "#D6A461", // Gold accent variant
  materials: [
    {
      id: "mild-steel-tube",
      name: "Mild Steel Tube",
      priceMultiplier: 1.0,
      minThickness: 0.5,
      maxThickness: 8,
      availableFinishes: ["as-cut", "deburred", "powder-coated", "painted"],
      color: "#7A8287",
    },
    {
      id: "stainless-steel-tube",
      name: "Stainless Steel Tube",
      priceMultiplier: 1.8,
      minThickness: 0.5,
      maxThickness: 6,
      availableFinishes: ["as-cut", "deburred", "brushed", "polished"],
      color: "#C0C0C0",
    },
    {
      id: "aluminum-tube",
      name: "Aluminum Tube",
      priceMultiplier: 1.5,
      minThickness: 0.5,
      maxThickness: 5,
      availableFinishes: ["as-cut", "deburred", "anodized"],
      color: "#D6D6D6",
    },
  ],
  finishes: [
    {
      id: "as-cut",
      name: "As Cut",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "deburred",
      name: "Deburred",
      description: "Edges smoothed to remove burrs",
      priceMultiplier: 1.2,
      leadTimeAdd: 1,
    },
    {
      id: "powder-coated",
      name: "Powder Coated",
      description: "Durable colored finish",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["mild-steel-tube"],
    },
    {
      id: "painted",
      name: "Painted",
      description: "Custom color application",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["mild-steel-tube", "aluminum-tube"],
    },
    {
      id: "brushed",
      name: "Brushed",
      description: "Brushed finish for a professional look",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["stainless-steel-tube"],
    },
    {
      id: "polished",
      name: "Polished",
      description: "Mirror-like finish",
      priceMultiplier: 1.6,
      leadTimeAdd: 3,
      compatibleMaterials: ["stainless-steel-tube"],
    },
    {
      id: "anodized",
      name: "Anodized",
      description: "Protective and decorative oxide layer",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum-tube"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 500,
  basePrice: 75,
  acceptedFileTypes: [".dxf", ".dwg", ".step", ".stp", ".iges", ".igs", ".pdf"],
  leadTimeRange: {
    min: 4,
    max: 8,
  },
  dimensionLimits: {
    maxLength: 6000,
    maxDiameter: 200,
    minDiameter: 10,
  },
  additionalFields: [
    {
      id: "tube-diameter",
      name: "Tube Diameter (mm)",
      type: "number",
      required: true,
    },
    {
      id: "wall-thickness",
      name: "Wall Thickness (mm)",
      type: "number",
      required: true,
    },
    {
      id: "tube-shape",
      name: "Tube Shape",
      type: "select",
      options: [
        { id: "round", name: "Round", priceMultiplier: 1.0 },
        { id: "square", name: "Square", priceMultiplier: 1.1 },
        { id: "rectangular", name: "Rectangular", priceMultiplier: 1.2 },
        { id: "oval", name: "Oval", priceMultiplier: 1.3 },
      ],
      required: true,
      default: "round",
    },
    {
      id: "end-finishing",
      name: "End Finishing",
      type: "select",
      options: [
        { id: "as-cut", name: "As Cut", priceMultiplier: 1.0 },
        { id: "chamfered", name: "Chamfered", priceMultiplier: 1.2 },
        { id: "coped", name: "Coped", priceMultiplier: 1.3 },
      ],
      required: false,
      default: "as-cut",
    },
  ],
}

// CNC Routing
const cncRouting: ProcessOption = {
  id: "cnc-routing",
  name: "CNC Routing",
  description: "Computer-controlled cutting of flat sheet materials using a rotating cutter",
  icon: "router",
  accentColor: "#C99D66", // Gold accent variant
  materials: [
    {
      id: "plywood",
      name: "Plywood",
      priceMultiplier: 1.0,
      minThickness: 3,
      maxThickness: 25,
      availableFinishes: ["as-cut", "sanded", "sealed"],
      color: "#DEB887",
    },
    {
      id: "mdf",
      name: "MDF",
      description: "Medium Density Fiberboard",
      priceMultiplier: 0.9,
      minThickness: 3,
      maxThickness: 30,
      availableFinishes: ["as-cut", "sanded", "sealed", "painted"],
      color: "#A0522D",
    },
    {
      id: "acrylic-sheet",
      name: "Acrylic Sheet",
      priceMultiplier: 1.5,
      minThickness: 2,
      maxThickness: 25,
      availableFinishes: ["as-cut", "flame-polished"],
      color: "#ADD8E6",
    },
    {
      id: "abs",
      name: "ABS Plastic",
      priceMultiplier: 1.4,
      minThickness: 2,
      maxThickness: 20,
      availableFinishes: ["as-cut", "sanded"],
      color: "#FFFFFF",
    },
    {
      id: "aluminum-sheet",
      name: "Aluminum Sheet",
      priceMultiplier: 2.0,
      minThickness: 1,
      maxThickness: 15,
      availableFinishes: ["as-cut", "deburred", "anodized"],
      color: "#D6D6D6",
    },
    {
      id: "hdpe",
      name: "HDPE",
      description: "High-Density Polyethylene",
      priceMultiplier: 1.3,
      minThickness: 3,
      maxThickness: 30,
      availableFinishes: ["as-cut", "sanded"],
      color: "#F0F0F0",
    },
  ],
  finishes: [
    {
      id: "as-cut",
      name: "As Cut",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "sanded",
      name: "Sanded",
      description: "Smooth surface finish",
      priceMultiplier: 1.2,
      leadTimeAdd: 1,
    },
    {
      id: "sealed",
      name: "Sealed",
      description: "Protective clear coat",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["plywood", "mdf"],
    },
    {
      id: "painted",
      name: "Painted",
      description: "Custom color application",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["mdf"],
    },
    {
      id: "flame-polished",
      name: "Flame Polished",
      description: "Edges polished using flame treatment",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["acrylic-sheet"],
    },
    {
      id: "deburred",
      name: "Deburred",
      description: "Edges smoothed to remove burrs",
      priceMultiplier: 1.2,
      leadTimeAdd: 1,
      compatibleMaterials: ["aluminum-sheet"],
    },
    {
      id: "anodized",
      name: "Anodized",
      description: "Protective and decorative oxide layer",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum-sheet"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 500,
  basePrice: 60,
  acceptedFileTypes: [".dxf", ".dwg", ".svg", ".ai", ".pdf", ".step", ".stp"],
  leadTimeRange: {
    min: 3,
    max: 7,
  },
  dimensionLimits: {
    maxLength: 2500,
    maxWidth: 1250,
    maxHeight: 200,
  },
  additionalFields: [
    {
      id: "thickness",
      name: "Material Thickness (mm)",
      type: "number",
      required: true,
    },
    {
      id: "tool-diameter",
      name: "Tool Diameter (mm)",
      type: "select",
      options: [
        { id: "2mm", name: "2mm - Fine Detail", priceMultiplier: 1.3 },
        { id: "4mm", name: "4mm - Standard", priceMultiplier: 1.0 },
        { id: "6mm", name: "6mm - Fast Cutting", priceMultiplier: 0.9 },
      ],
      required: true,
      default: "4mm",
    },
    {
      id: "double-sided",
      name: "Double-Sided Machining",
      type: "checkbox",
      required: false,
      default: false,
    },
    {
      id: "cut-depth",
      name: "Cut Depth (mm)",
      type: "number",
      required: false,
    },
    {
      id: "pocket-depth",
      name: "Pocket Depth (mm)",
      type: "number",
      required: false,
    },
  ],
}

// CNC Milling
const cncMilling: ProcessOption = {
  id: "cnc-milling",
  name: "CNC Milling",
  description: "Precision machining of parts from solid blocks of material",
  icon: "mill",
  accentColor: "#E8B96C", // Gold accent variant
  materials: [
    {
      id: "aluminum-6061",
      name: "Aluminum 6061",
      description: "General purpose aluminum alloy",
      priceMultiplier: 1.0,
      availableFinishes: ["as-machined", "bead-blasted", "anodized", "polished"],
      color: "#D6D6D6",
    },
    {
      id: "aluminum-7075",
      name: "Aluminum 7075",
      description: "High-strength aerospace grade aluminum",
      priceMultiplier: 1.4,
      availableFinishes: ["as-machined", "bead-blasted", "anodized", "polished"],
      color: "#C8C8C8",
    },
    {
      id: "steel-1018",
      name: "Steel 1018",
      description: "Mild carbon steel",
      priceMultiplier: 1.2,
      availableFinishes: ["as-machined", "bead-blasted", "black-oxide", "zinc-plated"],
      color: "#7A8287",
    },
    {
      id: "stainless-303",
      name: "Stainless Steel 303",
      description: "Free-machining stainless steel",
      priceMultiplier: 1.8,
      availableFinishes: ["as-machined", "bead-blasted", "polished", "passivated"],
      color: "#C0C0C0",
    },
    {
      id: "stainless-304",
      name: "Stainless Steel 304",
      description: "General purpose stainless steel",
      priceMultiplier: 1.9,
      availableFinishes: ["as-machined", "bead-blasted", "polished", "passivated"],
      color: "#C0C0C0",
    },
    {
      id: "brass",
      name: "Brass",
      description: "Copper-zinc alloy",
      priceMultiplier: 1.6,
      availableFinishes: ["as-machined", "polished"],
      color: "#CFB53B",
    },
    {
      id: "copper",
      name: "Copper",
      description: "Pure copper",
      priceMultiplier: 2.0,
      availableFinishes: ["as-machined", "polished"],
      color: "#B87333",
    },
    {
      id: "titanium",
      name: "Titanium",
      description: "Grade 5 (Ti-6Al-4V)",
      priceMultiplier: 3.5,
      availableFinishes: ["as-machined", "bead-blasted"],
      color: "#878681",
    },
    {
      id: "delrin",
      name: "Delrin (Acetal)",
      description: "Engineering thermoplastic",
      priceMultiplier: 1.3,
      availableFinishes: ["as-machined"],
      color: "#FFFFFF",
    },
    {
      id: "nylon",
      name: "Nylon",
      description: "Tough engineering plastic",
      priceMultiplier: 1.4,
      availableFinishes: ["as-machined"],
      color: "#F5F5F5",
    },
  ],
  finishes: [
    {
      id: "as-machined",
      name: "As Machined",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "bead-blasted",
      name: "Bead Blasted",
      description: "Uniform matte finish",
      priceMultiplier: 1.2,
      leadTimeAdd: 1,
    },
    {
      id: "anodized",
      name: "Anodized",
      description: "Protective and decorative oxide layer",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum-6061", "aluminum-7075"],
    },
    {
      id: "polished",
      name: "Polished",
      description: "Mirror-like finish",
      priceMultiplier: 1.8,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum-6061", "aluminum-7075", "stainless-303", "stainless-304", "brass", "copper"],
    },
    {
      id: "black-oxide",
      name: "Black Oxide",
      description: "Black protective finish",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["steel-1018"],
    },
    {
      id: "zinc-plated",
      name: "Zinc Plated",
      description: "Corrosion resistant coating",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["steel-1018"],
    },
    {
      id: "passivated",
      name: "Passivated",
      description: "Chemical treatment to prevent corrosion",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["stainless-303", "stainless-304"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 200,
  basePrice: 100,
  acceptedFileTypes: [".step", ".stp", ".iges", ".igs", ".x_t", ".x_b", ".stl"],
  leadTimeRange: {
    min: 5,
    max: 10,
  },
  dimensionLimits: {
    maxLength: 500,
    maxWidth: 500,
    maxHeight: 300,
    maxWeight: 50,
  },
  additionalFields: [
    {
      id: "tolerance",
      name: "Tolerance",
      type: "select",
      options: [
        { id: "standard", name: 'Standard (±0.127mm / ±0.005")', priceMultiplier: 1.0 },
        { id: "precision", name: 'Precision (±0.05mm / ±0.002")', priceMultiplier: 1.5 },
        { id: "ultra-precision", name: 'Ultra Precision (±0.025mm / ±0.001")', priceMultiplier: 2.0 },
      ],
      required: true,
      default: "standard",
    },
    {
      id: "surface-finish",
      name: "Surface Finish",
      type: "select",
      options: [
        { id: "standard", name: "Standard", priceMultiplier: 1.0 },
        { id: "fine", name: "Fine", priceMultiplier: 1.3 },
      ],
      required: true,
      default: "standard",
    },
    {
      id: "thread-tapping",
      name: "Thread Tapping Required",
      type: "checkbox",
      required: false,
      default: false,
    },
    {
      id: "thread-size",
      name: "Thread Size",
      type: "select",
      options: [
        { id: "m3", name: "M3", priceMultiplier: 1.0 },
        { id: "m4", name: "M4", priceMultiplier: 1.0 },
        { id: "m5", name: "M5", priceMultiplier: 1.1 },
        { id: "m6", name: "M6", priceMultiplier: 1.1 },
        { id: "m8", name: "M8", priceMultiplier: 1.2 },
        { id: "m10", name: "M10", priceMultiplier: 1.3 },
        { id: "imperial", name: "Imperial (specify in notes)", priceMultiplier: 1.2 },
      ],
      required: false,
    },
    {
      id: "number-of-setups",
      name: "Number of Setups",
      type: "select",
      options: [
        { id: "1", name: "1 (3-axis machining)", priceMultiplier: 1.0 },
        { id: "2", name: "2 (multiple setups)", priceMultiplier: 1.5 },
        { id: "3plus", name: "3+ (complex geometry)", priceMultiplier: 2.0 },
      ],
      required: true,
      default: "1",
    },
  ],
}

// 3D Printing (SLA/SLS)
const threeDPrinting: ProcessOption = {
  id: "3d-printing",
  name: "3D Printing (SLA/SLS)",
  description: "Additive manufacturing for complex parts and prototypes",
  icon: "3d-printer",
  accentColor: "#D9B36C", // Gold accent variant
  materials: [
    {
      id: "sla-standard",
      name: "SLA Standard Resin",
      description: "General purpose photopolymer resin",
      priceMultiplier: 1.0,
      availableFinishes: ["as-printed", "sanded", "painted"],
      color: "#F5F5DC",
    },
    {
      id: "sla-tough",
      name: "SLA Tough Resin",
      description: "Durable, impact-resistant resin",
      priceMultiplier: 1.3,
      availableFinishes: ["as-printed", "sanded", "painted"],
      color: "#D3D3D3",
    },
    {
      id: "sla-flexible",
      name: "SLA Flexible Resin",
      description: "Rubber-like flexible material",
      priceMultiplier: 1.5,
      availableFinishes: ["as-printed"],
      color: "#A9A9A9",
    },
    {
      id: "sla-dental",
      name: "SLA Dental Resin",
      description: "Biocompatible resin for dental applications",
      priceMultiplier: 2.0,
      availableFinishes: ["as-printed", "polished"],
      color: "#FFFFF0",
    },
    {
      id: "sla-castable",
      name: "SLA Castable Resin",
      description: "For investment casting applications",
      priceMultiplier: 1.8,
      availableFinishes: ["as-printed"],
      color: "#8B0000",
    },
    {
      id: "sls-nylon",
      name: "SLS Nylon (PA12)",
      description: "Strong, flexible engineering plastic",
      priceMultiplier: 1.2,
      availableFinishes: ["as-printed", "dyed", "polished"],
      color: "#FFFFFF",
    },
    {
      id: "sls-nylon-glass",
      name: "SLS Glass-Filled Nylon",
      description: "Rigid nylon with glass fiber reinforcement",
      priceMultiplier: 1.4,
      availableFinishes: ["as-printed", "polished"],
      color: "#E6E6E6",
    },
    {
      id: "sls-tpu",
      name: "SLS TPU (Flexible)",
      description: "Rubber-like thermoplastic polyurethane",
      priceMultiplier: 1.6,
      availableFinishes: ["as-printed", "dyed"],
      color: "#D3D3D3",
    },
  ],
  finishes: [
    {
      id: "as-printed",
      name: "As Printed",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "sanded",
      name: "Sanded",
      description: "Smooth surface finish",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["sla-standard", "sla-tough"],
    },
    {
      id: "painted",
      name: "Painted",
      description: "Custom color application",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["sla-standard", "sla-tough"],
    },
    {
      id: "polished",
      name: "Polished",
      description: "Smooth, glossy finish",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["sla-dental", "sls-nylon", "sls-nylon-glass"],
    },
    {
      id: "dyed",
      name: "Dyed",
      description: "Color-infused finish",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["sls-nylon", "sls-tpu"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 100,
  basePrice: 80,
  acceptedFileTypes: [".stl", ".obj", ".3mf", ".step", ".stp"],
  leadTimeRange: {
    min: 3,
    max: 7,
  },
  dimensionLimits: {
    maxLength: 300,
    maxWidth: 300,
    maxHeight: 300,
  },
  additionalFields: [
    {
      id: "print-technology",
      name: "Print Technology",
      type: "select",
      options: [
        { id: "sla", name: "SLA (Stereolithography)", priceMultiplier: 1.0 },
        { id: "sls", name: "SLS (Selective Laser Sintering)", priceMultiplier: 1.2 },
      ],
      required: true,
      default: "sla",
    },
    {
      id: "layer-height",
      name: "Layer Height",
      type: "select",
      options: [
        { id: "high", name: "High Resolution (25-50 microns)", priceMultiplier: 1.5 },
        { id: "standard", name: "Standard Resolution (50-100 microns)", priceMultiplier: 1.0 },
        { id: "draft", name: "Draft Resolution (100-200 microns)", priceMultiplier: 0.8 },
      ],
      required: true,
      default: "standard",
    },
    {
      id: "infill",
      name: "Infill Percentage",
      type: "select",
      options: [
        { id: "hollow", name: "Hollow (0%)", priceMultiplier: 0.7 },
        { id: "light", name: "Light (20%)", priceMultiplier: 0.8 },
        { id: "standard", name: "Standard (50%)", priceMultiplier: 1.0 },
        { id: "dense", name: "Dense (80%)", priceMultiplier: 1.3 },
        { id: "solid", name: "Solid (100%)", priceMultiplier: 1.5 },
      ],
      required: true,
      default: "standard",
    },
    {
      id: "support-removal",
      name: "Support Removal",
      type: "select",
      options: [
        { id: "standard", name: "Standard", priceMultiplier: 1.0 },
        { id: "premium", name: "Premium (Minimal Marks)", priceMultiplier: 1.3 },
      ],
      required: false,
      default: "standard",
    },
    {
      id: "orientation-optimization",
      name: "Orientation Optimization",
      type: "checkbox",
      required: false,
      default: true,
    },
  ],
}

// FDM 3D Printing (New Process)
const fdmPrinting: ProcessOption = {
  id: "fdm-printing",
  name: "FDM 3D Printing",
  description: "Fused Deposition Modeling for functional parts and prototypes",
  icon: "3d-printer",
  accentColor: "#6CB9D9", // Blue accent
  materials: [
    {
      id: "pla",
      name: "PLA",
      description: "Biodegradable thermoplastic, easy to print with good detail",
      priceMultiplier: 1.0,
      availableFinishes: ["as-printed", "sanded", "painted"],
      color: "#FFFFFF",
    },
    {
      id: "pla-plus",
      name: "PLA+",
      description: "Enhanced PLA with improved strength and durability",
      priceMultiplier: 1.2,
      availableFinishes: ["as-printed", "sanded", "painted"],
      color: "#F0F0F0",
    },
    {
      id: "abs",
      name: "ABS",
      description: "Durable thermoplastic with good heat resistance",
      priceMultiplier: 1.3,
      availableFinishes: ["as-printed", "sanded", "painted", "acetone-smoothed"],
      color: "#ECECEC",
    },
    {
      id: "petg",
      name: "PETG",
      description: "Strong, chemical-resistant thermoplastic with good layer adhesion",
      priceMultiplier: 1.4,
      availableFinishes: ["as-printed", "sanded", "painted"],
      color: "#E0E0E0",
    },
    {
      id: "tpu-95a",
      name: "TPU 95A",
      description: "Flexible thermoplastic polyurethane with 95A shore hardness",
      priceMultiplier: 1.8,
      availableFinishes: ["as-printed"],
      color: "#D8D8D8",
    },
    {
      id: "nylon-fdm",
      name: "Nylon",
      description: "Strong, durable engineering plastic with excellent wear resistance",
      priceMultiplier: 1.9,
      availableFinishes: ["as-printed", "sanded"],
      color: "#F5F5F5",
    },
    {
      id: "pc",
      name: "Polycarbonate",
      description: "High-strength, heat-resistant engineering plastic",
      priceMultiplier: 2.0,
      availableFinishes: ["as-printed", "sanded"],
      color: "#FAFAFA",
    },
    {
      id: "carbon-fiber-pla",
      name: "Carbon Fiber PLA",
      description: "PLA reinforced with carbon fiber for increased rigidity",
      priceMultiplier: 1.7,
      availableFinishes: ["as-printed", "sanded"],
      color: "#1A1A1A",
    },
    {
      id: "carbon-fiber-petg",
      name: "Carbon Fiber PETG",
      description: "PETG reinforced with carbon fiber for increased strength and stiffness",
      priceMultiplier: 1.9,
      availableFinishes: ["as-printed", "sanded"],
      color: "#2A2A2A",
    },
    {
      id: "carbon-fiber-nylon",
      name: "Carbon Fiber Nylon",
      description: "Nylon reinforced with carbon fiber for exceptional strength and stiffness",
      priceMultiplier: 2.2,
      availableFinishes: ["as-printed", "sanded"],
      color: "#1E1E1E",
    },
    {
      id: "asa",
      name: "ASA",
      description: "UV-resistant alternative to ABS with good weather resistance",
      priceMultiplier: 1.6,
      availableFinishes: ["as-printed", "sanded", "painted"],
      color: "#F8F8F8",
    },
    {
      id: "pva",
      name: "PVA",
      description: "Water-soluble support material for complex geometries",
      priceMultiplier: 1.5,
      availableFinishes: ["as-printed"],
      color: "#FFFAF0",
    },
    {
      id: "hips",
      name: "HIPS",
      description: "Dissolvable support material compatible with ABS",
      priceMultiplier: 1.4,
      availableFinishes: ["as-printed"],
      color: "#FFFFF0",
    },
  ],
  finishes: [
    {
      id: "as-printed",
      name: "As Printed",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "sanded",
      name: "Sanded",
      description: "Smooth surface finish",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: [
        "pla",
        "pla-plus",
        "abs",
        "petg",
        "nylon-fdm",
        "pc",
        "carbon-fiber-pla",
        "carbon-fiber-petg",
        "carbon-fiber-nylon",
        "asa",
      ],
    },
    {
      id: "painted",
      name: "Painted",
      description: "Custom color application",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["pla", "pla-plus", "abs", "petg", "asa"],
    },
    {
      id: "acetone-smoothed",
      name: "Acetone Smoothed",
      description: "Chemical smoothing for a glossy finish",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["abs"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 100,
  basePrice: 60,
  acceptedFileTypes: [".stl", ".obj", ".3mf", ".step", ".stp"],
  leadTimeRange: {
    min: 2,
    max: 5,
  },
  dimensionLimits: {
    maxLength: 250,
    maxWidth: 250,
    maxHeight: 300,
  },
  additionalFields: [
    {
      id: "layer-height",
      name: "Layer Height",
      type: "select",
      options: [
        { id: "fine", name: "Fine (0.1mm)", priceMultiplier: 1.5 },
        { id: "standard", name: "Standard (0.2mm)", priceMultiplier: 1.0 },
        { id: "draft", name: "Draft (0.3mm)", priceMultiplier: 0.8 },
      ],
      required: true,
      default: "standard",
    },
    {
      id: "infill",
      name: "Infill Percentage",
      type: "select",
      options: [
        { id: "hollow", name: "Hollow (0%)", priceMultiplier: 0.7 },
        { id: "light", name: "Light (20%)", priceMultiplier: 0.8 },
        { id: "standard", name: "Standard (50%)", priceMultiplier: 1.0 },
        { id: "dense", name: "Dense (80%)", priceMultiplier: 1.3 },
        { id: "solid", name: "Solid (100%)", priceMultiplier: 1.5 },
      ],
      required: true,
      default: "standard",
    },
    {
      id: "infill-pattern",
      name: "Infill Pattern",
      type: "select",
      options: [
        { id: "grid", name: "Grid", priceMultiplier: 1.0 },
        { id: "triangular", name: "Triangular", priceMultiplier: 1.0 },
        { id: "honeycomb", name: "Honeycomb", priceMultiplier: 1.1 },
        { id: "gyroid", name: "Gyroid", priceMultiplier: 1.2 },
      ],
      required: false,
      default: "grid",
    },
    {
      id: "supports",
      name: "Support Structure",
      type: "select",
      options: [
        { id: "none", name: "None", priceMultiplier: 0.9 },
        { id: "minimal", name: "Minimal", priceMultiplier: 1.0 },
        { id: "standard", name: "Standard", priceMultiplier: 1.1 },
        { id: "extensive", name: "Extensive", priceMultiplier: 1.2 },
      ],
      required: true,
      default: "standard",
    },
    {
      id: "wall-thickness",
      name: "Wall Thickness",
      type: "select",
      options: [
        { id: "thin", name: "Thin (2 perimeters)", priceMultiplier: 0.9 },
        { id: "standard", name: "Standard (3 perimeters)", priceMultiplier: 1.0 },
        { id: "thick", name: "Thick (4 perimeters)", priceMultiplier: 1.1 },
        { id: "very-thick", name: "Very Thick (5+ perimeters)", priceMultiplier: 1.2 },
      ],
      required: false,
      default: "standard",
    },
  ],
}

// Welding
const welding: ProcessOption = {
  id: "welding",
  name: "Welding",
  description: "Joining metal parts through fusion",
  icon: "welding",
  accentColor: "#E8C07A", // Gold accent variant
  materials: [
    {
      id: "mild-steel-welding",
      name: "Mild Steel",
      priceMultiplier: 1.0,
      availableFinishes: ["as-welded", "ground", "painted", "powder-coated"],
      color: "#7A8287",
    },
    {
      id: "stainless-steel-welding",
      name: "Stainless Steel",
      priceMultiplier: 1.8,
      availableFinishes: ["as-welded", "ground", "polished", "passivated"],
      color: "#C0C0C0",
    },
    {
      id: "aluminum-welding",
      name: "Aluminum",
      priceMultiplier: 1.5,
      availableFinishes: ["as-welded", "ground", "anodized"],
      color: "#D6D6D6",
    },
  ],
  finishes: [
    {
      id: "as-welded",
      name: "As Welded",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "ground",
      name: "Ground",
      description: "Welds ground flush",
      priceMultiplier: 1.3,
      leadTimeAdd: 1,
    },
    {
      id: "painted",
      name: "Painted",
      description: "Custom color application",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["mild-steel-welding"],
    },
    {
      id: "powder-coated",
      name: "Powder Coated",
      description: "Durable colored finish",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["mild-steel-welding"],
    },
    {
      id: "polished",
      name: "Polished",
      description: "Mirror-like finish",
      priceMultiplier: 1.8,
      leadTimeAdd: 3,
      compatibleMaterials: ["stainless-steel-welding"],
    },
    {
      id: "passivated",
      name: "Passivated",
      description: "Chemical treatment to prevent corrosion",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["stainless-steel-welding"],
    },
    {
      id: "anodized",
      name: "Anodized",
      description: "Protective and decorative oxide layer",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum-welding"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 50,
  basePrice: 120,
  acceptedFileTypes: [".step", ".stp", ".iges", ".igs", ".pdf", ".dwg", ".dxf"],
  leadTimeRange: {
    min: 5,
    max: 10,
  },
  additionalFields: [
    {
      id: "welding-type",
      name: "Welding Type",
      type: "select",
      options: [
        { id: "mig", name: "MIG Welding", priceMultiplier: 1.0 },
        { id: "tig", name: "TIG Welding", priceMultiplier: 1.5 },
        { id: "stick", name: "Stick Welding", priceMultiplier: 0.9 },
      ],
      required: true,
      default: "mig",
    },
    {
      id: "weld-length",
      name: "Total Weld Length (mm)",
      type: "number",
      required: true,
    },
    {
      id: "assembly-required",
      name: "Assembly Required",
      type: "checkbox",
      required: false,
      default: false,
    },
    {
      id: "weld-finish",
      name: "Weld Finish",
      type: "select",
      options: [
        { id: "standard", name: "Standard", priceMultiplier: 1.0 },
        { id: "cosmetic", name: "Cosmetic (Appearance Critical)", priceMultiplier: 1.4 },
      ],
      required: false,
      default: "standard",
    },
    {
      id: "pressure-test",
      name: "Pressure Testing Required",
      type: "checkbox",
      required: false,
      default: false,
    },
  ],
}

// Sheet Metal Fabrication
const sheetMetalFabrication: ProcessOption = {
  id: "sheet-metal-fabrication",
  name: "Sheet Metal Fabrication",
  description: "Bending, forming, and fabricating sheet metal parts",
  icon: "sheet-metal",
  accentColor: "#D6B87A", // Gold accent variant
  materials: [
    {
      id: "mild-steel-sheet",
      name: "Mild Steel Sheet",
      priceMultiplier: 1.0,
      minThickness: 0.5,
      maxThickness: 6,
      availableFinishes: ["as-fabricated", "deburred", "painted", "powder-coated", "zinc-plated"],
      color: "#7A8287",
    },
    {
      id: "stainless-steel-sheet",
      name: "Stainless Steel Sheet",
      priceMultiplier: 1.8,
      minThickness: 0.5,
      maxThickness: 4,
      availableFinishes: ["as-fabricated", "deburred", "brushed", "polished", "passivated"],
      color: "#C0C0C0",
    },
    {
      id: "aluminum-sheet-fab",
      name: "Aluminum Sheet",
      priceMultiplier: 1.5,
      minThickness: 0.5,
      maxThickness: 5,
      availableFinishes: ["as-fabricated", "deburred", "anodized", "powder-coated"],
      color: "#D6D6D6",
    },
    {
      id: "galvanized-steel",
      name: "Galvanized Steel",
      priceMultiplier: 1.2,
      minThickness: 0.5,
      maxThickness: 3,
      availableFinishes: ["as-fabricated", "deburred", "painted"],
      color: "#C0C0C0",
    },
    {
      id: "copper-sheet",
      name: "Copper Sheet",
      priceMultiplier: 2.2,
      minThickness: 0.5,
      maxThickness: 3,
      availableFinishes: ["as-fabricated", "deburred", "polished"],
      color: "#B87333",
    },
    {
      id: "brass-sheet",
      name: "Brass Sheet",
      priceMultiplier: 2.0,
      minThickness: 0.5,
      maxThickness: 3,
      availableFinishes: ["as-fabricated", "deburred", "polished"],
      color: "#CFB53B",
    },
  ],
  finishes: [
    {
      id: "as-fabricated",
      name: "As Fabricated",
      description: "No additional finishing",
      priceMultiplier: 1.0,
    },
    {
      id: "deburred",
      name: "Deburred",
      description: "Edges smoothed to remove burrs",
      priceMultiplier: 1.2,
      leadTimeAdd: 1,
    },
    {
      id: "painted",
      name: "Painted",
      description: "Custom color application",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["mild-steel-sheet", "galvanized-steel"],
    },
    {
      id: "powder-coated",
      name: "Powder Coated",
      description: "Durable colored finish",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["mild-steel-sheet", "aluminum-sheet-fab"],
    },
    {
      id: "zinc-plated",
      name: "Zinc Plated",
      description: "Corrosion resistant coating",
      priceMultiplier: 1.4,
      leadTimeAdd: 2,
      compatibleMaterials: ["mild-steel-sheet"],
    },
    {
      id: "brushed",
      name: "Brushed",
      description: "Brushed finish for a professional look",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["stainless-steel-sheet"],
    },
    {
      id: "polished",
      name: "Polished",
      description: "Mirror-like finish",
      priceMultiplier: 1.8,
      leadTimeAdd: 3,
      compatibleMaterials: ["stainless-steel-sheet", "copper-sheet", "brass-sheet"],
    },
    {
      id: "passivated",
      name: "Passivated",
      description: "Chemical treatment to prevent corrosion",
      priceMultiplier: 1.3,
      leadTimeAdd: 2,
      compatibleMaterials: ["stainless-steel-sheet"],
    },
    {
      id: "anodized",
      name: "Anodized",
      description: "Protective and decorative oxide layer",
      priceMultiplier: 1.5,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum-sheet-fab"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 500,
  basePrice: 90,
  acceptedFileTypes: [".step", ".stp", ".iges", ".igs", ".dxf", ".dwg", ".pdf"],
  leadTimeRange: {
    min: 4,
    max: 8,
  },
  dimensionLimits: {
    maxLength: 2000,
    maxWidth: 1000,
  },
  additionalFields: [
    {
      id: "thickness",
      name: "Material Thickness (mm)",
      type: "number",
      required: true,
    },
    {
      id: "bend-count",
      name: "Number of Bends",
      type: "number",
      required: true,
    },
    {
      id: "hem-required",
      name: "Hem Required",
      type: "checkbox",
      required: false,
      default: false,
    },
    {
      id: "hardware-insertion",
      name: "Hardware Insertion",
      type: "checkbox",
      required: false,
      default: false,
    },
    {
      id: "bend-radius",
      name: "Bend Radius (mm)",
      type: "number",
      required: false,
    },
    {
      id: "grain-direction",
      name: "Grain Direction Important",
      type: "checkbox",
      required: false,
      default: false,
    },
  ],
}

// Coatings (Powder + Paint)
const coatings: ProcessOption = {
  id: "coatings",
  name: "Coatings (Powder + Paint)",
  description: "Professional finishing services for metal parts",
  icon: "coating",
  accentColor: "#E8B87A", // Gold accent variant
  materials: [
    {
      id: "mild-steel-coating",
      name: "Mild Steel",
      priceMultiplier: 1.0,
      availableFinishes: ["powder-coat", "wet-paint", "primer-paint", "zinc-plating"],
      color: "#7A8287",
    },
    {
      id: "stainless-steel-coating",
      name: "Stainless Steel",
      priceMultiplier: 1.2,
      availableFinishes: ["powder-coat", "wet-paint", "primer-paint"],
      color: "#C0C0C0",
    },
    {
      id: "aluminum-coating",
      name: "Aluminum",
      priceMultiplier: 1.1,
      availableFinishes: ["powder-coat", "wet-paint", "primer-paint", "anodizing"],
      color: "#D6D6D6",
    },
    {
      id: "zinc-coating",
      name: "Zinc",
      priceMultiplier: 1.3,
      availableFinishes: ["powder-coat", "wet-paint", "primer-paint"],
      color: "#D8D8D8",
    },
  ],
  finishes: [
    {
      id: "powder-coat",
      name: "Powder Coating",
      description: "Durable, high-quality finish",
      priceMultiplier: 1.0,
      leadTimeAdd: 2,
    },
    {
      id: "wet-paint",
      name: "Wet Paint",
      description: "Traditional paint application",
      priceMultiplier: 0.9,
      leadTimeAdd: 2,
    },
    {
      id: "primer-paint",
      name: "Primer + Paint",
      description: "Primer coat plus paint for better adhesion",
      priceMultiplier: 1.2,
      leadTimeAdd: 3,
    },
    {
      id: "zinc-plating",
      name: "Zinc Plating",
      description: "Corrosion resistant coating",
      priceMultiplier: 1.3,
      leadTimeAdd: 3,
      compatibleMaterials: ["mild-steel-coating"],
    },
    {
      id: "anodizing",
      name: "Anodizing",
      description: "Protective and decorative oxide layer",
      priceMultiplier: 1.4,
      leadTimeAdd: 3,
      compatibleMaterials: ["aluminum-coating"],
    },
  ],
  minQuantity: 1,
  maxQuantity: 1000,
  basePrice: 40,
  acceptedFileTypes: [".jpg", ".png", ".pdf", ".step", ".stp"],
  leadTimeRange: {
    min: 3,
    max: 7,
  },
  additionalFields: [
    {
      id: "color",
      name: "Color",
      type: "select",
      options: [
        { id: "black", name: "Black", priceMultiplier: 1.0 },
        { id: "white", name: "White", priceMultiplier: 1.0 },
        { id: "red", name: "Red", priceMultiplier: 1.0 },
        { id: "blue", name: "Blue", priceMultiplier: 1.0 },
        { id: "green", name: "Green", priceMultiplier: 1.0 },
        { id: "yellow", name: "Yellow", priceMultiplier: 1.0 },
        { id: "custom", name: "Custom (RAL/Pantone)", priceMultiplier: 1.3 },
      ],
      required: true,
      default: "black",
    },
    {
      id: "finish-type",
      name: "Finish Type",
      type: "select",
      options: [
        { id: "matte", name: "Matte", priceMultiplier: 1.0 },
        { id: "satin", name: "Satin", priceMultiplier: 1.1 },
        { id: "gloss", name: "Gloss", priceMultiplier: 1.2 },
        { id: "textured", name: "Textured", priceMultiplier: 1.3 },
      ],
      required: true,
      default: "matte",
    },
    {
      id: "custom-color-code",
      name: "Custom Color Code (RAL/Pantone)",
      type: "text",
      required: false,
    },
    {
      id: "masking-required",
      name: "Masking Required",
      type: "checkbox",
      required: false,
      default: false,
    },
    {
      id: "coating-thickness",
      name: "Coating Thickness (microns)",
      type: "select",
      options: [
        { id: "standard", name: "Standard (60-80 microns)", priceMultiplier: 1.0 },
        { id: "thick", name: "Thick (80-120 microns)", priceMultiplier: 1.2 },
        { id: "extra-thick", name: "Extra Thick (120+ microns)", priceMultiplier: 1.4 },
      ],
      required: false,
      default: "standard",
    },
  ],
}

// Export all processes
export const manufacturingProcesses: ProcessOption[] = [
  flatLaserCutting,
  tubeLaserCutting,
  cncRouting,
  cncMilling,
  threeDPrinting,
  fdmPrinting,
  welding,
  sheetMetalFabrication,
  coatings,
]

// Helper function to get a process by ID
export function getProcessById(id: string): ProcessOption | undefined {
  return manufacturingProcesses.find((process) => process.id === id)
}

// Helper function to get compatible finishes for a material
export function getCompatibleFinishes(processId: string, materialId: string): FinishOption[] {
  const process = getProcessById(processId)
  if (!process) return []

  const material = process.materials.find((m) => m.id === materialId)
  if (!material) return []

  return process.finishes.filter(
    (finish) => !finish.compatibleMaterials || finish.compatibleMaterials.includes(materialId),
  )
}

// Helper function to calculate base price for a process
export function calculateBasePrice(
  processId: string,
  materialId: string,
  finishId: string,
  quantity: number,
  additionalOptions: Record<string, any> = {},
): number {
  const process = getProcessById(processId)
  if (!process) return 0

  const material = process.materials.find((m) => m.id === materialId)
  if (!material) return 0

  const finish = process.finishes.find((f) => f.id === finishId)
  if (!finish) return 0

  // Start with base price
  let price = process.basePrice

  // Apply material multiplier
  price *= material.priceMultiplier

  // Apply finish multiplier
  price *= finish.priceMultiplier

  // Apply quantity discount (simplified)
  const quantityDiscount = quantity >= 100 ? 0.7 : quantity >= 50 ? 0.8 : quantity >= 20 ? 0.9 : 1.0
  price *= quantityDiscount

  // Apply additional options multipliers
  if (additionalOptions) {
    Object.entries(additionalOptions).forEach(([key, value]) => {
      const field = process.additionalFields?.find((f) => f.id === key)
      if (field && field.type === "select") {
        const option = field.options?.find((o) => o.id === value)
        if (option && option.priceMultiplier) {
          price *= option.priceMultiplier
        }
      }
    })
  }

  // Multiply by quantity
  price *= quantity

  // Add some randomness to make it look more realistic (±5%)
  const randomFactor = 0.95 + Math.random() * 0.1
  price *= randomFactor

  return Math.round(price * 100) / 100
}

// Helper function to estimate lead time for a process
export function estimateLeadTime(
  processId: string,
  finishId: string,
  quantity: number,
  additionalOptions: Record<string, any> = {},
): { min: number; max: number } {
  const process = getProcessById(processId)
  if (!process) return { min: 7, max: 14 }

  const finish = process.finishes.find((f) => f.id === finishId)

  // Start with base lead time
  let minLeadTime = process.leadTimeRange.min
  let maxLeadTime = process.leadTimeRange.max

  // Add finish lead time if applicable
  if (finish && finish.leadTimeAdd) {
    minLeadTime += finish.leadTimeAdd
    maxLeadTime += finish.leadTimeAdd
  }

  // Adjust for quantity (simplified)
  if (quantity > 50) {
    minLeadTime += 2
    maxLeadTime += 3
  } else if (quantity > 20) {
    minLeadTime += 1
    maxLeadTime += 2
  }

  // Adjust for expedited options if present in additionalOptions
  if (additionalOptions.leadTime === "Expedited") {
    minLeadTime = Math.max(minLeadTime - 2, 2)
    maxLeadTime = Math.max(maxLeadTime - 2, 4)
  } else if (additionalOptions.leadTime === "Rush") {
    minLeadTime = Math.max(minLeadTime - 3, 1)
    maxLeadTime = Math.max(maxLeadTime - 3, 3)
  }

  return { min: minLeadTime, max: maxLeadTime }
}
