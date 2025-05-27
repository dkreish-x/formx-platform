import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CapacityPlanningLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </div>
                      <Skeleton className="h-16 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-2 w-full mt-4" />
                    <div className="mt-2 flex justify-between">
                      <Skeleton className="h-3 w-6" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-64 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
