import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { ArrowLeft, Edit, Mail, Phone, Calendar, DollarSign, Briefcase, Users, FileText } from "lucide-react"

// Mock data for an opportunity
const getMockOpportunity = (id: string) => ({
  id,
  name: "Custom Machining Project",
  customer: "Acme Industries",
  customerContact: "John Smith",
  contactTitle: "Procurement Manager",
  contactEmail: "john@acmeindustries.com",
  contactPhone: "(555) 123-4567",
  value: "$45,000",
  stage: "Proposal",
  probability: "60%",
  expectedCloseDate: "2023-06-15",
  owner: "Jane Smith",
  source: "Trade Show",
  description: "Custom machining project for aerospace components. Client needs precision parts with tight tolerances.",
  nextSteps: "Schedule technical review with engineering team. Prepare detailed proposal with pricing breakdown.",
  createdAt: "2023-05-01",
  lastModified: "2023-05-10",
})

export default function OpportunityDetailsPage({ params }: { params: { id: string } }) {
  const opportunity = getMockOpportunity(params.id)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/opportunities">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{opportunity.name}</h1>
          <StatusBadge
            status={
              opportunity.stage === "Discovery"
                ? "info"
                : opportunity.stage === "Needs Analysis"
                  ? "warning"
                  : opportunity.stage === "Proposal"
                    ? "warning"
                    : opportunity.stage === "Negotiation"
                      ? "warning"
                      : opportunity.stage === "Closed Won"
                        ? "success"
                        : opportunity.stage === "Closed Lost"
                          ? "error"
                          : "default"
            }
          >
            {opportunity.stage}
          </StatusBadge>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/opportunities/${opportunity.id}/edit`}>
            <Button variant="secondary" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Opportunity Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                <p className="text-base">{opportunity.customer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Value</h3>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">{opportunity.value}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                <p className="text-base">{opportunity.customerContact}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Job Title</h3>
                <p className="text-base">{opportunity.contactTitle}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${opportunity.contactEmail}`} className="text-base text-blue-600 hover:underline">
                    {opportunity.contactEmail}
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${opportunity.contactPhone}`} className="text-base text-blue-600 hover:underline">
                    {opportunity.contactPhone}
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Expected Close Date</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">{opportunity.expectedCloseDate}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Probability</h3>
                <p className="text-base">{opportunity.probability}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Owner</h3>
                <p className="text-base">{opportunity.owner}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Source</h3>
                <p className="text-base">{opportunity.source}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="text-base mt-1">{opportunity.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Next Steps</h3>
              <p className="text-base mt-1">{opportunity.nextSteps}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Create Proposal
            </Button>
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Log Call
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button className="w-full" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
            <Button className="w-full" variant="secondary">
              <Briefcase className="h-4 w-4 mr-2" />
              Update Stage
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
