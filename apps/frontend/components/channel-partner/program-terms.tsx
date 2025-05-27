import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function ProgramTerms() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Terms</CardTitle>
        <CardDescription>Channel Partner commission structure and requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-medium">Tiered commission structure:</span> 12% for jobs under $10K, 10% for jobs
              $10K-$50K, 7% for jobs over $50K
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-medium">Minimum job size:</span> $5,000 to qualify for commission
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-medium">Payment terms:</span> Commissions paid 30 days after customer payment is
              received
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-medium">Referral review:</span> All referrals subject to review and approval
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-medium">Activity requirement:</span> Submit at least one new referral every 90 days
              to maintain active status
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground pt-2 border-t">
          Please refer to your Channel Partner Agreement for complete terms and conditions. Contact your partner manager
          with any questions.
        </p>
      </CardContent>
    </Card>
  )
}
