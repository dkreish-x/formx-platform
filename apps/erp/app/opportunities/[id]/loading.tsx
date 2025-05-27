import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OpportunityDetailsLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-6 w-[100px] rounded-full" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-[200px]" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-6 w-[180px]" />
                </div>
              ))}
            </div>
            <div>
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-[100px]" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
