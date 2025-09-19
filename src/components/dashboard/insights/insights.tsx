"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { InsightsProps } from "./types"

export function Insights({ currency, monthlyProgress, monthLabel, ytd }: InsightsProps) {
  const max = Math.max(...ytd.map((p) => p.amount), 1)
  const totalYtd = ytd.reduce((s, p) => s + p.amount, 0)
  const best = ytd.reduce((acc, p) => (p.amount > acc.amount ? p : acc), ytd[0] || { month: "", amount: 0 })
  const monthData = ytd.find((p) => p.month === monthLabel) || ytd[ytd.length - 1] || { month: monthLabel, amount: 0 }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Insights</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Monthly progress */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span>Monthly savings ({monthLabel})</span>
            <span className="font-medium">{monthlyProgress}%</span>
          </div>
          <Progress value={monthlyProgress} className="h-2" />
          <div className="mt-1 text-[11px] text-muted-foreground">
            {monthLabel} total: <span className="font-medium">{currency} {monthData.amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Mini YTD bar chart */}
        <div>
          <div className="mb-2 text-xs">Year-to-date savings</div>
          <div className="relative h-28 w-full rounded-md bg-muted/40 p-2">
            <div className="absolute inset-2 flex items-end gap-1.5">
              {ytd.map((p, idx) => {
                const h = Math.round((p.amount / max) * 100)
                const isBest = p.month === best.month
                const isCurrent = p.month === monthLabel
                return (
                  <div key={idx} className="flex-1">
                    <div
                      className={[
                        "mx-auto w-full rounded-t",
                        isCurrent ? "bg-emerald-600" : "bg-emerald-500/80 dark:bg-emerald-400/90",
                        isBest && "!bg-amber-500",
                      ].join(" ")}
                      style={{ height: `${Math.max(6, h)}%` }}
                      title={`${p.month}: ${currency} ${p.amount.toLocaleString()}`}
                      aria-label={`${p.month} ${currency} ${p.amount.toLocaleString()}`}
                    />
                  </div>
                )
              })}
            </div>
            <div className="absolute inset-x-2 bottom-1 flex justify-between text-[10px] text-muted-foreground">
              {ytd.map((p, idx) => (
                <span key={idx}>{p.month}</span>
              ))}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <div className="rounded-md border p-2">
              <div className="text-muted-foreground">YTD Total</div>
              <div className="font-medium">{currency} {totalYtd.toLocaleString()}</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-muted-foreground">Best Month</div>
              <div className="font-medium">{best.month} · {currency} {best.amount.toLocaleString()}</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-muted-foreground">This Month</div>
              <div className="font-medium">{currency} {monthData.amount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
