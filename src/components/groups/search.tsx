"use client"

import * as React from "react"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function GroupsSearch({
  query,
  onQueryChange,
  tab,
  onTabChange,
  className,
}: {
  query: string
  onQueryChange: (v: string) => void
  tab: "my" | "discover"
  onTabChange: (v: "my" | "discover") => void
  className?: string
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-2", className)}>
      <div className="mb-2 flex items-center gap-1 rounded-lg bg-muted p-1">
        <Button
          size="sm"
          variant={tab === "my" ? "secondary" : "ghost"}
          className="h-7 flex-1"
          onClick={() => {
            onTabChange("my")
            if (location.pathname === "/groups") history.replaceState(null, "", "/groups#my")
          }}
        >
          My Groups
        </Button>
        <Button
          size="sm"
          variant={tab === "discover" ? "secondary" : "ghost"}
          className="h-7 flex-1"
          onClick={() => {
            onTabChange("discover")
            if (location.pathname === "/groups") history.replaceState(null, "", "/groups#discover")
          }}
        >
          Discover
        </Button>
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search groups..."
          className="pl-8"
          inputMode="search"
        />
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <Button asChild size="sm" variant="outline" className="h-8">
          <a href="/groups#join">Join</a>
        </Button>
        <Button asChild size="sm" className="h-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <a href="/groups#create">Create</a>
        </Button>
      </div>
    </div>
  )
}
