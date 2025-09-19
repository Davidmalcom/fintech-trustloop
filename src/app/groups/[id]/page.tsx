"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppBrand } from "@/components/branding/app-brand"
import { ThemeToggle } from "@/components/dashboard/theme-toggle/theme-toggle"
import { NotificationsButton } from "@/components/dashboard/notifications/notifications-button"
import { mockNotificationsProps } from "@/components/dashboard/notifications/mock"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"

import { getMockGroupById } from "@/components/groups/profile/mock"
import { GroupHeader } from "@/components/groups/profile/header"
import { GroupStats } from "@/components/groups/profile/stats"
import { GroupUpcoming } from "@/components/groups/profile/upcoming-events"
import { GroupActivities } from "@/components/groups/profile/recent-activities"
import { GroupMemberInsights } from "@/components/groups/profile/member-insights"
import { GroupMembers } from "@/components/groups/profile/members"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function GroupProfilePage() {
  const params = useParams<{ id: string }>()
  const id = params?.id ?? "g1"
  const initial = React.useMemo(() => getMockGroupById(id), [id])
  const [group, setGroup] = React.useState(initial)

  function handleJoin() {
    if (group.currentUserIsMember) return
    const you = {
      id: "me",
      name: "You",
      role: "member" as const,
      joinedAtISO: new Date().toISOString(),
    }
    setGroup((prev) => ({
      ...prev,
      currentUserIsMember: true,
      members: [you, ...(prev.members ?? [])],
      membersCount: (prev.members?.length ?? prev.membersCount) + 1,
      recentActivities: [
        { id: `join_${Date.now()}`, type: "member", title: "You joined the group", time: "just now" },
        ...prev.recentActivities,
      ],
    }))
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-background">
      {/* Top navigation */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <AppBrand />
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <NotificationsButton {...mockNotificationsProps} />
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 pt-3">
        <div className="space-y-5">
          <GroupHeader group={group} />
          <GroupStats group={group} />
          <GroupUpcoming events={group.upcomingEvents} />
          <GroupActivities activities={group.recentActivities} />
          <GroupMemberInsights insights={group.memberInsights} />
          <GroupMembers members={group.members ?? []} isMember={!!group.currentUserIsMember} onJoin={handleJoin} />
        </div>
        <div className="h-6" />
      </main>

      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
