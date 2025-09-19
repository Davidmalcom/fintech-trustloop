"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Wallet2, TrendingUp, Calendar, Shield } from "lucide-react"
import type { LoanDashboardData } from "./types"

export function OverviewStats({
  data,
}: {
  data: LoanDashboardData
}) {
  const totalLoans = data.activeLoans.length
  const onTimePayments = data.paymentHistory.filter((p) => p.status === "paid").length
  const totalPayments = data.paymentHistory.length
  const onTimeRate = totalPayments > 0 ? (onTimePayments / totalPayments) * 100 : 100

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total Outstanding */}
      <Card className="rounded-xl border">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Wallet2 className="h-5 w-5 text-emerald-600" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Total Outstanding</p>
              <p className="text-sm font-bold text-emerald-800">
                {data.currency} {data.totalOutstanding.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Score */}
      <Card className="rounded-xl border">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Credit Score</p>
              <p className="text-sm font-bold text-blue-800">{data.creditScore}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Payment */}
      {data.nextPaymentDue && (
        <Card className="rounded-xl border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Next Payment</p>
                <p className="text-sm font-bold text-amber-800">
                  {data.currency} {data.nextPaymentDue.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(data.nextPaymentDue.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Performance */}
      <Card className="rounded-xl border">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">On-time Rate</p>
              <p className="text-sm font-bold text-emerald-800">{Math.round(onTimeRate)}%</p>
              <Progress value={onTimeRate} className="mt-1 h-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
