"use client"

import type { MemberInsight } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GroupMemberInsights({ insights }: { insights: MemberInsight[] }) {
  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Member Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {insights.map((ins) => (
            <div key={ins.id} className="rounded-md border p-3">
              <div className="text-xs text-muted-foreground">{ins.label}</div>
              <div className="text-sm font-medium">{ins.value}</div>
              {ins.hint && <div className="mt-0.5 text-[11px] text-muted-foreground">{ins.hint}</div>}
            </div>
          ))}
          {insights.length === 0 && <div className="text-sm text-muted-foreground">No insights yet.</div>}
        </div>
      </CardContent>
    </Card>
  )
}
