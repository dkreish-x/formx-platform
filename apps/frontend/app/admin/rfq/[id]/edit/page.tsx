import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import AdminRFQEditForm from "@/components/admin/admin-rfq-edit-form"
import { getAdminRFQDetails } from "@/lib/admin"

interface AdminRFQEditPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: AdminRFQEditPageProps): Metadata {
  return {
    title: `Edit RFQ ${params.id} | Admin Dashboard | Form(X)`,
    description: "Edit quote request configuration",
  }
}

export default async function AdminRFQEditPage({ params }: AdminRFQEditPageProps) {
  // In a real app, this would fetch data from a database
  const rfq = await getAdminRFQDetails(params.id)

  return (
    <main className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href={`/admin/rfq/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to RFQ Details
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-brand-dark-grey">Edit RFQ: {rfq.id}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Configuration</CardTitle>
          <CardDescription>Modify the manufacturing specifications for this part</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminRFQEditForm rfq={rfq} />
        </CardContent>
      </Card>
    </main>
  )
}
