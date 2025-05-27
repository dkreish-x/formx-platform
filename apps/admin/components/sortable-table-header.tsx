"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import type { SortDirection } from "@/lib/table-utils"

interface SortableTableHeaderProps {
  children: React.ReactNode
  sortKey: string
  currentSort: { key: string; direction: SortDirection }
  onSort: (key: string) => void
  className?: string
}

export function SortableTableHeader({ children, sortKey, currentSort, onSort, className }: SortableTableHeaderProps) {
  const isActive = currentSort.key === sortKey
  const direction = isActive ? currentSort.direction : null

  const getSortIcon = () => {
    if (!isActive || direction === null) return <ArrowUpDown className="h-4 w-4" />
    if (direction === "asc") return <ArrowUp className="h-4 w-4" />
    return <ArrowDown className="h-4 w-4" />
  }

  return (
    <th className={className}>
      <Button variant="ghost" onClick={() => onSort(sortKey)} className="h-auto p-0 font-medium hover:bg-transparent">
        <span className="flex items-center gap-2">
          {children}
          {getSortIcon()}
        </span>
      </Button>
    </th>
  )
}
