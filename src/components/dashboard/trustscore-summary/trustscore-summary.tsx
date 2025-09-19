"use client"

import type { TrustscoreSummaryProps } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export function TrustscoreSummary({ score, trend, delta, tip }: TrustscoreSummaryProps) {
  const Icon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
  const color = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-amber-600" : "text-muted-foreground"

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">TrustScore Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{score}</div>
          <p className="text-xs text-muted-foreground">Current score</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon className={cn("h-5 w-5", color)} />
          <span className={cn("text-sm font-medium", color)}>
            {delta > 0 ? "+" : ""}
            {delta}
          </span>
        </div>
        <div className="max-w-[50%] text-xs text-muted-foreground">{tip}</div>
      </CardContent>
    </Card>
  )
}
