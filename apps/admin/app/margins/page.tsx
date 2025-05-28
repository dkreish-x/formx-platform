"use client"

import { DialogTitle } from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, Edit, Route, DollarSign, Settings, Search, Filter, Wrench, AlertCircle, Plus, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface VolumeBreak {
  id: string
  minQuantity: number
  maxQuantity: number | null
  discountPercent: number
}

interface TierMultiplier {
  economy: number
  standard: number
  rush: number
}

interface RoutingPricing {
  routingId: string
  routingName: string
  category: string
  baseCost: number
  materialMarkup: number
  finishingCost: number
  leadTime: number
  // Tier-specific overrides
  tierOverrides: {
    economy?: {
      multiplier?: number
      materialMarkupOverride?: number
      finishingCostOverride?: number
      leadTimeOverride?: number
    }
    standard?: {
      multiplier?: number
      materialMarkupOverride?: number
      finishingCostOverride?: number
      leadTimeOverride?: number
    }
    rush?: {
      multiplier?: number
      materialMarkupOverride?: number
      finishingCostOverride?: number
      leadTimeOverride?: number
    }
  }
}

interface PricingConfiguration {
  routings: RoutingPricing[]
  globalSettings: {
    defaultTierMultipliers: TierMultiplier
    volumeBreaks: VolumeBreak[]
    minimumOrderValue: number
  }
}

// Mock routing data
const mockRoutings: RoutingPricing[] = [
  {
    routingId: "1",
    routingName: "Laser Cutting - Deburring - Press Brake Bending - TIG Welding",
    category: "Sheet Metal",
    baseCost: 185.5,
    materialMarkup: 35,
    finishingCost: 0.15,
    leadTime: 5,
    tierOverrides: {
      rush: {
        multiplier: 1.6, // Higher than default 1.5x for complex welding
        leadTimeOverride: 3,
      },
    },
  },
  {
    routingId: "2",
    routingName: "CNC Milling - Deburring - Anodizing",
    category: "Machining",
    baseCost: 245.75,
    materialMarkup: 40,
    finishingCost: 0.25,
    leadTime: 7,
    tierOverrides: {
      economy: {
        materialMarkupOverride: 35, // Reduced markup for economy
      },
      rush: {
        materialMarkupOverride: 45, // Premium materials for rush
        leadTimeOverride: 4,
      },
    },
  },
  {
    routingId: "4",
    routingName: "CNC Milling",
    category: "Machining",
    baseCost: 135.0,
    materialMarkup: 35,
    finishingCost: 0,
    leadTime: 3,
    tierOverrides: {},
  },
  {
    routingId: "5",
    routingName: "Laser Cutting",
    category: "Cutting",
    baseCost: 45.25,
    materialMarkup: 30,
    finishingCost: 0,
    leadTime: 2,
    tierOverrides: {
      economy: {
        multiplier: 0.85, // Even lower for simple cutting
      },
    },
  },
]

// Add mock process data after the mockRoutings array
const mockProcesses = [
  { id: "1", name: "Laser Cutting", category: "Primary", hourlyRate: 95, setupTime: 15 },
  { id: "2", name: "CNC Milling", category: "Primary", hourlyRate: 85, setupTime: 30 },
  { id: "3", name: "CNC Turning", category: "Primary", hourlyRate: 75, setupTime: 20 },
  { id: "4", name: "Press Brake Bending", category: "Primary", hourlyRate: 65, setupTime: 10 },
  { id: "7", name: "TIG Welding", category: "Secondary", hourlyRate: 90, setupTime: 25 },
  { id: "8", name: "MIG Welding", category: "Secondary", hourlyRate: 80, setupTime: 20 },
  { id: "9", name: "Deburring", category: "Secondary", hourlyRate: 45, setupTime: 5 },
  { id: "14", name: "Anodizing", category: "Finishing", hourlyRate: 70, setupTime: 25 },
  { id: "13", name: "Powder Coating", category: "Finishing", hourlyRate: 65, setupTime: 20 },
]

