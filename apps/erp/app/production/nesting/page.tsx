import type { Metadata } from "next"
import { NestingOptimization } from "@/components/nesting-optimization"
import { MaterialWasteTracking } from "@/components/material-waste-tracking"

export const metadata: Metadata = {
  title: "Nesting & Material Optimization",
  description: "Optimize material usage with advanced nesting algorithms",
}

export default function NestingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nesting & Material Optimization</h1>
        <p className="text-muted-foreground">Optimize material usage with advanced nesting algorithms</p>
      </div>

      <NestingOptimization />

      <MaterialWasteTracking />
    </div>
  )
}
