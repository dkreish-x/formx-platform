"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { manufacturingProcesses } from "@/lib/manufacturing-processes"

// Collect all unique materials across all processes
const allMaterials = manufacturingProcesses.flatMap((process) =>
  process.materials.map((material) => ({
    ...material,
    processId: process.id,
    processName: process.name,
  })),
)

// Material categories
const materialCategories = {
  all: { name: "All Materials" },
  metals: { name: "Metals" },
  plastics: { name: "Plastics" },
  specialty: { name: "Specialty" },
}

// Update the materialTextures object to use the new detailed textures
const materialTextures = {
  steel: "/images/steel-texture.png",
  stainless: "/images/stainless-steel-texture-detailed.png",
  aluminum: "/images/aluminum-texture-detailed.png",
  brass: "/images/brass-texture-detailed.png",
  copper: "/images/copper-texture-detailed.png",
  titanium: "/images/titanium-texture.png",
  acrylic: "/images/plastic-texture.png",
  abs: "/images/abs-texture-detailed.png",
  nylon: "/images/plastic-texture.png",
  pla: "/images/plastic-texture.png",
  petg: "/images/plastic-texture.png",
  carbon: "/images/carbon-fiber-texture-detailed.png",
  glass: "/images/glass-texture.png",
  ceramic: "/images/ceramic-texture.png",
  delrin: "/images/delrin-texture-detailed.png",
  polycarbonate: "/images/polycarbonate-texture-detailed.png",
  bronze: "/images/bronze-texture.png",
  "cast-iron": "/images/cast-iron-texture.png",
  wood: "/images/wood-texture.png",
  default: "/placeholder-risqj.png",
}

// Update the getMaterialTexture function to include the new materials
function getMaterialTexture(materialId: string): string {
  const id = materialId.toLowerCase()

  if (id.includes("stainless")) {
    return materialTextures.stainless
  } else if (id.includes("steel")) {
    return materialTextures.steel
  } else if (id.includes("aluminum") || id.includes("aluminium")) {
    return materialTextures.aluminum
  } else if (id.includes("brass")) {
    return materialTextures.brass
  } else if (id.includes("copper")) {
    return materialTextures.copper
  } else if (id.includes("titanium")) {
    return materialTextures.titanium
  } else if (id.includes("acrylic")) {
    return materialTextures.acrylic
  } else if (id.includes("abs")) {
    return materialTextures.abs
  } else if (id.includes("nylon")) {
    return materialTextures.nylon
  } else if (id.includes("pla")) {
    return materialTextures.pla
  } else if (id.includes("petg")) {
    return materialTextures.petg
  } else if (id.includes("carbon")) {
    return materialTextures.carbon
  } else if (id.includes("glass")) {
    return materialTextures.glass
  } else if (id.includes("ceramic")) {
    return materialTextures.ceramic
  } else if (id.includes("delrin")) {
    return materialTextures.delrin
  } else if (id.includes("polycarbonate")) {
    return materialTextures.polycarbonate
  } else if (id.includes("bronze")) {
    return materialTextures.bronze
  } else if (id.includes("cast") && id.includes("iron")) {
    return materialTextures["cast-iron"]
  } else if (id.includes("wood")) {
    return materialTextures.wood
  }

  // Default fallbacks based on category
  if (id.includes("metal")) {
    return materialTextures.steel
  } else if (id.includes("plastic")) {
    return materialTextures.acrylic
  }

  return materialTextures.default
}

// Helper function to check if a material belongs to a category
function getMaterialCategory(material) {
  if (
    material.id.includes("steel") ||
    material.id.includes("aluminum") ||
    material.id.includes("brass") ||
    material.id.includes("copper") ||
    material.id.includes("metal")
  ) {
    return "metals"
  }

  if (
    material.id.includes("acrylic") ||
    material.id.includes("abs") ||
    material.id.includes("nylon") ||
    material.id.includes("delrin") ||
    material.id.includes("pla") ||
    material.id.includes("petg") ||
    material.id.includes("plastic")
  ) {
    return "plastics"
  }

  return "specialty"
}

// Add category to materials
const enhancedMaterials = allMaterials.map((material) => ({
  ...material,
  category: getMaterialCategory(material),
}))

