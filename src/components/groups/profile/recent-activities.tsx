"use client"

import type { GroupActivity } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Wallet2, Megaphone } from 'lucide-react'
import { cn } from "@/lib/utils"

function TypeIcon({ type }: { type: GroupActivity["type"] }) {
  const map = {
    payment: { icon: Wallet2, className: "bg-emerald-100 text-emerald-700" },
    announcement: { icon: Megaphone, className: "bg-sky-100 text-sky-700" },
    member: { icon: Users, className: "bg-amber-100 text-amber-700" },
  } as const
  const Icon = map[type].icon
  return (
    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", map[type].className)}>
      <Icon className="h-4 w-4" />
    </div>
  )
}

export function GroupActivities({ activities }: { activities: GroupActivity[] }) {
  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {activities.map((i) => (
            <li key={i.id} className="flex items-start gap-3 p-3">
              <TypeIcon type={i.type} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{i.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{i.time}</p>
              </div>
            </li>
          ))}
          {activities.length === 0 && (
            <li className="p-3 text-sm text-muted-foreground">No activity yet.</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
