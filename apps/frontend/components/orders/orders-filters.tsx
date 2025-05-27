"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, RefreshCw, X } from "lucide-react"

export default function OrdersFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [processFilter, setProcessFilter] = useState("all")
  const [materialFilter, setMaterialFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const clearFilters = () => {
    setSearchTerm("")
    setProcessFilter("all")
    setMaterialFilter("all")
  }

  return (
    <div className="border-b border-muted">
      <div className="flex flex-col sm:flex-row gap-4 justify-between p-4 bg-muted/10">
        <div className="flex w-full max-w-sm items-center space-x-2 relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 border-muted bg-white"
          />
          {searchTerm && (
            <Button variant="ghost" size="icon" className="absolute right-1 h-7 w-7" onClick={() => setSearchTerm("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-muted bg-white"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="border-muted bg-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-muted/5 border-t border-muted grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Process</label>
            <Select value={processFilter} onValueChange={setProcessFilter}>
              <SelectTrigger className="w-full border-muted bg-white">
                <SelectValue placeholder="Filter by process" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Processes</SelectItem>
                <SelectItem value="cnc-machining">CNC Machining</SelectItem>
                <SelectItem value="3d-printing">3D Printing</SelectItem>
                <SelectItem value="laser-cutting">Laser Cutting</SelectItem>
                <SelectItem value="sheet-metal">Sheet Metal</SelectItem>
                <SelectItem value="injection-molding">Injection Molding</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Material</label>
            <Select value={materialFilter} onValueChange={setMaterialFilter}>
              <SelectTrigger className="w-full border-muted bg-white">
                <SelectValue placeholder="Filter by material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                <SelectItem value="aluminum">Aluminum</SelectItem>
                <SelectItem value="steel">Steel</SelectItem>
                <SelectItem value="stainless-steel">Stainless Steel</SelectItem>
                <SelectItem value="brass">Brass</SelectItem>
                <SelectItem value="copper">Copper</SelectItem>
                <SelectItem value="titanium">Titanium</SelectItem>
                <SelectItem value="plastic">Plastic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" size="sm" className="border-muted bg-white" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
