"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, RefreshCw } from "lucide-react"

export default function QuotesFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [processFilter, setProcessFilter] = useState("all")
  const [materialFilter, setMaterialFilter] = useState("all")

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between p-6 bg-muted/10">
      <div className="flex w-full max-w-sm items-center space-x-2 relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 border-muted bg-white"
        />
      </div>
      <div className="flex gap-2">
        <Select value={processFilter} onValueChange={setProcessFilter}>
          <SelectTrigger className="w-[180px] border-muted bg-white">
            <SelectValue placeholder="Filter by process" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Processes</SelectItem>
            <SelectItem value="cnc-machining">CNC Machining</SelectItem>
            <SelectItem value="3d-printing">3D Printing</SelectItem>
            <SelectItem value="sheet-metal">Sheet Metal</SelectItem>
            <SelectItem value="injection-molding">Injection Molding</SelectItem>
          </SelectContent>
        </Select>
        <Select value={materialFilter} onValueChange={setMaterialFilter}>
          <SelectTrigger className="w-[180px] border-muted bg-white">
            <SelectValue placeholder="Filter by material" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Materials</SelectItem>
            <SelectItem value="aluminum">Aluminum</SelectItem>
            <SelectItem value="steel">Steel</SelectItem>
            <SelectItem value="plastic">Plastic</SelectItem>
            <SelectItem value="titanium">Titanium</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="border-muted bg-white">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="border-muted bg-white">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
