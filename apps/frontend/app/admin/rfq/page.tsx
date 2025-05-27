import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminRFQTable from "@/components/admin/admin-rfq-table"
import AdminRFQStats from "@/components/admin/admin-rfq-stats"
import { getAdminRFQData } from "@/lib/admin"

export const metadata: Metadata = {
  title: "Admin RFQ Dashboard | Form(X)",
  description: "Manage incoming quote requests",
}

export default async function AdminRFQDashboard() {
  // In a real app, this would fetch data from a database
  const rfqData = await getAdminRFQData()

  return (
    <main className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-brand-dark-grey">RFQ Management</h1>
          <p className="text-brand-light-grey">Review and manage incoming quote requests</p>
        </div>
      </div>

      <AdminRFQStats stats={rfqData.stats} />

      <Tabs defaultValue="needs-review" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="needs-review">Needs Review ({rfqData.needsReviewCount})</TabsTrigger>
          <TabsTrigger value="all">All RFQs</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="needs-review">
          <AdminRFQTable rfqs={rfqData.rfqs.filter((rfq) => rfq.status === "Needs Review")} showFilters={true} />
        </TabsContent>

        <TabsContent value="all">
          <AdminRFQTable rfqs={rfqData.rfqs} showFilters={true} />
        </TabsContent>

        <TabsContent value="approved">
          <AdminRFQTable rfqs={rfqData.rfqs.filter((rfq) => rfq.status === "Approved")} showFilters={true} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
