"use client"

import { useState } from "react"
import { SavingsOverview } from "@/components/savings/dashboard/savings-overview"
import { AccountDetails } from "@/components/savings/dashboard/account-details"
import { QuickActions } from "@/components/savings/dashboard/quick-actions"
import { TransactionHistory } from "@/components/savings/dashboard/transaction-history"
import { SavingsTypeSelector } from "@/components/savings/onboarding/savings-type-selector"
import { AccountSetup, type AccountSetupData } from "@/components/savings/onboarding/account-setup"
import { SuggestedPlans } from "@/components/savings/onboarding/suggested-plans"
import { DepositForm, type DepositData } from "@/components/savings/forms/deposit-form"
import { WithdrawalForm, type WithdrawalData } from "@/components/savings/forms/withdrawal-form"
import { mockSavingsAccounts, mockTransactions } from "@/components/savings/mock-data"
import type { SavingsType, SavingsAccount, SavingsPlan } from "@/components/savings/types"
import { toast } from "@/hooks/use-toast"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

type ViewState = "dashboard" | "onboarding-type" | "onboarding-setup" | "onboarding-plans" | "deposit" | "withdraw"

export default function SavingsPage() {
  const [currentView, setCurrentView] = useState<ViewState>("dashboard")
  const [accounts, setAccounts] = useState<SavingsAccount[]>(mockSavingsAccounts)
  const [transactions, setTransactions] = useState(mockTransactions)
  const [selectedSavingsType, setSelectedSavingsType] = useState<SavingsType | undefined>(undefined)
  const [setupData, setSetupData] = useState<AccountSetupData | null>(null)
  const [selectedAccountId, setSelectedAccountId] = useState<string>("")

  const handleCreateNewAccount = () => {
    setCurrentView("onboarding-type")
  }

  const handleTypeSelection = (type: SavingsType) => {
    setSelectedSavingsType(type)
    setCurrentView("onboarding-setup")
  }

  const handleSetupComplete = (data: AccountSetupData) => {
    setSetupData(data)
    if (data.targetAmount && data.targetDate) {
      setCurrentView("onboarding-plans")
    } else {
      handleCreateAccount(data)
    }
  }

  const handlePlanSelection = (plan: SavingsPlan) => {
    if (setupData) {
      handleCreateAccount({
        ...setupData,
        autoSaveEnabled: true,
        autoSaveAmount: plan.monthlyAmount,
        autoSaveFrequency: "monthly",
      })
    }
  }

  const handleSkipPlans = () => {
    if (setupData) {
      handleCreateAccount(setupData)
    }
  }

  const handleCreateAccount = (data: AccountSetupData) => {
    if (!selectedSavingsType) return

    const newAccount: SavingsAccount = {
      id: Date.now().toString(),
      name: data.name,
      type: selectedSavingsType,
      balance: 0,
      targetAmount: data.targetAmount,
      targetDate: data.targetDate?.toISOString(),
      interestRate: selectedSavingsType.interestRate,
      createdAt: new Date().toISOString(),
      isActive: true,
      autoSaveEnabled: data.autoSaveEnabled,
      autoSaveAmount: data.autoSaveAmount,
      autoSaveFrequency: data.autoSaveFrequency,
      nextAutoSave: data.autoSaveEnabled ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : undefined,
    }

    setAccounts([...accounts, newAccount])
    setCurrentView("dashboard")
    setSelectedSavingsType(undefined)
    setSetupData(null)

    toast({
      title: "Account Created Successfully!",
      description: `Your ${newAccount.name} account has been set up.`,
    })
  }

  const handleDeposit = (accountId: string) => {
    setSelectedAccountId(accountId)
    setCurrentView("deposit")
  }

  const handleWithdraw = (accountId: string) => {
    setSelectedAccountId(accountId)
    setCurrentView("withdraw")
  }

  const handleDepositSubmit = (data: DepositData) => {
    // Update account balance
    setAccounts(
      accounts.map((acc) => (acc.id === data.accountId ? { ...acc, balance: acc.balance + data.amount } : acc)),
    )

    // Add transaction
    const newTransaction = {
      id: Date.now().toString(),
      accountId: data.accountId,
      type: "deposit" as const,
      amount: data.amount,
      description: data.description || "Deposit",
      timestamp: new Date().toISOString(),
      status: "completed" as const,
      method: data.method,
    }
    setTransactions([newTransaction, ...transactions])

    setCurrentView("dashboard")
    toast({
      title: "Deposit Successful!",
      description: `KES ${data.amount.toLocaleString()} has been added to your account.`,
    })
  }

  const handleWithdrawSubmit = (data: WithdrawalData) => {
    // Update account balance
    setAccounts(
      accounts.map((acc) => (acc.id === data.accountId ? { ...acc, balance: acc.balance - data.amount } : acc)),
    )

    // Add transaction
    const newTransaction = {
      id: Date.now().toString(),
      accountId: data.accountId,
      type: "withdrawal" as const,
      amount: data.amount,
      description: `Withdrawal - ${data.reason}`,
      timestamp: new Date().toISOString(),
      status: "completed" as const,
    }
    setTransactions([newTransaction, ...transactions])

    setCurrentView("dashboard")
    toast({
      title: "Withdrawal Successful!",
      description: `KES ${data.amount.toLocaleString()} has been withdrawn from your account.`,
    })
  }

  const handleToggleAutoSave = (accountId: string, enabled: boolean) => {
    setAccounts(accounts.map((acc) => (acc.id === accountId ? { ...acc, autoSaveEnabled: enabled } : acc)))

    toast({
      title: enabled ? "Auto-Save Enabled" : "Auto-Save Disabled",
      description: enabled ? "Automatic savings will continue as scheduled." : "Automatic savings have been paused.",
    })
  }

  const handleQuickDeposit = () => {
    if (accounts.length === 0) {
      toast({
        title: "No Accounts Found",
        description: "Please create a savings account first.",
        variant: "destructive",
      })
      return
    }
    setSelectedAccountId(accounts[0].id)
    setCurrentView("deposit")
  }

  const handleQuickWithdraw = () => {
    if (accounts.length === 0) {
      toast({
        title: "No Accounts Found",
        description: "Please create a savings account first.",
        variant: "destructive",
      })
      return
    }
    setSelectedAccountId(accounts[0].id)
    setCurrentView("withdraw")
  }

  const handleExportTransactions = () => {
    toast({
      title: "Export Started",
      description: "Your transaction history is being prepared for download.",
    })
  }

  const handleFilterTransactions = () => {
    toast({
      title: "Filter Options",
      description: "Transaction filtering will be available soon.",
    })
  }

  // Render different views based on current state
  switch (currentView) {
    case "onboarding-type":
      return (
        <div className="container mx-auto px-4 py-8">
          <SavingsTypeSelector onSelect={handleTypeSelection} selectedType={selectedSavingsType} />
        </div>
      )

    case "onboarding-setup":
      return (
        <div className="container mx-auto px-4 py-8">
          {selectedSavingsType && <AccountSetup savingsType={selectedSavingsType} onComplete={handleSetupComplete} />}
        </div>
      )

    case "onboarding-plans":
      return (
        <div className="container mx-auto px-4 py-8">
          {setupData?.targetAmount && setupData?.targetDate && (
            <SuggestedPlans
              targetAmount={setupData.targetAmount}
              targetDate={setupData.targetDate}
              onSelectPlan={handlePlanSelection}
              onSkip={handleSkipPlans}
            />
          )}
        </div>
      )

    case "deposit":
      return (
        <div className="container mx-auto px-4 py-8">
          <DepositForm
            accounts={accounts}
            selectedAccountId={selectedAccountId}
            onDeposit={handleDepositSubmit}
            onCancel={() => setCurrentView("dashboard")}
          />
        </div>
      )

    case "withdraw":
      return (
        <div className="container mx-auto px-4 py-8">
          <WithdrawalForm
            accounts={accounts}
            selectedAccountId={selectedAccountId}
            onWithdraw={handleWithdrawSubmit}
            onCancel={() => setCurrentView("dashboard")}
          />
        </div>
      )

    default:
      return (
        <div className="container mx-auto px-4 py-8 space-y-8">
          <SavingsOverview accounts={accounts} onCreateNew={handleCreateNewAccount} />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <AccountDetails
                accounts={accounts}
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
                onToggleAutoSave={handleToggleAutoSave}
              />

              <TransactionHistory
                transactions={transactions}
                onExport={handleExportTransactions}
                onFilter={handleFilterTransactions}
              />
            </div>

            <div>
              <QuickActions
                onNewAccount={handleCreateNewAccount}
                onQuickDeposit={handleQuickDeposit}
                onQuickWithdraw={handleQuickWithdraw}
                onViewGoals={() =>
                  toast({ title: "Coming Soon", description: "Goal tracking will be available soon." })
                }
                onViewReports={() =>
                  toast({ title: "Coming Soon", description: "Savings reports will be available soon." })
                }
                onSettings={() => toast({ title: "Coming Soon", description: "Settings will be available soon." })}
              />
            </div>
          </div>
          <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
        </div>
      )
  }
}
