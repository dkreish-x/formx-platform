import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Skeleton className="h-12 w-full max-w-2xl" />

      <div className="space-y-6">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[150px] w-full" />
      </div>
    </div>
  )
}
