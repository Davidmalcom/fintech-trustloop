"use client"

import * as React from "react"
import { Bell, CalendarClock, Users, Wallet2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { NotificationItem, NotificationsProps } from "./types"

function TypeIcon({ type }: { type: NotificationItem["type"] }) {
  const iconMap = {
    reminder: {
      icon: CalendarClock,
      className: "text-amber-700 bg-amber-100",
      label: "Reminder",
    },
    announcement: {
      icon: Users,
      className: "text-sky-700 bg-sky-100",
      label: "Announcement",
    },
    payment: {
      icon: Wallet2,
      className: "text-emerald-700 bg-emerald-100",
      label: "Payment",
    },
  } as const

  const config = iconMap[type]
  if (!config) {
    // Fallback for unknown types
    const Icon = Bell
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
        <Icon className="h-4 w-4" />
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div
      className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", config.className)}
      aria-hidden="true"
    >
      <Icon className="h-4 w-4" />
    </div>
  )
}

export function NotificationsButton({ items }: NotificationsProps) {
  const [open, setOpen] = React.useState(false)
  const count = items.length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? "Close notifications" : `Open notifications (${count})`}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-amber-500 px-1 text-center text-[10px] font-medium text-white"
            >
              {count}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(92vw,360px)] p-0" sideOffset={8}>
        <Card className="border-0 shadow-none">
          <div className="flex items-center justify-between px-3 py-2">
            <h3 className="text-sm font-semibold">Notifications</h3>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
          <ul className="max-h-[50svh] divide-y overflow-auto">
            {items.map((n) => (
              <li key={n.id} className="flex items-start gap-3 p-3">
                <TypeIcon type={n.type} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{n.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
                </div>
              </li>
            ))}
            {items.length === 0 && (
              <li className="p-4 text-center text-sm text-muted-foreground">You're all caught up.</li>
            )}
          </ul>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
