export type TrustTrend = "up" | "down" | "flat"

export type TrustscoreSummaryProps = {
  score: number // 0-100
  trend: TrustTrend
  delta: number // e.g., +3 or -2 over last period
  tip: string
}
