import { LeadForm } from "@/components/leads/lead-form"

export default function NewLeadPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight sr-only">Create New Lead</h1>
      <LeadForm />
    </div>
  )
}
