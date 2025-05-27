export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Loading estimate...</h1>
      <div className="h-4 w-full max-w-md bg-muted animate-pulse rounded mb-4"></div>
      <div className="h-4 w-full max-w-sm bg-muted animate-pulse rounded mb-4"></div>
      <div className="h-4 w-full max-w-lg bg-muted animate-pulse rounded"></div>
    </div>
  )
}
