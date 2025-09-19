"use client"

import * as React from "react"
import type { UpcomingActivityProps } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, HandCoins, Wallet2 } from 'lucide-react'

function useCountdown(targetISO: string) {
  const target = React.useMemo(() => new Date(targetISO).getTime(), [targetISO])
  const [now, setNow] = React.useState<number>(() => Date.now())

  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  const d = Math.floor(diff / (24 * 60 * 60 * 1000))
  const h = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const m = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
  const s = Math.floor((diff % (60 * 1000)) / 1000)

  const label =
    d > 0 ? `${d}d ${h}h` : h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`

  return { d, h, m, s, label }
}

function formatMoney(currency: string, amount: number) {
  return `${currency} ${amount.toLocaleString()}`
}

export function UpcomingActivity({ nextContribution, nextPayout }: UpcomingActivityProps) {
  const c = useCountdown(nextContribution.dateISO)

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Upcoming Activity</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 p-3 text-white">
          <div className="flex items-center gap-2">
            <HandCoins className="h-5 w-5" />
            <div>
              <p className="text-xs/4 opacity-90">Next Contribution {nextContribution.label ? `• ${nextContribution.label}` : ""}</p>
              <p className="text-sm font-semibold">
                {formatMoney(nextContribution.amount.currency, nextContribution.amount.amount)}
              </p>
              <p className="text-[11px] opacity-90">
                Due {new Date(nextContribution.dateISO).toLocaleDateString(undefined, { month: "short", day: "2-digit" })}
              </p>
            </div>
          </div>
          <div className="rounded-md bg-white/15 px-2 py-1 text-[11px] font-medium">
            {c.label}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
          <div className="flex items-center gap-2">
            <Wallet2 className="h-5 w-5 text-emerald-700" />
            <div>
              <p className="text-xs text-muted-foreground">Next Payout</p>
              <p className="text-sm font-medium">
                {formatMoney(nextPayout.amount.currency, nextPayout.amount.amount)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarClock className="h-4 w-4" />
            {new Date(nextPayout.dateISO).toLocaleDateString(undefined, { month: "short", day: "2-digit" })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
