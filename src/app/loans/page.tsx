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
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

import { LoanTypes } from "@/components/loans/loan-types"
import { LoanCalculator } from "@/components/loans/loan-calculator"
import { LoanApplicationForm } from "@/components/loans/application-form"
import { FAQSection } from "@/components/loans/faq-section"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

type ViewState = "overview" | "application"

export default function LoansPage() {
  const [viewState, setViewState] = React.useState<ViewState>("overview")
  const [selectedLoanTypeId, setSelectedLoanTypeId] = React.useState<string>()
  const [applicationSubmitted, setApplicationSubmitted] = React.useState(false)

  const handleApplyForLoan = (loanTypeId: string) => {
    setSelectedLoanTypeId(loanTypeId)
    setViewState("application")
  }

  const handleBackToOverview = () => {
    setViewState("overview")
    setSelectedLoanTypeId(undefined)
  }

  const handleSubmitApplication = (formData: any) => {
    // In real app, would submit to API
    console.log("Submitting loan application:", formData)
    setApplicationSubmitted(true)

    // Reset after 3 seconds for demo
    setTimeout(() => {
      setApplicationSubmitted(false)
      setViewState("overview")
      setSelectedLoanTypeId(undefined)
    }, 3000)
  }

  if (applicationSubmitted) {
    return (
      <div className="mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center bg-background px-4">
        <Card className="w-full rounded-xl border">
          <CardContent className="p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <h1 className="mt-4 text-lg font-semibold">Application Submitted!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your loan application has been received and is under review. You'll be notified of the decision within the
              processing time.
            </p>
            <div className="mt-4 rounded-lg bg-emerald-50 p-3">
              <p className="text-xs text-emerald-800">
                <strong>Next Steps:</strong> Our team will review your application and contact your guarantors for
                verification. Keep your phone accessible for any follow-up questions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (viewState === "application") {
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
          <LoanApplicationForm
            selectedLoanTypeId={selectedLoanTypeId}
            onBack={handleBackToOverview}
            onSubmit={handleSubmitApplication}
          />
          <div className="h-6" />
        </main>

        <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
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
          <ThemeToggle />
          <NotificationsButton {...mockNotificationsProps} />
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 pt-3">
        <div className="space-y-4">
          {/* Page title */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-3 text-white">
            <h1 className="text-base font-semibold">Loans & Credit</h1>
            <p className="mt-1 text-[12px] opacity-95">
              Access affordable loans designed for chama members with competitive rates and flexible terms
            </p>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="loans" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="loans">Loan Options</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="loans" className="mt-4">
              <LoanTypes onApply={handleApplyForLoan} />
            </TabsContent>

            <TabsContent value="calculator" className="mt-4">
              <LoanCalculator />
            </TabsContent>

            <TabsContent value="faq" className="mt-4">
              <FAQSection />
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
