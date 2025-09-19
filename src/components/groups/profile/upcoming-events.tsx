"use client"

import type { GroupEvent } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock } from 'lucide-react'

export function GroupUpcoming({ events }: { events: GroupEvent[] }) {
  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {events.map((e) => (
            <li key={e.id} className="flex items-center gap-3 p-3">
              <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
                <CalendarClock className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm">{e.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {new Date(e.dateISO).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "2-digit" })}
                </p>
              </div>
            </li>
          ))}
          {events.length === 0 && (
            <li className="p-3 text-sm text-muted-foreground">No upcoming events.</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
