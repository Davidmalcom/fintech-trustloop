"use client"

import type { WelcomeHeroProps } from "./types"
import { Handshake } from 'lucide-react'

export function WelcomeHero({ name, intro }: WelcomeHeroProps) {
  return (
    <section
      aria-label="Welcome"
      className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-3 text-white shadow-none"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-white/15 p-2">
          <Handshake className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold">{`Welcome back, Hi ${name}`}</h2>
          <p className="mt-1 text-[12px] leading-4 opacity-95">
            {intro ??
              "Save with trusted groups, manage cycles, and grow together. Tap the + to start."}
          </p>
        </div>
      </div>
    </section>
  )
}
