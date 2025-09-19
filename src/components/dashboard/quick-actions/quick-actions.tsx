"use client"

import type { QuickActionsProps } from "./types"
import { Button } from "@/components/ui/button"
import { Users, PlusCircle, Send, UserPlus } from 'lucide-react'
import { cn } from "@/lib/utils"

export function QuickActions({ actions }: QuickActionsProps) {
  const iconFor = (id: string) =>
    id === "join" ? Users :
    id === "create" ? PlusCircle :
    id === "send" ? Send :
    UserPlus

  return (
    <section aria-label="Quick actions" className="rounded-xl border bg-card p-2">
      <div className="mb-2 px-1 text-sm font-semibold">Quick Actions</div>
      {/* Responsive grid: 2 cols on small, 3 on wider phones, 4 on large phones */}
      <div className="grid grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-4 gap-2">
        {actions.map((a) => {
          const Icon = iconFor(a.id)
          const emphasis = a.id === "create"
          return (
            <Button
              key={a.id}
              variant={emphasis ? "default" : "secondary"}
              className={cn(
                "h-20 sm:h-24 flex flex-col items-center justify-center gap-2 rounded-xl",
                emphasis && "bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white"
              )}
              asChild
            >
              <a href={a.href}>
                <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", emphasis ? "text-white" : "text-emerald-700")} />
                <span className="text-[11px] sm:text-xs">{a.label}</span>
              </a>
            </Button>
          )
        })}
      </div>
    </section>
  )
}
