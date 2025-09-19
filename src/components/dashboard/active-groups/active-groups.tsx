"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import { GroupItem } from "./group-item"
import type { ActiveGroupsProps } from "./types"

export function ActiveGroups({ title = "Your Active Groups", groups }: ActiveGroupsProps) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <a href="/groups">
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="grid gap-3">
        {groups.map((g) => (
          <a key={g.id} href={`/groups/${g.id}`} className="block">
            <Card className="border rounded-xl transition-colors hover:bg-muted/30">
              <GroupItem group={g} />
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}
