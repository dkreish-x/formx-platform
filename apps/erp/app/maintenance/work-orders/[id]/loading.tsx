import { Card } from "@/components/ui/card"

export default function WorkOrderDetailLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted"></div>
        <div className="flex gap-2">
          <div className="h-6 w-24 animate-pulse rounded-md bg-muted"></div>
          <div className="h-6 w-32 animate-pulse rounded-md bg-muted"></div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
                    <div className="mt-1 h-6 w-32 animate-pulse rounded-md bg-muted"></div>
                  </div>
                ))}
              </div>
              <div>
                <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
                <div className="mt-1 h-16 w-full animate-pulse rounded-md bg-muted"></div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="mb-2 flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded-md bg-muted"></div>
                  <div className="h-6 w-32 animate-pulse rounded-md bg-muted"></div>
                  <div className="h-6 w-16 animate-pulse rounded-md bg-muted"></div>
                  <div className="h-6 w-16 animate-pulse rounded-md bg-muted"></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="mt-4 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 w-full animate-pulse rounded-md bg-muted"></div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="mt-4 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border-b pb-2">
                  <div className="flex justify-between">
                    <div className="h-5 w-32 animate-pulse rounded-md bg-muted"></div>
                    <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
                  </div>
                  <div className="mt-1 h-4 w-24 animate-pulse rounded-md bg-muted"></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <div className="h-9 w-32 animate-pulse rounded-md bg-muted"></div>
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted"></div>
      </div>
    </div>
  )
}
