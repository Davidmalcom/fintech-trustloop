"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FundBreakdown } from "@/components/withdrawal/fund-breakdown"
import { SecurityBadge } from "@/components/withdrawal/security-badge"
import { WithdrawalForm } from "@/components/withdrawal/withdrawal-form"
import { SuccessScreen } from "@/components/withdrawal/success-screen"
import {
  mockFundSources,
  mockWithdrawalMethods,
  mockWithdrawalLimits,
  getTotalAvailableFunds,
} from "@/components/withdrawal/mock-data"
import type { WithdrawalRequest, WithdrawalTransaction } from "@/components/withdrawal/types"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function WithdrawalsPage() {
  const [currentStep, setCurrentStep] = useState<"form" | "success">("form")
  const [completedTransaction, setCompletedTransaction] = useState<WithdrawalTransaction | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const totalAvailable = getTotalAvailableFunds()

  const handleWithdrawalSubmit = async (request: WithdrawalRequest) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create mock transaction
      const transaction: WithdrawalTransaction = {
        id: `wd_${Date.now()}`,
        reference: `TL-WD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        amount: request.amount,
        fee: request.methodId === "mpesa" ? 25 : request.amount * 0.005,
        totalAmount: request.amount + (request.methodId === "mpesa" ? 25 : request.amount * 0.005),
        source: mockFundSources.find((s) => s.id === request.sourceId)!,
        method: mockWithdrawalMethods.find((m) => m.id === request.methodId)!,
        destinationDetails: request.destinationDetails,
        status: "processing",
        createdAt: new Date(),
        estimatedCompletion: new Date(Date.now() + (request.methodId === "mpesa" ? 0 : 3 * 24 * 60 * 60 * 1000)),
        notes: request.notes,
      }

      setCompletedTransaction(transaction)
      setCurrentStep("success")
    } catch (error) {
      console.error("Withdrawal failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewWithdrawal = () => {
    setCurrentStep("form")
    setCompletedTransaction(null)
  }

  const handleViewHistory = () => {
    // Navigate to withdrawal history page
    window.location.href = "/withdrawals/history"
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Withdrawals</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {currentStep === "form" ? (
            <>
              {/* Page Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Withdraw Funds</h1>
                <p className="text-gray-600">Securely withdraw your available funds to your preferred destination</p>
              </div>

              {/* Security Badge */}
              <SecurityBadge />

              {/* Fund Breakdown */}
              <FundBreakdown fundSources={mockFundSources} totalAmount={totalAvailable} />

              {/* Withdrawal Form */}
              <WithdrawalForm
                fundSources={mockFundSources}
                withdrawalMethods={mockWithdrawalMethods}
                limits={mockWithdrawalLimits}
                onSubmit={handleWithdrawalSubmit}
                isLoading={isLoading}
              />
            </>
          ) : (
            <>
              {/* Success Screen */}
              <div className="space-y-2 mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Withdrawal Complete</h1>
                <p className="text-gray-600">Your withdrawal has been processed successfully</p>
              </div>

              {completedTransaction && (
                <SuccessScreen
                  transaction={completedTransaction}
                  onNewWithdrawal={handleNewWithdrawal}
                  onViewHistory={handleViewHistory}
                />
              )}
            </>
          )}
        </div>
        <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
