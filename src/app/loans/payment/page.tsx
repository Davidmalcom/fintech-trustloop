"use client"
import { useSearchParams } from "next/navigation"
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
import { LoanPaymentForm } from "@/components/loans/payment/loan-payment-form"
import { LoanPaymentSummary } from "@/components/loans/payment/loan-payment-summary"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function LoanPaymentPage() {
  const searchParams = useSearchParams()
  const loanId = searchParams.get("loanId")??"loan_001"

  const selectedLoan = mockLoanDashboardData.activeLoans.find((loan) => loan.id === loanId)

  if (!selectedLoan) {
    return (
      <div className="mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold">Loan Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground">The selected loan could not be found.</p>
          <Button className="mt-4" asChild>
            <a href="/loans/dashboard">Back to Dashboard</a>
          </Button>
        </div>
      </div>
    )
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
            <a href="/loans/dashboard">
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
            <h1 className="text-base font-semibold">Loan Payment</h1>
            <p className="mt-1 text-[12px] opacity-95">Make a payment for your {selectedLoan.loanTypeName}</p>
          </div>

          {/* Loan Summary */}
          <LoanPaymentSummary loan={selectedLoan} />

          {/* Payment Form */}
          <LoanPaymentForm loan={selectedLoan} />
        </div>
        <div className="h-6" />
      </main>

      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
