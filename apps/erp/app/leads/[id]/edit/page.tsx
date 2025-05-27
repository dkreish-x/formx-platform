import { LeadForm, type Lead } from "@/components/leads/lead-form"

// Mock function to get lead data - in a real app, this would fetch from an API or database
async function getLead(id: string): Promise<Lead> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return {
    id,
    company: "Innovative Solutions",
    contact: "Robert Johnson",
    title: "Purchasing Manager",
    email: "robert@innovativesolutions.com",
    phone: "(555) 987-6543",
    source: "Trade Show",
    status: "New",
    assignedTo: "Jane Doe",
    notes: "Met at the Manufacturing Expo. Interested in custom fabrication services.",
    nextFollowUp: "2023-06-15",
  }
}

export default async function EditLeadPage({ params }: { params: { id: string } }) {
  const lead = await getLead(params.id)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight sr-only">Edit Lead</h1>
      <LeadForm lead={lead} isEditing={true} />
    </div>
  )
}