const defaultVolumeBreaks: VolumeBreak[] = [
  { id: "1", minQuantity: 1, maxQuantity: 9, discountPercent: 0 },
  { id: "2", minQuantity: 10, maxQuantity: 49, discountPercent: 5 },
  { id: "3", minQuantity: 50, maxQuantity: 99, discountPercent: 10 },
  { id: "4", minQuantity: 100, maxQuantity: null, discountPercent: 15 },
]

export default function MarginsPage() {
  const [config, setConfig] = useState<PricingConfiguration>({
    routings: mockRoutings,
    globalSettings: {
      defaultTierMultipliers: {
        economy: 0.9,
        standard: 1.0,
        rush: 1.5,
      },
      volumeBreaks: defaultVolumeBreaks,
      minimumOrderValue: 50,
    },
  })

  const [editingRouting, setEditingRouting] = useState<RoutingPricing | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([])
  const [isProcessPricingOpen, setIsProcessPricingOpen] = useState(false)
  const [selectedProcess, setSelectedProcess] = useState<any>(null)

  // Helper functions - moved to top to avoid initialization errors
  const getProcessesInRouting = (routingName: string) => {
    return routingName.split(" - ").map((name) => name.trim())
  }

  const getRoutingsByProcess = (processName: string) => {
    return config.routings.filter((routing) => getProcessesInRouting(routing.routingName).includes(processName))
  }

  // Now define the other variables that depend on these functions
  const categories = [...new Set(config.routings.map((r) => r.category))]
  const allProcesses = [...new Set(config.routings.flatMap((r) => getProcessesInRouting(r.routingName)))]

  const handleSave = () => {
    console.log("Saving routing-based pricing configuration:", config)
  }

  const updateRoutingOverride = (
    routingId: string,
    tier: "economy" | "standard" | "rush",
    field: string,
    value: any,
  ) => {
    setConfig({
      ...config,
      routings: config.routings.map((routing) => {
        if (routing.routingId === routingId) {
          return {
            ...routing,
            tierOverrides: {
              ...routing.tierOverrides,
              [tier]: {
                ...routing.tierOverrides[tier],
                [field]: value,
              },
            },
          }
        }
        return routing
      }),
    })
  }

  const clearRoutingOverride = (routingId: string, tier: "economy" | "standard" | "rush", field: string) => {
    setConfig({
      ...config,
      routings: config.routings.map((routing) => {
        if (routing.routingId === routingId) {
          const newOverrides = { ...routing.tierOverrides }
          if (newOverrides[tier]) {
            delete newOverrides[tier][field as keyof (typeof newOverrides)[tier]]
            if (Object.keys(newOverrides[tier]).length === 0) {
              delete newOverrides[tier]
            }
          }
          return {
            ...routing,
            tierOverrides: newOverrides,
          }
        }
        return routing
      }),
    })
  }

  const calculatePrice = (routing: RoutingPricing, tier: "economy" | "standard" | "rush", quantity = 1) => {
    const tierOverride = routing.tierOverrides[tier]
    const defaultMultiplier = config.globalSettings.defaultTierMultipliers[tier]

    // Get effective values
    const multiplier = tierOverride?.multiplier ?? defaultMultiplier
    const materialMarkup = tierOverride?.materialMarkupOverride ?? routing.materialMarkup
    const finishingCost = tierOverride?.finishingCostOverride ?? routing.finishingCost

    // Calculate costs
    const processingCost = routing.baseCost * multiplier
    const materialCost = 100 * (1 + materialMarkup / 100) // Assuming $100 material
    const finishingCostTotal = finishingCost * 100 // Assuming 100 sq in

    // Apply volume discounts
    const applicableBreak = config.globalSettings.volumeBreaks.find(
      (vb) => quantity >= vb.minQuantity && (vb.maxQuantity === null || quantity <= vb.maxQuantity),
    )
    const discount = applicableBreak?.discountPercent || 0

    const subtotal = processingCost + materialCost + finishingCostTotal
    const finalPrice = subtotal * (1 - discount / 100)

    return {
      processingCost,
      materialCost,
      finishingCost: finishingCostTotal,
      subtotal,
      discount,
      finalPrice,
      effectiveMultiplier: multiplier,
      effectiveMaterialMarkup: materialMarkup,
      effectiveFinishingCost: finishingCost,
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "economy":
        return "text-green-600 bg-green-50 border-green-200"
      case "standard":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "rush":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-slate-600 bg-slate-50 border-slate-200"
    }
  }

  const updateProcessPricing = (processName: string, newHourlyRate: number) => {
    // This would update the process in the processes system
    // and recalculate all routing costs that use this process
    console.log(`Updating ${processName} hourly rate to $${newHourlyRate}`)

    // Update routing base costs (simplified calculation)
    setConfig({
      ...config,
      routings: config.routings.map((routing) => {
        const processes = getProcessesInRouting(routing.routingName)
        if (processes.includes(processName)) {
          // Simplified: add $10 to base cost for every $5 increase in hourly rate
          const process = mockProcesses.find((p) => p.name === processName)
          if (process) {
            const rateDiff = newHourlyRate - process.hourlyRate
            const costAdjustment = (rateDiff / 5) * 10
            return {
              ...routing,
              baseCost: Math.max(routing.baseCost + costAdjustment, 0),
            }
          }
        }
        return routing
      }),
    })

    // Update the mock process data
    const processIndex = mockProcesses.findIndex((p) => p.name === processName)
    if (processIndex !== -1) {
      mockProcesses[processIndex].hourlyRate = newHourlyRate
    }
  }

  const addVolumeBreak = () => {
    const lastBreak = config.globalSettings.volumeBreaks[config.globalSettings.volumeBreaks.length - 1]
    const newMinQuantity = lastBreak.maxQuantity ? lastBreak.maxQuantity + 1 : 100

    const newBreak = {
      id: Date.now().toString(),
      minQuantity: newMinQuantity,
      maxQuantity: null,
      discountPercent: lastBreak.discountPercent + 5,
    }

    setConfig({
      ...config,
      globalSettings: {
        ...config.globalSettings,
        volumeBreaks: [...config.globalSettings.volumeBreaks, newBreak],
      },
    })
  }

  const removeVolumeBreak = (id: string) => {
    setConfig({
      ...config,
      globalSettings: {
        ...config.globalSettings,
        volumeBreaks: config.globalSettings.volumeBreaks.filter((vb) => vb.id !== id),
      },
    })
  }

  const filteredRoutings = config.routings.filter((routing) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      routing.routingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getProcessesInRouting(routing.routingName).some((process) =>
        process.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(routing.category)

    // Process filter
    const matchesProcess =
      selectedProcesses.length === 0 ||
      selectedProcesses.some((process) => getProcessesInRouting(routing.routingName).includes(process))

    return matchesSearch && matchesCategory && matchesProcess
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <SidebarTrigger className="bg-white border border-slate-200 hover:bg-slate-50 rounded-xl p-2 shadow-sm" />
            <div className="flex items-center justify-between w-full">
              <div className="space-y-1">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">Routing-Based Pricing</h1>
                <p className="text-lg text-slate-600">Configure pricing multipliers and overrides for each routing</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleSave}
                  className="h-10 px-4 bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe] shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4c273] rounded-lg flex items-center justify-center">
                  <Route className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Routings</p>
                  <p className="text-xl font-bold text-slate-900">{config.routings.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4c273] rounded-lg flex items-center justify-center">
                  <Route className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Unique Categories</p>
                  <p className="text-xl font-bold text-slate-900">{categories.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4c273] rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Custom Overrides</p>
                  <p className="text-xl font-bold text-slate-900">
                    {config.routings.reduce((sum, r) => sum + Object.keys(r.tierOverrides).length, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4c273] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Min Order</p>
                  <p className="text-xl font-bold text-slate-900">${config.globalSettings.minimumOrderValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Global Tier Multipliers */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#e8dcaa]/30 to-[#fefefe] border-b border-[#908d8d] pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#d4c273] rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Pricing Tier Multipliers</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">
                    Configure global multipliers for each pricing tier
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-green-700">Economy Tier Multiplier</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={config.globalSettings.defaultTierMultipliers.economy}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        globalSettings: {
                          ...config.globalSettings,
                          defaultTierMultipliers: {
                            ...config.globalSettings.defaultTierMultipliers,
                            economy: Number(e.target.value),
                          },
                        },
                      })
                    }
                    className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                  />
                  <p className="text-xs text-green-600">Competitive pricing for longer lead times</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-blue-700">Standard Tier Multiplier</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={config.globalSettings.defaultTierMultipliers.standard}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        globalSettings: {
                          ...config.globalSettings,
                          defaultTierMultipliers: {
                            ...config.globalSettings.defaultTierMultipliers,
                            standard: Number(e.target.value),
                          },
                        },
                      })
                    }
                    className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                  />
                  <p className="text-xs text-blue-600">Baseline pricing for normal delivery</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-red-700">Rush Tier Multiplier</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={config.globalSettings.defaultTierMultipliers.rush}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        globalSettings: {
                          ...config.globalSettings,
                          defaultTierMultipliers: {
                            ...config.globalSettings.defaultTierMultipliers,
                            rush: Number(e.target.value),
                          },
                        },
                      })
                    }
                    className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                  />
                  <p className="text-xs text-red-600">Premium pricing for expedited delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volume Breaks - Scales of Economy */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#e8dcaa]/30 to-[#fefefe] border-b border-[#908d8d] pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#d4c273] rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Volume Breaks</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">
                    Configure quantity-based discounts (Scales of Economy)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="overflow-hidden border border-[#908d8d] rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-[#908d8d]">
                        <TableHead className="w-1/4">Min Quantity</TableHead>
                        <TableHead className="w-1/4">Max Quantity</TableHead>
                        <TableHead className="w-1/4">Discount %</TableHead>
                        <TableHead className="w-1/4 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {config.globalSettings.volumeBreaks.map((breakPoint, index) => (
                        <TableRow key={breakPoint.id} className="hover:bg-[#e8dcaa]/20 transition-colors">
                          <TableCell>
                            <Input
                              type="number"
                              value={breakPoint.minQuantity}
                              onChange={(e) => {
                                const newBreaks = [...config.globalSettings.volumeBreaks]
                                newBreaks[index].minQuantity = Number(e.target.value)
                                setConfig({
                                  ...config,
                                  globalSettings: {
                                    ...config.globalSettings,
                                    volumeBreaks: newBreaks,
                                  },
                                })
                              }}
                              className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={breakPoint.maxQuantity || ""}
                              placeholder="No limit"
                              onChange={(e) => {
                                const newBreaks = [...config.globalSettings.volumeBreaks]
                                newBreaks[index].maxQuantity = e.target.value ? Number(e.target.value) : null
                                setConfig({
                                  ...config,
                                  globalSettings: {
                                    ...config.globalSettings,
                                    volumeBreaks: newBreaks,
                                  },
                                })
                              }}
                              className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={breakPoint.discountPercent}
                              onChange={(e) => {
                                const newBreaks = [...config.globalSettings.volumeBreaks]
                                newBreaks[index].discountPercent = Number(e.target.value)
                                setConfig({
                                  ...config,
                                  globalSettings: {
                                    ...config.globalSettings,
                                    volumeBreaks: newBreaks,
                                  },
                                })
                              }}
                              className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeVolumeBreak(breakPoint.id)}
                              disabled={config.globalSettings.volumeBreaks.length <= 1}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button onClick={addVolumeBreak} className="bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Volume Break
                </Button>

                {/* Volume Break Preview */}
                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Volume Break Preview</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {config.globalSettings.volumeBreaks.map((breakPoint) => (
                      <div key={breakPoint.id} className="bg-white p-3 rounded-md border border-blue-100 text-center">
                        <p className="text-sm font-medium text-blue-800">
                          {breakPoint.minQuantity} - {breakPoint.maxQuantity || "∞"}
                        </p>
                        <p className="text-lg font-bold text-blue-900">{breakPoint.discountPercent}% off</p>
                        <p className="text-xs text-blue-600">
                          ${(100 * (1 - breakPoint.discountPercent / 100)).toFixed(2)} per $100
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#e8dcaa]/30 to-[#fefefe] border-b border-[#908d8d] pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4c273] rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Search & Filter</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">
                    Find specific routings by name, category, or process
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search routings or processes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#908d8d] hover:bg-[#e8dcaa]/50 text-[#525253]"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategories([])
                      setSelectedProcesses([])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-3">
                  {/* Category Filters */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Categories:</span>
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category))
                            }
                          }}
                          className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                        />
                        <span className="text-sm text-slate-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Process Filters */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-slate-600 mr-2">Processes:</span>
                  {allProcesses.slice(0, 8).map((process) => {
                    const routingCount = getRoutingsByProcess(process).length
                    const isSelected = selectedProcesses.includes(process)
                    return (
                      <Button
                        key={process}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className={`text-xs ${isSelected ? "bg-[#d4c273] text-white" : "hover:bg-[#e8dcaa]/50"}`}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedProcesses(selectedProcesses.filter((p) => p !== process))
                          } else {
                            setSelectedProcesses([...selectedProcesses, process])
                          }
                        }}
                      >
                        {process} ({routingCount})
                      </Button>
                    )
                  })}
                  {allProcesses.length > 8 && (
                    <span className="text-xs text-slate-500 self-center">+{allProcesses.length - 8} more</span>
                  )}
                </div>

                {/* Active Filters Summary */}
                {(searchTerm || selectedCategories.length > 0 || selectedProcesses.length > 0) && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <Filter className="h-4 w-4" />
                      <span className="font-medium">
                        Showing {filteredRoutings.length} of {config.routings.length} routings
                      </span>
                      {searchTerm && <span>• Search: "{searchTerm}"</span>}
                      {selectedCategories.length > 0 && <span>• Categories: {selectedCategories.join(", ")}</span>}
                      {selectedProcesses.length > 0 && <span>• Processes: {selectedProcesses.join(", ")}</span>}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Routing-Specific Pricing */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#e8dcaa]/30 to-[#fefefe] border-b border-[#908d8d] pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4c273] rounded-xl flex items-center justify-center">
                  <Route className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Routing Pricing Configuration</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">
                    Configure tier-specific overrides for each routing workflow
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredRoutings.map((routing) => (
                  <div
                    key={routing.routingId}
                    className="bg-gradient-to-br from-slate-50/50 to-white border border-slate-200 rounded-2xl p-6"
                  >
                    {/* Routing Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{routing.routingName}</h3>
                          <p className="text-sm text-slate-600">
                            {routing.category} • Base Cost: ${routing.baseCost} • {routing.materialMarkup}% markup •{" "}
                            {routing.leadTime} days
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const processes = getProcessesInRouting(routing.routingName)
                          if (processes.length === 1) {
                            const process = mockProcesses.find((p) => p.name === processes[0])
                            if (process) {
                              setSelectedProcess(process)
                              setIsProcessPricingOpen(true)
                            }
                          }
                        }}
                        className="hover:bg-purple-50 hover:text-purple-600"
                        disabled={getProcessesInRouting(routing.routingName).length > 1}
                        title={
                          getProcessesInRouting(routing.routingName).length > 1
                            ? "Multi-process routings require individual process updates"
                            : "Update base process pricing"
                        }
                      >
                        <Wrench className="h-4 w-4 mr-2" />
                        Update Process
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#908d8d] hover:bg-[#e8dcaa]/50 text-[#525253]"
                        onClick={() => {
                          setEditingRouting(routing)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>

                    {/* Tier Pricing Grid */}
                    <div className="grid grid-cols-3 gap-6">
                      {(["economy", "standard", "rush"] as const).map((tier) => {
                        const pricing = calculatePrice(routing, tier, 10)
                        const hasOverrides =
                          routing.tierOverrides[tier] && Object.keys(routing.tierOverrides[tier]).length > 0

                        return (
                          <div
                            key={tier}
                            className={`border-2 rounded-xl p-4 ${getTierColor(tier)} ${
                              hasOverrides ? "ring-2 ring-offset-2 ring-blue-200" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold capitalize">{tier}</h4>
                              {hasOverrides && (
                                <Badge variant="secondary" className="text-xs">
                                  Custom
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Multiplier:</span>
                                <span className="font-medium">
                                  {pricing.effectiveMultiplier}x
                                  {routing.tierOverrides[tier]?.multiplier && (
                                    <span className="text-blue-600 ml-1">*</span>
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Material Markup:</span>
                                <span className="font-medium">
                                  {pricing.effectiveMaterialMarkup}%
                                  {routing.tierOverrides[tier]?.materialMarkupOverride && (
                                    <span className="text-blue-600 ml-1">*</span>
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Finishing:</span>
                                <span className="font-medium">
                                  ${pricing.effectiveFinishingCost}/sq in
                                  {routing.tierOverrides[tier]?.finishingCostOverride && (
                                    <span className="text-blue-600 ml-1">*</span>
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Lead Time:</span>
                                <span className="font-medium">
                                  {routing.tierOverrides[tier]?.leadTimeOverride || routing.leadTime} days
                                  {routing.tierOverrides[tier]?.leadTimeOverride && (
                                    <span className="text-blue-600 ml-1">*</span>
                                  )}
                                </span>
                              </div>
                              <Separator className="my-2" />
                              <div className="flex justify-between font-bold">
                                <span>Total (qty 10):</span>
                                <span>${pricing.finalPrice.toFixed(0)}</span>
                              </div>
                              <div className="flex justify-between text-xs opacity-75">
                                <span>Per unit:</span>
                                <span>${(pricing.finalPrice / 10).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Override Indicators */}
                    {Object.keys(routing.tierOverrides).length > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Custom overrides active:</span>{" "}
                          {Object.entries(routing.tierOverrides)
                            .map(([tier, overrides]) => `${tier} (${Object.keys(overrides).length} overrides)`)
                            .join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Global Settings */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#e8dcaa]/30 to-[#fefefe] border-b border-[#908d8d] pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4c273] rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-[#fefefe]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Global Settings</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">
                    Settings applied across all routings and tiers
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="max-w-md space-y-2">
                <Label htmlFor="minimumOrder" className="text-sm font-medium text-slate-700">
                  Minimum Order Value ($)
                </Label>
                <Input
                  id="minimumOrder"
                  type="number"
                  value={config.globalSettings.minimumOrderValue}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      globalSettings: {
                        ...config.globalSettings,
                        minimumOrderValue: Number(e.target.value),
                      },
                    })
                  }
                  className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                />
                <p className="text-xs text-slate-500">Minimum total for any quote regardless of routing or tier</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Routing Configuration Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configure Tier Overrides: {editingRouting?.routingName}</DialogTitle>
              <DialogDescription>
                Set custom values for specific tiers. Leave blank to use routing defaults or global multipliers.
              </DialogDescription>
            </DialogHeader>

            {editingRouting && (
              <div className="space-y-6 py-4">
                {/* Routing Defaults */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Routing Defaults</h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Base Cost:</span>
                      <p className="font-medium">${editingRouting.baseCost}</p>
                    </div>

                    <div>
                      <span className="text-slate-600">Material Markup:</span>
                      <p className="font-medium">{editingRouting.materialMarkup}%</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Finishing Cost:</span>
                      <p className="font-medium">${editingRouting.finishingCost}/sq in</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Lead Time:</span>
                      <p className="font-medium">{editingRouting.leadTime} days</p>
                    </div>
                  </div>
                </div>

                {/* Tier Overrides */}
                <div className="grid grid-cols-3 gap-6">
                  {(["economy", "standard", "rush"] as const).map((tier) => (
                    <div key={tier} className={`border-2 rounded-xl p-4 ${getTierColor(tier)}`}>
                      <h4 className="font-semibold capitalize mb-4">{tier} Tier Overrides</h4>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs">Custom Multiplier</Label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder={`Default: ${config.globalSettings.defaultTierMultipliers[tier]}x`}
                            value={editingRouting.tierOverrides[tier]?.multiplier || ""}
                            onChange={(e) =>
                              updateRoutingOverride(
                                editingRouting.routingId,
                                tier,
                                "multiplier",
                                e.target.value ? Number(e.target.value) : undefined,
                              )
                            }
                            className="h-8 text-sm border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                          />
                        </div>

                        <div>
                          <Label className="text-xs">Material Markup (%)</Label>
                          <Input
                            type="number"
                            placeholder={`Default: ${editingRouting.materialMarkup}%`}
                            value={editingRouting.tierOverrides[tier]?.materialMarkupOverride || ""}
                            onChange={(e) =>
                              updateRoutingOverride(
                                editingRouting.routingId,
                                tier,
                                "materialMarkupOverride",
                                e.target.value ? Number(e.target.value) : undefined,
                              )
                            }
                            className="h-8 text-sm border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                          />
                        </div>

                        <div>
                          <Label className="text-xs">Finishing Cost ($/sq in)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder={`Default: $${editingRouting.finishingCost}`}
                            value={editingRouting.tierOverrides[tier]?.finishingCostOverride || ""}
                            onChange={(e) =>
                              updateRoutingOverride(
                                editingRouting.routingId,
                                tier,
                                "finishingCostOverride",
                                e.target.value ? Number(e.target.value) : undefined,
                              )
                            }
                            className="h-8 text-sm border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                          />
                        </div>

                        <div>
                          <Label className="text-xs">Lead Time (days)</Label>
                          <Input
                            type="number"
                            placeholder={`Default: ${editingRouting.leadTime} days`}
                            value={editingRouting.tierOverrides[tier]?.leadTimeOverride || ""}
                            onChange={(e) =>
                              updateRoutingOverride(
                                editingRouting.routingId,
                                tier,
                                "leadTimeOverride",
                                e.target.value ? Number(e.target.value) : undefined,
                              )
                            }
                            className="h-8 text-sm border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Preview */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Live Pricing Preview (Quantity: 10)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {(["economy", "standard", "rush"] as const).map((tier) => {
                      const pricing = calculatePrice(editingRouting, tier, 10)
                      return (
                        <div key={tier} className="text-center">
                          <p className="text-sm font-medium capitalize">{tier}</p>
                          <p className="text-lg font-bold">${pricing.finalPrice.toFixed(0)}</p>
                          <p className="text-xs text-slate-600">${(pricing.finalPrice / 10).toFixed(2)} per unit</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                className="border-[#908d8d] hover:bg-[#e8dcaa]/50 text-[#525253]"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Process Pricing Update Dialog */}
        <Dialog open={isProcessPricingOpen} onOpenChange={setIsProcessPricingOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Update Process Pricing: {selectedProcess?.name}
              </DialogTitle>
              <DialogDescription>
                Updating this process will affect all routings that use it. Changes will recalculate base costs
                automatically.
              </DialogDescription>
            </DialogHeader>

            {selectedProcess && (
              <div className="space-y-6 py-4">
                {/* Current Process Info */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Current Process Settings</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Category:</span>
                      <p className="font-medium">{selectedProcess.category}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Current Rate:</span>
                      <p className="font-medium">${selectedProcess.hourlyRate}/hr</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Setup Time:</span>
                      <p className="font-medium">{selectedProcess.setupTime} min</p>
                    </div>
                  </div>
                </div>

                {/* Update Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="newRate" className="text-sm font-medium text-slate-700">
                      New Hourly Rate ($)
                    </Label>
                    <Input
                      id="newRate"
                      type="number"
                      defaultValue={selectedProcess.hourlyRate}
                      className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                    />
                  </div>
                </div>

                {/* Impact Preview */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900 mb-2">Impact Analysis</h4>
                      <p className="text-sm text-orange-800 mb-3">
                        This process is used in {getRoutingsByProcess(selectedProcess.name).length} routing(s):
                      </p>
                      <div className="space-y-1">
                        {getRoutingsByProcess(selectedProcess.name).map((routing) => (
                          <div key={routing.routingId} className="text-sm text-orange-700">
                            • {routing.routingName} (Current base cost: ${routing.baseCost})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                className="border-[#908d8d] hover:bg-[#e8dcaa]/50 text-[#525253]"
                onClick={() => setIsProcessPricingOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const newRate = (document.getElementById("newRate") as HTMLInputElement)?.value
                  if (newRate && selectedProcess) {
                    updateProcessPricing(selectedProcess.name, Number(newRate))
                    setIsProcessPricingOpen(false)
                  }
                }}
                className="bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe]"
              >
                Update Process Pricing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
