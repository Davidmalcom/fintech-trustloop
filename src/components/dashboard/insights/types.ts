export type YtdPoint = { month: string; amount: number }

export type InsightsProps = {
  currency: string
  monthlyProgress: number // 0-100
  monthLabel: string // e.g., "Aug"
  ytd: YtdPoint[]
}
