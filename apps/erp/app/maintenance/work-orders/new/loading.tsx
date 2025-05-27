import { Card } from "@/components/ui/card"

export default function NewWorkOrderLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted"></div>
        <div className="h-4 w-48 animate-pulse rounded-md bg-muted"></div>
      </div>

      <Card>
        <div className="p-6">
          <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
              <div className="h-24 w-full animate-pulse rounded-md bg-muted"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                  <div className="h-10 w-16 animate-pulse rounded-md bg-muted"></div>
                </div>
                <div className="h-24 w-full animate-pulse rounded-md bg-muted"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
              <div className="space-y-2">
                <div className="grid gap-2 md:grid-cols-4">
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                </div>
                <div className="h-24 w-full animate-pulse rounded-md bg-muted"></div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
              <div className="h-9 w-40 animate-pulse rounded-md bg-muted"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
