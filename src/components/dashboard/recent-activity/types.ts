export type ActivityType = "payment" | "announcement" | "member"

export type ActivityItem = {
  id: string
  type: ActivityType
  title: string
  time: string // e.g., "2h ago"
}

export type RecentActivityProps = {
  items: ActivityItem[]
}
