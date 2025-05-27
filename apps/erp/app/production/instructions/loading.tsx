import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function WorkInstructionsLoading() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between space-y-2 p-8 pt-6">
        <div>
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[400px] mt-2" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-[80px]" />
          <Skeleton className="h-9 w-[80px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
      </div>

      <div className="px-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-10 w-[350px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-[200px]" />
                    <Skeleton className="h-5 w-[70px]" />
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-9 w-[60px]" />
                    <div className="flex space-x-1">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
