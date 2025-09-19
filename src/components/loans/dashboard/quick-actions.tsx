"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Calculator, History } from "lucide-react"
import { LoanPaymentSelector } from "./loan-payment-selector"
import type { ActiveLoan } from "./types"

export function QuickActions({
  activeLoans,
  onNewApplication,
  onMakePayment,
  onViewHistory,
  onCalculator,
}: {
  activeLoans: ActiveLoan[]
  onNewApplication: () => void
  onMakePayment: (loanId: string) => void
  onViewHistory: () => void
  onCalculator: () => void
}) {
  return (
    <Card className="rounded-xl border">
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            onClick={onNewApplication}
            className="h-16 flex-col gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="text-xs">Apply for Loan</span>
          </Button>

          <div className="h-16">
            <LoanPaymentSelector loans={activeLoans} onSelectLoan={onMakePayment} />
          </div>

          <Button variant="outline" onClick={onCalculator} className="h-16 flex-col gap-1 bg-transparent">
            <Calculator className="h-5 w-5" />
            <span className="text-xs">Calculator</span>
          </Button>

          <Button variant="outline" onClick={onViewHistory} className="h-16 flex-col gap-1 bg-transparent">
            <History className="h-5 w-5" />
            <span className="text-xs">Full History</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
