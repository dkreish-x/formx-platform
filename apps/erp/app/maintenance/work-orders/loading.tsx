import { Card } from "@/components/ui/card"

export default function MaintenanceWorkOrdersLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="h-8 w-64 animate-pulse rounded-md bg-muted"></div>
          <div className="mt-1 h-4 w-48 animate-pulse rounded-md bg-muted"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-[200px] animate-pulse rounded-md bg-muted md:w-[200px] lg:w-[300px]"></div>
          <div className="h-9 w-32 animate-pulse rounded-md bg-muted"></div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 w-16 animate-pulse rounded-md bg-muted"></div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="p-4">
            <div className="space-y-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>
                  <div className="h-6 w-32 animate-pulse rounded bg-muted"></div>
                  <div className="h-6 w-20 animate-pulse rounded bg-muted"></div>
                  <div className="h-6 w-20 animate-pulse rounded bg-muted"></div>
                  <div className="h-6 w-32 animate-pulse rounded bg-muted"></div>
                  <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>
                  <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>
                  <div className="h-6 w-8 animate-pulse rounded bg-muted"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
