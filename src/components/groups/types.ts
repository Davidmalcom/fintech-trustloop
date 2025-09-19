export type SimpleGroup = {
  id: string
  name: string
  nextPaymentDate: string
  nextPaymentAmountLabel: string
  trustScoreAvg: number
  members?: number
}

export type GroupsData = {
  currency: string
  myGroups: SimpleGroup[]
  discover: SimpleGroup[]
}
