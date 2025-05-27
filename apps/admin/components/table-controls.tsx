"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X, Filter } from "lucide-react"

interface TableControlsProps {
  groupOptions: Array<{ value: string; label: string }>
  currentGroup: string
  onGroupChange: (value: string) => void
  onClearGroup: () => void
}

export function TableControls({ groupOptions, currentGroup, onGroupChange, onClearGroup }: TableControlsProps) {
  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-[#e8dcaa]/30 rounded-xl border border-[#908d8d]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#d4c273] rounded-lg flex items-center justify-center">
          <Filter className="w-4 h-4 text-[#fefefe]" />
        </div>
        <span className="text-sm font-medium text-[#525253]">Group by:</span>
        <Select value={currentGroup} onValueChange={onGroupChange}>
          <SelectTrigger className="w-48 border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]">
            <SelectValue placeholder="No grouping" />
          </SelectTrigger>
          <SelectContent className="bg-[#fefefe] border-[#908d8d] rounded-xl shadow-lg">
            <SelectItem value="none" className="hover:bg-[#e8dcaa]/50">
              No grouping
            </SelectItem>
            {groupOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="hover:bg-[#e8dcaa]/50">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentGroup && (
          <Button variant="ghost" size="sm" onClick={onClearGroup} className="hover:bg-[#e8dcaa]/50 text-[#525253]">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
