import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"
import type { AdminRFQStats as AdminRFQStatsType } from "@/types/admin"

interface AdminRFQStatsProps {
  stats: AdminRFQStatsType
}

export default function AdminRFQStats({ stats }: AdminRFQStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total RFQs</CardTitle>
          <FileText className="h-4 w-4 text-brand-dark-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-dark-grey">{stats.totalRfqs}</div>
          <p className="text-xs text-brand-light-grey">
            {stats.rfqsThisWeek > 0 ? `+${stats.rfqsThisWeek} this week` : "No new RFQs this week"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-dark-grey">{stats.needsReview}</div>
          <p className="text-xs text-brand-light-grey">
            {stats.needsReviewThisWeek > 0 ? `+${stats.needsReviewThisWeek} this week` : "No new reviews this week"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-dark-grey">{stats.approved}</div>
          <p className="text-xs text-brand-light-grey">
            {stats.approvedThisWeek > 0 ? `+${stats.approvedThisWeek} this week` : "No approvals this week"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <Clock className="h-4 w-4 text-brand-dark-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-dark-grey">{stats.avgResponseHours}h</div>
          <p className="text-xs text-brand-light-grey">
            {stats.responseTimeTrend < 0
              ? `${Math.abs(stats.responseTimeTrend)}% faster than last week`
              : `${stats.responseTimeTrend}% slower than last week`}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
