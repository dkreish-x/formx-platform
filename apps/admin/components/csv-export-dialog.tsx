"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CSVExportDialogProps {
  isOpen: boolean
  onClose: () => void
  data: any[]
  entityType: string
  fieldMappings: Record<string, { label: string; required: boolean; type: string }>
}

export function CSVExportDialog({ isOpen, onClose, data, entityType, fieldMappings }: CSVExportDialogProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>(Object.keys(fieldMappings))
  const [exportOptions, setExportOptions] = useState({
    includeHeaders: true,
    filterActive: "all", // "all", "active", "inactive"
    format: "csv", // "csv", "excel"
  })

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]))
  }

  const handleSelectAll = () => {
    setSelectedFields(Object.keys(fieldMappings))
  }

  const handleSelectNone = () => {
    setSelectedFields([])
  }

  const handleSelectRequired = () => {
    setSelectedFields(
      Object.entries(fieldMappings)
        .filter(([_, config]) => config.required)
        .map(([field]) => field),
    )
  }

  const getFilteredData = () => {
    let filteredData = [...data]

    // Apply active/inactive filter if applicable
    if (exportOptions.filterActive !== "all" && data.some((item) => "active" in item)) {
      filteredData = filteredData.filter((item) =>
        exportOptions.filterActive === "active" ? item.active : !item.active,
      )
    }

    return filteredData
  }

  const generateCSV = () => {
    const filteredData = getFilteredData()

    // Create headers
    const headers = selectedFields.map((field) => fieldMappings[field]?.label || field)

    // Create rows
    const rows = filteredData.map((item) =>
      selectedFields.map((field) => {
        const value = item[field]

        // Handle different data types
        if (value === null || value === undefined) {
          return ""
        } else if (typeof value === "boolean") {
          return value ? "Yes" : "No"
        } else if (Array.isArray(value)) {
          return value.join("; ")
        } else if (typeof value === "object") {
          return JSON.stringify(value)
        } else {
          // Escape commas and quotes for CSV
          const stringValue = String(value)
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }
      }),
    )

    // Combine headers and rows
    const csvContent = [...(exportOptions.includeHeaders ? [headers] : []), ...rows]
      .map((row) => row.join(","))
      .join("\n")

    return csvContent
  }

  const downloadCSV = () => {
    const csvContent = generateCSV()
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${entityType}_export_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    onClose()
  }

  const filteredData = getFilteredData()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export {entityType.charAt(0).toUpperCase() + entityType.slice(1)} to CSV
          </DialogTitle>
          <DialogDescription>
            Select the fields you want to include in your export and configure export options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Filter Records</Label>
                  <Select
                    value={exportOptions.filterActive}
                    onValueChange={(value) => setExportOptions({ ...exportOptions, filterActive: value })}
                  >
                    <SelectTrigger className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Records</SelectItem>
                      <SelectItem value="active">Active Only</SelectItem>
                      <SelectItem value="inactive">Inactive Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select
                    value={exportOptions.format}
                    onValueChange={(value) => setExportOptions({ ...exportOptions, format: value })}
                  >
                    <SelectTrigger className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeHeaders"
                  checked={exportOptions.includeHeaders}
                  onCheckedChange={(checked) => setExportOptions({ ...exportOptions, includeHeaders: !!checked })}
                  className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                />
                <Label htmlFor="includeHeaders">Include column headers</Label>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Export Summary:</strong> {filteredData.length} records will be exported with{" "}
                  {selectedFields.length} fields
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Field Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Fields to Export</CardTitle>
              <CardDescription>Choose which fields to include in your export file</CardDescription>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={handleSelectNone}>
                  Select None
                </Button>
                <Button variant="outline" size="sm" onClick={handleSelectRequired}>
                  Required Only
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(fieldMappings).map(([field, config]) => (
                  <div key={field} className="flex items-center space-x-3 p-2 border rounded-lg">
                    <Checkbox
                      id={field}
                      checked={selectedFields.includes(field)}
                      onCheckedChange={() => handleFieldToggle(field)}
                      className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
                    />
                    <div className="flex-1">
                      <Label htmlFor={field} className="font-medium cursor-pointer">
                        {config.label}
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {config.type}
                        </Badge>
                        {config.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Export Preview
              </CardTitle>
              <CardDescription>Preview of the first few rows that will be exported</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-slate-300">
                  {exportOptions.includeHeaders && (
                    <thead>
                      <tr className="bg-slate-50">
                        {selectedFields.map((field) => (
                          <th key={field} className="border border-slate-300 px-2 py-1 text-left font-medium">
                            {fieldMappings[field]?.label || field}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {filteredData.slice(0, 3).map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        {selectedFields.map((field) => (
                          <td key={field} className="border border-slate-300 px-2 py-1 max-w-32 truncate">
                            {item[field] === null || item[field] === undefined
                              ? "—"
                              : typeof item[field] === "boolean"
                                ? item[field]
                                  ? "Yes"
                                  : "No"
                                : Array.isArray(item[field])
                                  ? item[field].join("; ")
                                  : String(item[field])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredData.length > 3 && (
                <p className="text-sm text-slate-500 mt-2">... and {filteredData.length - 3} more rows</p>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={downloadCSV}
            disabled={selectedFields.length === 0}
            className="bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe]"
          >
            <Download className="h-4 w-4 mr-2" />
            Export {filteredData.length} Records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
