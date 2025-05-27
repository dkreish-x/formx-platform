import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { User, Building, DollarSign, BarChart } from "lucide-react"

interface PartnerProfileProps {
  user: any
}

export function PartnerProfile({ user }: PartnerProfileProps) {
  // Mock data - in a real app, this would come from your API
  const partnerData = {
    totalReferred: 125000,
    totalCommission: 12500,
    activeReferrals: 3,
    conversionRate: 75,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Partner Name</p>
            <p className="text-sm text-muted-foreground">{user?.name || "Partner Company"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Company</p>
            <p className="text-sm text-muted-foreground">{user?.company || "Partner Solutions Inc."}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue Referred</p>
                <p className="text-2xl font-bold">{formatCurrency(partnerData.totalReferred)}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commission Paid</p>
                <p className="text-2xl font-bold">{formatCurrency(partnerData.totalCommission)}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-muted-foreground">Active Referrals</p>
          <p className="text-xl font-bold">{partnerData.activeReferrals}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
          <p className="text-xl font-bold">{partnerData.conversionRate}%</p>
        </div>
      </div>
    </div>
  )
}
