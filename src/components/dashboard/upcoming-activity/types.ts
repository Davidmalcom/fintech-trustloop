export type Money = {
  currency: string // e.g., "KES", "USD"
  amount: number
}

export type DatedAmount = {
  dateISO: string // ISO 8601 date string
  amount: Money
  label?: string
}

export type UpcomingActivityProps = {
  nextContribution: DatedAmount
  nextPayout: DatedAmount
}
