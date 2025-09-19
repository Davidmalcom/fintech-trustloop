"use client"

import { GroupCard } from "./group-card"
import type { SimpleGroup } from "./types"

export function GroupList({
  title,
  groups,
  query,
  emptyMessage,
}: {
  title: string
  groups: SimpleGroup[]
  query: string
  emptyMessage: string
}) {
  const q = query.trim().toLowerCase()
  const filtered = groups.filter((g) => g.name.toLowerCase().includes(q))

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
        <a href="/groups#discover" className="text-xs text-emerald-700 hover:underline">
          {title === "My Groups" ? "Discover" : "See all"}
        </a>
      </div>
      <div className="grid gap-3">
        {filtered.length > 0 ? (
          filtered.map((g) => <GroupCard key={g.id} group={g} />)
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        )}
      </div>
    </section>
  )
}
