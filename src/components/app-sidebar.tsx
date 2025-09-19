"use client"

import type * as React from "react"
import {
  GalleryVerticalEnd,
  Home,
  Users,
  CreditCard,
  PiggyBank,
  Banknote,
  TrendingUp,
  MessageSquare,
  ArrowDownToLine,
  FileText,
  Bell,
  Settings,
  HelpCircle,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@trustloop.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: "TrustLoop Personal",
      logo: GalleryVerticalEnd,
      plan: "Personal",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      items: [
        {
          title: "Home Page",
          url: "/dashboard",
        },]
  
    },
    {
      title: "Groups",
      url: "/groups",
      icon: Users,
      items: [
        {
          title: "My Groups",
          url: "/groups",
        },
        {
          title: "Join Group",
          url: "/groups",
        },
        {
          title: "Create Group",
          url: "/groups/create",
        },
        {
          title: "My Chama",
          url: "/chama",
        },
      ],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
      items: [
        {
          title: "Make Payments",
          url: "/payments",
        },
      ],
    },
    {
      title: "Savings",
      url: "/savings",
      icon: PiggyBank,
      items: [
        {
          title: "My Savings",
          url: "/savings",
        },
      ],
    },
    {
      title: "Loans",
      url: "/loans",
      icon: Banknote,
      items: [
        {
          title: "my Loans",
          url: "/loans/dashboard",
        },
        {
          title: "Apply for Loan",
          url: "/loans",
        },
        {
          title: "Make Payment",
          url: "/loans/payment",
        },
        {
          title: "Loan History",
          url: "/loans",
        },
      ],
    },
    {
      title: "Investments",
      url: "/investments",
      icon: TrendingUp,
      items: [
        {
          title: "View your Investments",
          url: "/investments",
        },
      ]
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageSquare,
      items: [
        {
          title: "Group Chats",
          url: "/chat",
        },
        {
          title: "AI Assistant",
          url: "/chat/bot",
        },
        {
          title: "New Chat",
          url: "/chat/new",
        },
      ],
    },
    {
      title: "Withdrawals",
      url: "/withdrawals",
      icon: ArrowDownToLine,
      items: [
        {
          title: "New Withdrawal",
          url: "/withdrawals",
        },
        {
          title: "Withdrawal History",
          url: "/withdrawals/history",
        },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
      items: [
        {
          title: "View Reports",
          url: "/reports",
          icon: FileText,
        },]
    },
  ],
  projects: [
    {
      name: "Notifications",
      url: "/notifications",
      icon: Bell,
      actions: [
        { name: "Mark all read", action: "mark-read" },
        { name: "Notification settings", action: "settings" },
        { name: "Clear all", action: "clear" },
      ],
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Settings,
      actions: [
        { name: "Account settings", action: "account" },
        { name: "Privacy settings", action: "privacy" },
        { name: "Security settings", action: "security" },
      ],
    },
    {
      name: "Help & Support",
      url: "/help",
      icon: HelpCircle,
      actions: [
        { name: "Contact support", action: "contact", icon: <HelpCircle className="h-4 w-4" /> },
        { name: "User guide", action: "guide" },
        { name: "FAQ", action: "faq" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
