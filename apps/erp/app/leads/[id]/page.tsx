import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { DeleteLeadDialog } from "@/components/leads/delete-lead-dialog"
import Link from "next/link"
import { ArrowLeft, Edit, Mail, Phone, Calendar } from "lucide-react"

// Mock data for a lead
const getMockLead = (id: string) => ({
  id,
  company: "Innovative Solutions",
  contact: "Robert Johnson",
  title: "Purchasing Manager",
  email: "robert@innovativesolutions.com",
  phone: "(555) 987-6543",
  source: "Trade Show",
  status: "New",
  assignedTo: "Jane Doe",
  createdAt: "2023-05-10",
  notes: "Met at the Manufacturing Expo. Interested in custom fabrication services.",
  lastActivity: "2023-05-12",
  nextFollowUp: "2023-05-20",
})

export default function LeadDetailsPage({ params }: { params: { id: string } }) {
  const lead = getMockLead(params.id)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/leads">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{lead.company}</h1>
          <StatusBadge
            status={
              lead.status === "New"
                ? "info"
                : lead.status === "Contacted"
                  ? "warning"
                  : lead.status === "Qualified"
                    ? "success"
                    : lead.status === "Proposal"
                      ? "warning"
                      : "info"
            }
          >
            {lead.status}
          </StatusBadge>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/leads/${lead.id}/edit`}>
            <Button variant="secondary" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <DeleteLeadDialog leadId={lead.id} leadName={lead.company} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                <p className="text-base">{lead.contact}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Job Title</h3>
                <p className="text-base">{lead.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${lead.email}`} className="text-base text-blue-600 hover:underline">
                    {lead.email}
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${lead.phone}`} className="text-base text-blue-600 hover:underline">
                    {lead.phone}
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Source</h3>
                <p className="text-base">{lead.source}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                <p className="text-base">{lead.createdAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <p className="text-base">{lead.assignedTo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Next Follow-up</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">{lead.nextFollowUp}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="text-base mt-1">{lead.notes}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Log Call
            </Button>
            <Button className="w-full" variant="outline">
              Schedule Meeting
            </Button>
            <Button className="w-full" variant="outline">
              Create Task
            </Button>
            <Button className="w-full" variant="secondary">
              Convert to Customer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
