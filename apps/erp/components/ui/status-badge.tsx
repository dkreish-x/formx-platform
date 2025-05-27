import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      draft: "bg-gray-100 text-gray-800",
      sent: "bg-blue-100 text-blue-800",
      ready: "bg-green-100 text-green-800",
      partial: "bg-amber-100 text-amber-800",
      shipped: "bg-green-100 text-green-800",
      billed: "bg-formx-dark-gold text-formx-white",
      "not-billed": "bg-gray-100 text-gray-800",
      "partially-billed": "bg-amber-100 text-amber-800",
      "not-shipped": "bg-gray-100 text-gray-800",
      "partially-shipped": "bg-amber-100 text-amber-800",
      late: "bg-red-100 text-red-800",
      completed: "bg-formx-dark-gold text-formx-white",
    },
  },
  defaultVariants: {
    variant: "draft",
  },
})

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: string
}

function StatusBadge({ className, variant, status, ...props }: StatusBadgeProps) {
  // Convert status to variant format (lowercase, replace spaces with hyphens)
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "-")

  return (
    <div
      className={cn(
        statusBadgeVariants({
          variant: (variant || normalizedStatus) as any,
        }),
        className,
      )}
      {...props}
    >
      {status}
    </div>
  )
}

export { StatusBadge, statusBadgeVariants }
