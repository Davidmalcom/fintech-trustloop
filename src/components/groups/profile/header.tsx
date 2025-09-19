"use client"

import type { GroupProfile } from "./types"
import { Users } from 'lucide-react'

export function GroupHeader({ group }: { group: GroupProfile }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-4 text-white">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-white/15 p-2">
          <Users className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold">{group.name}</h1>
          <p className="mt-1 line-clamp-3 text-[12px] opacity-95">{group.description}</p>
          <p className="mt-2 text-[11px] opacity-95">
            Purpose: <span className="font-medium">{group.purpose}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
