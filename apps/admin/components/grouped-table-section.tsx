"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"
import { getGroupDisplayName } from "@/lib/table-utils"

interface GroupedTableSectionProps {
  groupKey: string
  groupValue: string
  itemCount: number
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function GroupedTableSection({
  groupKey,
  groupValue,
  itemCount,
  children,
  defaultExpanded = true,
}: GroupedTableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const displayName = getGroupDisplayName(groupKey, groupValue)

  return (
    <div className="border border-[#908d8d] rounded-xl mb-6 overflow-hidden bg-[#fefefe] shadow-sm">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#e8dcaa]/30 to-[#fefefe] border-b border-[#908d8d]">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 h-auto p-0 font-medium text-[#525253] hover:text-[#d4c273]"
        >
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <span className="text-lg">{displayName}</span>
        </Button>
        <Badge variant="secondary" className="bg-[#d4c273] text-[#fefefe]">
          {itemCount} items
        </Badge>
      </div>
      {isExpanded && <div className="overflow-x-auto">{children}</div>}
    </div>
  )
}
