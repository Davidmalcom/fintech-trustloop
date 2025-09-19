export type GroupEngagementPoint = { label: string; value: number } // 0-100

export type GroupActivity = {
  id: string
  type: "payment" | "announcement" | "member"
  title: string
  time: string // "2h ago"
}

export type GroupEvent = {
  id: string
  title: string
  dateISO: string
}

export type MemberInsight = {
  id: string
  label: string
  value: string
  hint?: string
}

export type GroupMember = {
  id: string
  name: string
  role?: "admin" | "member" | "treasurer"
  joinedAtISO: string
}

export type GroupProfile = {
  id: string
  name: string
  description: string
  purpose: string
  membersCount: number
  onTimeRate: number // 0-100
  contributionsThisMonth: number
  currency: string
  engagement: GroupEngagementPoint[] // tiny chart
  recentActivities: GroupActivity[]
  memberInsights: MemberInsight[]
  upcomingEvents: GroupEvent[]
  // New
  currentUserIsMember?: boolean
  members?: GroupMember[]
}
