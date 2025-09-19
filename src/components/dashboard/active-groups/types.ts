export type Group = {
  id: string
  name: string
  nextPaymentDate: string // e.g. "Aug 28"
  nextPaymentAmountLabel: string // e.g. "KES 5,000"
  trustScoreAvg: number // 0-100
}

export type ActiveGroupsProps = {
  title?: string
  groups: Group[]
}