// Group processes by category
const processGroups = {
  cutting: manufacturingProcesses.filter(
    (p) => p.id.includes("laser") || p.id.includes("cutting") || p.id.includes("routing"),
  ),
  machining: manufacturingProcesses.filter(
    (p) => p.id.includes("milling") || p.id.includes("cnc") || p.id.includes("machining"),
  ),
  additive: manufacturingProcesses.filter(
    (p) => p.id.includes("printing") || p.id.includes("sla") || p.id.includes("sls"),
  ),
  finishing: manufacturingProcesses.filter(
    (p) => p.id.includes("coating") || p.id.includes("welding") || p.id.includes("form"),
  ),
}

// Add a function to check if a material should be hidden
function shouldHideMaterial(material) {
  const id = material.id.toLowerCase()
  const name = material.name.toLowerCase()

  // List of materials to hide
  const hiddenMaterials = ["titanium", "sls", "petg", "nylon", "hips", "pva", "galvanized", "zinc"]

  // Check if the material contains any of the hidden keywords
  return hiddenMaterials.some((keyword) => id.includes(keyword) || name.includes(keyword))
}

export default function MaterialsClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProcess, setSelectedProcess] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedThickness, setSelectedThickness] = useState([])
  const [selectedFinishes, setSelectedFinishes] = useState([])
  const [filteredMaterials, setFilteredMaterials] = useState(enhancedMaterials)
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  // Get the current process object
  const currentProcess = selectedProcess ? manufacturingProcesses.find((p) => p.id === selectedProcess) : null

  // Get available thicknesses for the selected process
  const availableThicknesses = currentProcess?.additionalFields?.find((f) => f.id === "thickness")?.options || []

  // Get available finishes for the selected process
  const availableFinishes = currentProcess?.finishes || []

  // Filter materials based on selected process, category, and search query
  useEffect(() => {
    let filtered = [...enhancedMaterials]

    // Filter by process
    if (selectedProcess) {
      filtered = filtered.filter((material) => material.processId === selectedProcess)

      // Filter by thickness if applicable
      if (selectedThickness.length > 0) {
        // This is a simplified example - in a real app, you'd need material thickness data
        // For now, we'll just filter randomly based on the selection
        filtered = filtered.filter(() => Math.random() > 0.3)
      }

      // Filter by finishes if applicable
      if (selectedFinishes.length > 0) {
        // This is a simplified example - in a real app, you'd need material-finish compatibility data
        // For now, we'll just filter randomly based on the selection
        filtered = filtered.filter(() => Math.random() > 0.3)
      }
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((material) => material.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (material) =>
          material.name.toLowerCase().includes(query) ||
          material.description?.toLowerCase().includes(query) ||
          material.processName.toLowerCase().includes(query),
      )
    }

    // Remove duplicates
    filtered = filtered.filter((material, index, self) => index === self.findIndex((m) => m.id === material.id))

    // Filter out hidden materials
    filtered = filtered.filter((material) => !shouldHideMaterial(material))

    // Also filter out duplicates by name (more thorough than just by ID)
    filtered = filtered.filter(
      (material, index, self) => index === self.findIndex((m) => m.name.toLowerCase() === material.name.toLowerCase()),
    )

    setFilteredMaterials(filtered)
  }, [selectedProcess, selectedCategory, selectedThickness, selectedFinishes, searchQuery])

  // Scroll to top when material is selected or deselected
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedMaterial])

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  // Handle process selection
  const handleProcessSelect = (processId) => {
    if (processId === "all") {
      setSelectedProcess(null)
    } else {
      setSelectedProcess(processId)
    }
    setSelectedThickness([])
    setSelectedFinishes([])
  }

  // Handle thickness toggle
  const handleThicknessToggle = (thickness) => {
    setSelectedThickness((prev) =>
      prev.includes(thickness) ? prev.filter((t) => t !== thickness) : [...prev, thickness],
    )
  }

  // Handle finish toggle
  const handleFinishToggle = (finish) => {
    setSelectedFinishes((prev) => (prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish]))
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedProcess(null)
    setSelectedCategory("all")
    setSelectedThickness([])
    setSelectedFinishes([])
    setSearchQuery("")
  }

  return (
    <main className="flex-1">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">Materials Library</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore our collection of high-quality materials for all manufacturing processes. Find the perfect material
            for your next project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Compact filter bar */}
        <div className="bg-white rounded-lg border mb-8">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              {/* Process selection */}
              <div className="w-full md:w-1/3">
                <label htmlFor="process-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturing Process
                </label>
                <Select value={selectedProcess || "all"} onValueChange={handleProcessSelect}>
                  <SelectTrigger id="process-select" className="w-full">
                    <SelectValue placeholder="Select a process" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Processes</SelectItem>
                    {Object.entries(processGroups).map(([groupName, processes]) => (
                      <div key={groupName}>
                        <div className="px-2 py-1.5 text-xs text-gray-500 uppercase">{groupName}</div>
                        {processes.map((process) => (
                          <SelectItem key={process.id} value={process.id}>
                            {process.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Material category */}
              <div className="w-full md:w-1/3">
                <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Material Type
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category-select" className="w-full">
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(materialCategories).map(([id, { name }]) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="w-full md:w-1/3">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Materials
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search materials..."
                    className="pl-9 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={clearSearch}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Process-specific filters - only shown when a process is selected */}
            {selectedProcess && (
              <div className="mt-4 pt-4 border-t">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="py-2 text-sm font-medium">Additional Filters</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        {/* Thickness filter */}
                        {availableThicknesses.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Thickness</h4>
                            <div className="space-y-2">
                              {availableThicknesses.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`thickness-${option.value}`}
                                    checked={selectedThickness.includes(option.value)}
                                    onCheckedChange={() => handleThicknessToggle(option.value)}
                                  />
                                  <Label htmlFor={`thickness-${option.value}`} className="text-sm text-gray-700">
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Finish filter */}
                        {availableFinishes.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Finish</h4>
                            <div className="space-y-2">
                              {availableFinishes.map((finish) => (
                                <div key={finish.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`finish-${finish.id}`}
                                    checked={selectedFinishes.includes(finish.id)}
                                    onCheckedChange={() => handleFinishToggle(finish.id)}
                                  />
                                  <Label htmlFor={`finish-${finish.id}`} className="text-sm text-gray-700">
                                    {finish.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* Active filters and results count */}
            <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-2 items-center">
                {(selectedProcess || selectedCategory !== "all" || searchQuery) && (
                  <Button variant="outline" size="sm" onClick={resetFilters} className="h-8">
                    Reset filters
                  </Button>
                )}

                {selectedProcess && (
                  <Badge variant="secondary" className="px-2 py-1">
                    {manufacturingProcesses.find((p) => p.id === selectedProcess)?.name}
                    <button
                      className="ml-1"
                      onClick={() => setSelectedProcess(null)}
                      aria-label="Remove process filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="px-2 py-1">
                    {materialCategories[selectedCategory].name}
                    <button
                      className="ml-1"
                      onClick={() => setSelectedCategory("all")}
                      aria-label="Remove category filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {selectedThickness.length > 0 && (
                  <Badge variant="secondary" className="px-2 py-1">
                    {selectedThickness.length} thickness{selectedThickness.length !== 1 && "es"}
                    <button
                      className="ml-1"
                      onClick={() => setSelectedThickness([])}
                      aria-label="Remove thickness filters"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {selectedFinishes.length > 0 && (
                  <Badge variant="secondary" className="px-2 py-1">
                    {selectedFinishes.length} finish{selectedFinishes.length !== 1 && "es"}
                    <button className="ml-1" onClick={() => setSelectedFinishes([])} aria-label="Remove finish filters">
                      ×
                    </button>
                  </Badge>
                )}
              </div>

              <div className="text-sm text-gray-500 mt-2 md:mt-0">
                {filteredMaterials.length} material{filteredMaterials.length !== 1 && "s"} found
              </div>
            </div>
          </div>
        </div>

        {/* Materials grid */}
        <div>
          {selectedMaterial ? (
            <MaterialDetail material={selectedMaterial} onBack={() => setSelectedMaterial(null)} />
          ) : (
            <>
              {filteredMaterials.length === 0 ? (
                <div className="bg-white rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No materials found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or browse all materials.</p>
                  <Button onClick={resetFilters}>Reset filters</Button>
                </div>
              ) : (
                <>
                  {/* Process heading when a process is selected */}
                  {selectedProcess && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">
                        {manufacturingProcesses.find((p) => p.id === selectedProcess)?.name} Materials
                      </h2>
                      <p className="text-gray-600">
                        Materials optimized for{" "}
                        {manufacturingProcesses.find((p) => p.id === selectedProcess)?.name.toLowerCase()}{" "}
                        manufacturing.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMaterials.map((material) => (
                      <MaterialCard
                        key={`${material.id}-${material.processId}`}
                        material={material}
                        onClick={() => setSelectedMaterial(material)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Help section */}
        <div className="bg-blue-50 rounded-lg border border-blue-100 p-6 mt-12">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:flex-grow">
              <h2 className="text-xl font-bold mb-2">Need help choosing a material?</h2>
              <p className="text-gray-600">
                Our engineering team can help you select the right material for your specific application. Contact us
                for expert advice or to request material samples.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild>
                <Link href="/material-guide">Material Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function MaterialCard({ material, onClick }) {
  return (
    <div
      className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video relative bg-gray-100">
        <Image
          src={getMaterialTexture(material.id) || "/placeholder.svg"}
          alt={material.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {material.processName}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{material.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {material.description || "High-quality material for precision manufacturing."}
        </p>
        <div className="flex justify-between items-center">
          <Badge variant="outline">{materialCategories[material.category].name}</Badge>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            Details <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MaterialDetail({ material, onBack }) {
  // Sample properties for the material
  const properties = {
    strength: Math.floor(Math.random() * 5) + 1,
    durability: Math.floor(Math.random() * 5) + 1,
    machinability: Math.floor(Math.random() * 5) + 1,
    costEffectiveness: Math.floor(Math.random() * 5) + 1,
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Back
        </Button>
        <h2 className="font-bold">{material.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={getMaterialTexture(material.id) || "/placeholder.svg"}
              alt={material.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <Badge>{material.processName}</Badge>
            <Badge variant="outline">{materialCategories[material.category].name}</Badge>
          </div>

          <p className="text-gray-700 mb-6">
            {material.description ||
              "This high-quality material is ideal for precision manufacturing applications. It offers excellent mechanical properties and consistent performance across a wide range of operating conditions."}
          </p>

          <h3 className="font-medium text-lg mb-3">Key Properties</h3>
          <div className="space-y-3 mb-6">
            {Object.entries(properties).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="text-sm font-medium">{value}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(value / 5) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Tabs defaultValue="specs">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="design">Design Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Density</span>
                  <span className="font-medium">{(Math.random() * 8 + 1).toFixed(2)} g/cm³</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Tensile Strength</span>
                  <span className="font-medium">{Math.floor(Math.random() * 500 + 100)} MPa</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Yield Strength</span>
                  <span className="font-medium">{Math.floor(Math.random() * 400 + 50)} MPa</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Elongation</span>
                  <span className="font-medium">{Math.floor(Math.random() * 30 + 5)}%</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Hardness</span>
                  <span className="font-medium">{Math.floor(Math.random() * 100 + 20)} HB</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Melting Point</span>
                  <span className="font-medium">{Math.floor(Math.random() * 1500 + 200)}°C</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Aerospace components requiring high strength-to-weight ratio</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Automotive parts with complex geometries</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Medical devices requiring biocompatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Industrial equipment exposed to harsh environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Consumer products requiring aesthetic finish</span>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="design" className="p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Minimum wall thickness: {(Math.random() * 2 + 0.5).toFixed(1)} mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Tolerance: ±{(Math.random() * 0.2 + 0.05).toFixed(2)} mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Avoid sharp internal corners; use fillets of at least 1mm radius</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Design for uniform wall thickness when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Consider thermal expansion in assemblies</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button asChild className="w-full">
              <Link href={`/upload?process=${material.processId}&material=${material.id}`}>
                Get Quote with {material.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
