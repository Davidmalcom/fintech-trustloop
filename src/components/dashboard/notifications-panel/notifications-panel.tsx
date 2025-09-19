"use client"

import type { NotificationsPanelProps } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from 'lucide-react'

export function NotificationsPanel({ items }: NotificationsPanelProps) {
  return (
    <section aria-label="Notifications">
      <Card className="overflow-hidden rounded-xl border-0 shadow-sm">
        {/* Gradient strip header for visual appeal */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-sky-600 px-3 py-2 text-white">
          <Bell className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Notifications</h3>
        </div>
        <CardContent className="p-0">
          <ul className="divide-y">
            {items.map((n) => (
              <li key={n.id} className="flex items-start gap-3 p-3">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{n.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
                </div>
              </li>
            ))}
            {items.length === 0 && (
              <li className="p-4 text-center text-sm text-muted-foreground">No alerts.</li>
            )}
          </ul>
          <div className="flex justify-end px-3 py-2">
            <a href="#" className="text-xs font-medium text-emerald-700 hover:underline">View all</a>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
