import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ShippingLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="w-3 h-3 rounded-sm" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex justify-between items-end">
                  <Skeleton className="h-8 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-20 ml-auto mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-36" />
          <div className="flex mt-2 space-x-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-4 w-24" />
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-24" />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              {Array(7)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-4 w-24" />
                ))}
            </div>
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex justify-between">
                  {Array(7)
                    .fill(0)
                    .map((_, colIndex) => (
                      <Skeleton key={colIndex} className="h-4 w-24" />
                    ))}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
