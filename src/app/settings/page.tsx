"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppBrand } from "@/components/branding/app-brand"
import { ThemeToggle } from "@/components/dashboard/theme-toggle/theme-toggle"
import { NotificationsButton } from "@/components/dashboard/notifications/notifications-button"
import { mockNotificationsProps } from "@/components/dashboard/notifications/mock"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AccountSettings } from "@/components/settings/account-settings"
import { PremiumUpgrade } from "@/components/settings/premium-upgrade"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { PrivacySettings } from "@/components/settings/privacy-settings"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function SettingsPage() {
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
          {/* Page Header */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-3 text-white">
            <h1 className="text-base font-semibold">Settings</h1>
            <p className="mt-1 text-[12px] opacity-95">Manage your account, preferences, and security settings</p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-4 space-y-4">
              <AccountSettings />
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="premium" className="mt-4">
              <PremiumUpgrade />
            </TabsContent>

            <TabsContent value="preferences" className="mt-4 space-y-4">
              <NotificationSettings />
              <PrivacySettings />
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
