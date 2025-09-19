import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

// Dashboard components
import { WelcomeHero } from "@/components/dashboard/welcome-hero/welcome-hero"
import { SummaryCard } from "@/components/dashboard/summary-card/summary-card"
import { QuickActions } from "@/components/dashboard/quick-actions/quick-actions"
import { ActiveGroups } from "@/components/dashboard/active-groups/active-groups"
import { TrustscoreSummary } from "@/components/dashboard/trustscore-summary/trustscore-summary"
import { RecentActivity } from "@/components/dashboard/recent-activity/recent-activity"
import { UpcomingActivity } from "@/components/dashboard/upcoming-activity/upcoming-activity"
import { MotivationCard } from "@/components/dashboard/motivation-card/motivation-card"
import { Insights } from "@/components/dashboard/insights/insights"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel/notifications-panel"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { CreateFab } from "@/components/fab/create-fab"
import { ThemeToggle } from "@/components/dashboard/theme-toggle/theme-toggle"
import { NotificationsButton } from "@/components/dashboard/notifications/notifications-button"
import { TopNavUser } from "@/components/dashboard/top-nav-user"

// Mock data
import { mockWelcomeHeroProps } from "@/components/dashboard/welcome-hero/mock"
import { mockSummaryCardProps } from "@/components/dashboard/summary-card/mock"
import { mockQuickActionsProps } from "@/components/dashboard/quick-actions/mock"
import { mockActiveGroupsProps } from "@/components/dashboard/active-groups/mock"
import { mockTrustscoreSummaryProps } from "@/components/dashboard/trustscore-summary/mock"
import { mockRecentActivityProps } from "@/components/dashboard/recent-activity/mock"
import { mockUpcomingActivityProps } from "@/components/dashboard/upcoming-activity/mock"
import { mockMotivationCardProps } from "@/components/dashboard/motivation-card/mock"
import { mockInsightsProps } from "@/components/dashboard/insights/mock"
import { mockNotificationsPanelProps } from "@/components/dashboard/notifications-panel/mock"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"
import { mockNotificationsProps } from "@/components/dashboard/notifications/mock"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Top Navigation */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <NotificationsButton {...mockNotificationsProps} />
            <TopNavUser />
          </div>
        </header>

        {/* Main Content - Original Layout Restored */}
        <main className="flex-1 p-4 pb-20 md:pb-4 space-y-6 max-w-7xl mx-auto w-full">
          <WelcomeHero {...mockWelcomeHeroProps} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-6">
              <SummaryCard {...mockSummaryCardProps} />
              <QuickActions {...mockQuickActionsProps} />
              <MotivationCard {...mockMotivationCardProps} />
            </div>

            <div className="space-y-6">
              <ActiveGroups {...mockActiveGroupsProps} />
              <TrustscoreSummary {...mockTrustscoreSummaryProps} />
            </div>

            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              <RecentActivity {...mockRecentActivityProps} />
              <UpcomingActivity {...mockUpcomingActivityProps} />
              <Insights {...mockInsightsProps} />
              <NotificationsPanel {...mockNotificationsPanelProps} />
            </div>
          </div>
        </main>

        {/* Floating Create action */}
        <CreateFab href="/groups/create" label="Create Group" />

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
