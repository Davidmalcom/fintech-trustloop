"use client"

import type { WelcomeProps } from "./types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Welcome({ name }: WelcomeProps) {
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "TL"

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-emerald-100 text-emerald-800">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="leading-tight">
        <p className="text-xs text-muted-foreground">Welcome back</p>
        <h1 className="text-base font-semibold">Hi, {name}</h1>
      </div>
    </div>
  )
}
