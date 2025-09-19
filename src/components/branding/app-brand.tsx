"use client"

import { InfinityIcon } from 'lucide-react'

export function AppBrand() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-md bg-gradient-to-br from-emerald-600 via-amber-500 to-sky-600 p-1">
        <div className="rounded-sm bg-background p-1">
          <InfinityIcon className="h-4 w-4 text-emerald-600" />
        </div>
      </div>
      {/* <span className="text-base font-semibold">TrustLoop</span> */}
    </div>
  )
}
