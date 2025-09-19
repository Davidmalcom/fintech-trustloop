"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppBrand } from "@/components/branding/app-brand"
import { ThemeToggle } from "@/components/dashboard/theme-toggle/theme-toggle"
import { NotificationsButton } from "@/components/dashboard/notifications/notifications-button"
import { mockNotificationsProps } from "@/components/dashboard/notifications/mock"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { mockLoanDashboardData } from "@/components/loans/dashboard/mock-data"
import { OverviewStats } from "@/components/loans/dashboard/overview-stats"
import { ActiveLoans } from "@/components/loans/dashboard/active-loans"
import { PaymentHistorySection } from "@/components/loans/dashboard/payment-history"
import { LoanSuggestions } from "@/components/loans/dashboard/loan-suggestions"
import { QuickActions } from "@/components/loans/dashboard/quick-actions"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function LoansDashboardPage() {
  const [dashboardData, setDashboardData] = React.useState(mockLoanDashboardData)

  const handleMakePayment = (loanId?: string) => {
    // In real app, would navigate to payment page with loan context
    const targetLoan = loanId ? dashboardData.activeLoans.find((l) => l.id === loanId) : null
    console.log("Navigate to payment page", { loanId, targetLoan })
    // For demo, could redirect to /payments with loan context
    window.location.href = `/payments${loanId ? `?loanId=${loanId}` : ""}`
  }

  const handleViewDetails = (loanId: string) => {
    // In real app, would navigate to loan details page
    console.log("View loan details", loanId)
    // Could navigate to /loans/details/[loanId]
  }

  const handleApplyForSuggestion = (suggestionId: string) => {
    // In real app, would navigate to application with pre-filled data
    console.log("Apply for suggested loan", suggestionId)
    window.location.href = "/loans#application"
  }

  const handleNewApplication = () => {
    window.location.href = "/loans"
  }

  const handleViewHistory = () => {
    // In real app, would navigate to full payment history page
    console.log("View full payment history")
  }

  const handleCalculator = () => {
    window.location.href = "/loans#calculator"
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
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <a href="/loans">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggle />
          <NotificationsButton {...mockNotificationsProps} />
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 pt-3">
        <div className="space-y-5">
          {/* Page Header */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-3 text-white">
            <h1 className="text-base font-semibold">My Loans</h1>
            <p className="mt-1 text-[12px] opacity-95">
              Manage your active loans, track payments, and discover new opportunities
            </p>
          </div>

          {/* Overview Stats */}
          <OverviewStats data={dashboardData} />

          {/* Quick Actions */}
          <QuickActions
            activeLoans={dashboardData.activeLoans}
            onNewApplication={handleNewApplication}
            onMakePayment={handleMakePayment}
            onViewHistory={handleViewHistory}
            onCalculator={handleCalculator}
          />

          {/* Active Loans */}
          <ActiveLoans
            loans={dashboardData.activeLoans}
            onMakePayment={handleMakePayment}
            onViewDetails={handleViewDetails}
          />

          {/* Loan Suggestions */}
          <LoanSuggestions suggestions={dashboardData.suggestions} onApply={handleApplyForSuggestion} />

          {/* Recent Payment History */}
          <PaymentHistorySection payments={dashboardData.paymentHistory} limit={5} />
        </div>
        <div className="h-6" />
      </main>

      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
