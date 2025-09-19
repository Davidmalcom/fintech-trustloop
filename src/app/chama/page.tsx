"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppBrand } from "@/components/branding/app-brand"
import { ThemeToggle } from "@/components/dashboard/theme-toggle/theme-toggle"
import { NotificationsButton } from "@/components/dashboard/notifications/notifications-button"
import { mockNotificationsProps } from "@/components/dashboard/notifications/mock"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { mockChamaData } from "@/components/chama/mock-data"
import { TreasurerDashboard } from "@/components/chama/dashboard/treasurer-dashboard"
import { InvestmentList } from "@/components/chama/investments/investment-list"
import { GroupChat } from "@/components/chama/communication/group-chat"
import { Announcements } from "@/components/chama/communication/announcements"
import { InvitationManager } from "@/components/chama/invitations/invitation-manager"
import { hasPermission } from "@/components/chama/permissions"
import type { ChatMessage } from "@/components/chama/types"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function ChamaPage() {
  const [chama, setChama] = React.useState(mockChamaData)

  const canManageFinances = hasPermission(chama.currentUserRole, "manage_finances")
  const canPostAnnouncements = hasPermission(chama.currentUserRole, "post_announcements")
  const canManageMembers = hasPermission(chama.currentUserRole, "manage_members")
  const canApproveInvestments = hasPermission(chama.currentUserRole, "approve_investments")

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: chama.currentUserId,
      senderName: "You",
      content,
      type: "text",
      timestamp: new Date().toISOString(),
    }

    setChama((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMessage],
    }))
  }

  const handleCreateInvite = (phone: string, email?: string) => {
    const newInvite = {
      id: `inv_${Date.now()}`,
      invitedBy: chama.currentUserId,
      invitedByName: "You",
      phone,
      email,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      inviteCode: `TL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    }

    setChama((prev) => ({
      ...prev,
      invitations: [newInvite, ...prev.invitations],
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
        <div className="space-y-4">
          {/* Page title */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-3 text-white">
            <h1 className="text-base font-semibold">{chama.name}</h1>
            <p className="mt-1 text-[12px] opacity-95">
              Chama management • {chama.totalMembers} members • {chama.currency} {chama.totalFunds.toLocaleString()}
            </p>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="investments">Invest</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-4">
              {canManageFinances ? (
                <TreasurerDashboard chama={chama} />
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-sm text-muted-foreground">Member dashboard coming soon</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="investments" className="mt-4">
              <InvestmentList investments={chama.investments} canPropose={canApproveInvestments} />
            </TabsContent>

            <TabsContent value="chat" className="mt-4 space-y-4">
              <Announcements announcements={chama.announcements} canPost={canPostAnnouncements} />
              <GroupChat
                messages={chama.chatMessages}
                currentUserId={chama.currentUserId}
                onSendMessage={handleSendMessage}
              />
            </TabsContent>

            <TabsContent value="members" className="mt-4">
              <InvitationManager
                invitations={chama.invitations}
                canInvite={canManageMembers}
                onCreateInvite={handleCreateInvite}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="h-6" />
      </main>

      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
