"use client"

import type { GroupProfile } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Percent, Wallet2 } from "lucide-react"

export function GroupStats({ group }: { group: GroupProfile }) {
  const max = Math.max(...group.engagement.map((p) => p.value), 1)
  const membersCount = group.members ? group.members.length : group.membersCount

  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        <Card className="rounded-xl border">
          <CardContent className="p-3 text-center">
            <Users className="mx-auto h-5 w-5 text-emerald-600" />
            <div className="mt-1 text-sm font-semibold">{membersCount}</div>
            <div className="text-[11px] text-muted-foreground">Members</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border">
          <CardContent className="p-3 text-center">
            <Percent className="mx-auto h-5 w-5 text-amber-600" />
            <div className="mt-1 text-sm font-semibold">{group.onTimeRate}%</div>
            <div className="text-[11px] text-muted-foreground">On-time rate</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border">
          <CardContent className="p-3 text-center">
            <Wallet2 className="mx-auto h-5 w-5 text-sky-600" />
            <div className="mt-1 text-sm font-semibold">
              {group.currency} {group.contributionsThisMonth.toLocaleString()}
            </div>
            <div className="text-[11px] text-muted-foreground">This month</div>
          </CardContent>
        </Card>
      </div>

      {/* Tiny engagement chart */}
      <Card className="mt-3 rounded-xl border">
        <CardContent className="p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span>Engagement trend</span>
            <span className="text-muted-foreground">last 6 months</span>
          </div>
          <div className="relative h-24 w-full rounded-md bg-muted/40 p-2">
            <div className="absolute inset-2 flex items-end gap-1.5">
              {group.engagement.map((p, i) => {
                const h = Math.round((p.value / max) * 100)
                return (
                  <div key={i} className="flex-1">
                    <div
                      className="mx-auto w-full rounded-t bg-emerald-500/85 dark:bg-emerald-400"
                      style={{ height: `${Math.max(6, h)}%` }}
                      title={`${p.label}: ${p.value}%`}
                      aria-label={`${p.label} ${p.value}%`}
                    />
                  </div>
                )
              })}
            </div>
            <div className="absolute inset-x-2 bottom-1 flex justify-between text-[10px] text-muted-foreground">
              {group.engagement.map((p, i) => (
                <span key={i}>{p.label}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
