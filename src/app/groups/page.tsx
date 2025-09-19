"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppBrand } from "@/components/branding/app-brand"

import { ThemeToggle } from "@/components/dashboard/theme-toggle/theme-toggle"
import { NotificationsButton } from "@/components/dashboard/notifications/notifications-button"
import { mockNotificationsProps } from "@/components/dashboard/notifications/mock"

import { GroupList } from "@/components/groups/group-list"
import { GroupsActions } from "@/components/groups/actions"
import { GroupsSearch } from "@/components/groups/search"
import { mockGroupsData } from "@/components/groups/mock"
import type { GroupsData } from "@/components/groups/types"

import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"
import { CreateFab } from "@/components/fab/create-fab"

export default function GroupsPage() {
  const [query, setQuery] = React.useState("")
  const [tab, setTab] = React.useState<"my" | "discover">("my")
  const [data, setData] = React.useState<GroupsData>(mockGroupsData)

  // Open dialogs based on hash
  const [openCreate, setOpenCreate] = React.useState(false)
  const [openJoin, setOpenJoin] = React.useState(false)

  React.useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash
      setOpenCreate(hash === "#create")
      setOpenJoin(hash === "#join")
      if (hash === "#discover") setTab("discover")
      if (hash === "#my") setTab("my")
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [])

  const closeDialogs = () => {
    setOpenCreate(false)
    setOpenJoin(false)
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", "/groups")
    }
  }

  // Create/Join handlers simulate updates
  function handleCreateGroup(input: { name: string; contribution: number; frequency: string }) {
    const newGroup = {
      id: `g_${Date.now()}`,
      name: input.name,
      nextPaymentDate: "Sep 10",
      nextPaymentAmountLabel: `${mockGroupsData.currency} ${input.contribution.toLocaleString()}`,
      trustScoreAvg: 90,
      members: 1,
    }
    setData((prev) => ({ ...prev, myGroups: [newGroup, ...prev.myGroups] }))
    closeDialogs()
  }

  function handleJoinGroup(input: { code: string }) {
    // Mock: Move first discover group to myGroups if any
    if (data.discover.length > 0) {
      const [first, ...rest] = data.discover
      setData((prev) => ({
        ...prev,
        myGroups: [first, ...prev.myGroups],
        discover: rest,
      }))
    }
    closeDialogs()
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-background">
      {/* Top navigation with sidebar trigger, brand, and actions */}
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
        <div className="space-y-4">
          <GroupsActions
            openCreate={openCreate}
            openJoin={openJoin}
            setOpenCreate={(v) => {
              setOpenCreate(v)
              if (v) location.hash = "#create"
              else if (location.hash === "#create") history.replaceState(null, "", "/groups")
            }}
            setOpenJoin={(v) => {
              setOpenJoin(v)
              if (v) location.hash = "#join"
              else if (location.hash === "#join") history.replaceState(null, "", "/groups")
            }}
            onCreate={handleCreateGroup}
            onJoin={handleJoinGroup}
          />

          <GroupsSearch
            query={query}
            onQueryChange={setQuery}
            tab={tab}
            onTabChange={setTab}
          />

          {tab === "my" ? (
            <GroupList
              title="My Groups"
              groups={data.myGroups}
              query={query}
              emptyMessage="You haven’t joined any groups yet."
            />
          ) : (
            <GroupList
              title="Discover"
              groups={data.discover}
              query={query}
              emptyMessage="No groups match your search."
            />
          )}
        </div>
        <div className="h-6" />
      </main>

      <CreateFab href="/groups#create" label="Create Group" />
      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
