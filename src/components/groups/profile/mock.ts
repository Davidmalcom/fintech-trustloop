import type { GroupProfile } from "./types"

const baseMembers = [
  { id: "u1", name: "Amina Yusuf", role: "treasurer", joinedAtISO: new Date(Date.now() - 180 * 864e5).toISOString() },
  { id: "u2", name: "Zuri N.", role: "admin", joinedAtISO: new Date(Date.now() - 300 * 864e5).toISOString() },
  { id: "u3", name: "Ayo K.", role: "member", joinedAtISO: new Date(Date.now() - 90 * 864e5).toISOString() },
  { id: "u4", name: "Sam W.", role: "member", joinedAtISO: new Date(Date.now() - 30 * 864e5).toISOString() },
]

const base: GroupProfile = {
  id: "g1",
  name: "Mama Mboga Chama",
  description: "A trusted market sellers circle saving together for school fees and emergencies.",
  purpose: "Support each other's goals through regular contributions and fair payouts.",
  membersCount: baseMembers.length,
  onTimeRate: 92,
  contributionsThisMonth: 45000,
  currency: "KES",
  engagement: [
    { label: "Mar", value: 60 },
    { label: "Apr", value: 68 },
    { label: "May", value: 72 },
    { label: "Jun", value: 80 },
    { label: "Jul", value: 76 },
    { label: "Aug", value: 84 },
  ],
  recentActivities: [
    { id: "a1", type: "payment", title: "Amina contributed KES 5,000", time: "2h ago" },
    { id: "a2", type: "announcement", title: "Cycle 4 starts Sep 02", time: "1d ago" },
    { id: "a3", type: "member", title: "Ayo joined the group", time: "3d ago" },
  ],
  memberInsights: [
    { id: "m1", label: "Top Contributor", value: "Amina", hint: "Consistent weekly contributions" },
    { id: "m2", label: "New Members (30d)", value: "3" },
    { id: "m3", label: "Attendance Rate", value: "95%", hint: "Meeting participation" },
  ],
  upcomingEvents: [
    { id: "e1", title: "Weekly contribution due", dateISO: new Date(Date.now() + 3 * 864e5).toISOString() },
    { id: "e2", title: "Payout to Zuri", dateISO: new Date(Date.now() + 10 * 864e5).toISOString() },
  ],
  currentUserIsMember: true,
  members: baseMembers,
}

export function getMockGroupById(id: string): GroupProfile {
  if (id === "g2") {
    const members = [
      ...baseMembers,
      { id: "u5", name: "Ken M.", role: "member", joinedAtISO: new Date(Date.now() - 10 * 864e5).toISOString() },
    ]
    return {
      ...base,
      id,
      name: "Diaspora Builders",
      description: "Diaspora community saving to invest in local projects.",
      membersCount: members.length,
      onTimeRate: 88,
      contributionsThisMonth: 90000,
      engagement: base.engagement.map((p, i) => ({ ...p, value: Math.min(100, p.value + (i % 3 === 0 ? 8 : 0)) })),
      currentUserIsMember: true,
      members,
    }
  }
  if (id === "g3") {
    // Not a member yet
    return {
      ...base,
      id,
      name: "Sisters Circle",
      membersCount: baseMembers.length,
      onTimeRate: 95,
      contributionsThisMonth: 27000,
      currentUserIsMember: false,
      members: baseMembers,
    }
  }
  return { ...base, id }
}
