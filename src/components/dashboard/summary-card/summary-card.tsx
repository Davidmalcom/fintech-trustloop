"use client"

import type { SummaryCardProps } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CalendarClock, Wallet2 } from 'lucide-react'

export function SummaryCard({
  currency,
  totalSavings,
  nextPaymentDate,
  nextPaymentAmount,
  cycleProgress,
}: SummaryCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-normal opacity-90">Total Savings</CardTitle>
          <div className="mt-1 flex items-baseline gap-2">
            <Wallet2 className="h-4 w-4 opacity-90" />
            <div className="text-2xl font-bold tracking-tight">
              {currency} {totalSavings.toLocaleString()}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-1">
          <div className="rounded-md bg-white/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4" />
                Next payment
              </span>
              <span className="font-medium">
                {nextPaymentDate} • {currency} {nextPaymentAmount.toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <Progress value={cycleProgress} className="h-2 bg-white/20" />
              <div className="mt-1.5 text-[11px] opacity-90">
                Cycle progress {cycleProgress}%
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
