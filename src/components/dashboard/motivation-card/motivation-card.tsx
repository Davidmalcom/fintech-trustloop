"use client"

import type { MotivationCardProps } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { HeartHandshake } from 'lucide-react'

export function MotivationCard({ mode, text, author }: MotivationCardProps) {
  return (
    <Card className="rounded-xl border overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 via-amber-500 to-sky-600 px-3 py-2 text-white text-xs font-medium">
        {mode === "quote" ? "Community Quote" : "Success Story"}
      </div>
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <HeartHandshake className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-sm">{text}</p>
            {author && <p className="mt-1 text-[11px] text-muted-foreground">— {author}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
