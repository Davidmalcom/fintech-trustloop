"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ShieldCheck, Users } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { SimpleGroup } from "./types"

export function GroupCard({ group }: { group: SimpleGroup }) {
  return (
    <a href={`/groups/${group.id}`} className="block">
      <Card className="rounded-xl border transition-colors hover:bg-muted/30">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <p className="truncate text-sm font-medium">{group.name}</p>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {"Next: "}
                  {group.nextPaymentDate} • {group.nextPaymentAmountLabel}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge
                variant="outline"
                className={cn(
                  "border-emerald-200 text-emerald-700 bg-emerald-50",
                  "px-2 py-0.5 text-[11px] font-medium"
                )}
              >
                <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                {"TrustScore "}{group.trustScoreAvg}
              </Badge>
              {group.members != null && (
                <div className="text-[11px] text-muted-foreground">{group.members} members</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
