"use client"

import type { BottomNavItem, BottomNavProps } from "./types"
import { Home, Users, CreditCard, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"
const iconFor = (id: BottomNavItem["id"]) =>
  id === "home" ? Home :
  id === "groups" ? Users :
  id === "payments" ? CreditCard :
  id === "chat" ? MessageSquare :
  User

export function BottomNav({ active, items }: BottomNavProps) {
  // Ensure we do not render the 'create' item even if passed.
  const filtered = items.filter((i) => i.id !== "create")

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-6 py-2 pb-[env(safe-area-inset-bottom)]">
        {filtered.map((item) => {
          const Icon = iconFor(item.id)
          const isActive = item.id === active
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-full px-3 py-1.5 text-xs",
                isActive ? "text-emerald-700" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-emerald-600" : "text-muted-foreground")} />
              <span className="text-[11px]">{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
