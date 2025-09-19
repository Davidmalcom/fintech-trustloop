"use client"

import { useState, useMemo } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryFilters } from "@/components/withdrawal/history-filters"
import { HistoryStats } from "@/components/withdrawal/history-stats"
import { TransactionList } from "@/components/withdrawal/transaction-list"
import { SavedMethods } from "@/components/withdrawal/saved-methods"
import { mockWithdrawalHistory, mockSavedMethods, mockWithdrawalStats } from "@/components/withdrawal/history-mock-data"
import type { WithdrawalHistoryFilter, SavedWithdrawalMethod } from "@/components/withdrawal/history-types"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function WithdrawalHistoryPage() {
  const [filters, setFilters] = useState<WithdrawalHistoryFilter>({})
  const [savedMethods, setSavedMethods] = useState(mockSavedMethods)

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    return mockWithdrawalHistory.filter((transaction) => {
      // Status filter
      if (filters.status && transaction.status !== filters.status) {
        return false
      }

      // Method filter
      if (filters.method) {
        const methodType = transaction.method.type || transaction.method.id
        if (methodType !== filters.method) {
          return false
        }
      }

      // Date range filter
      if (filters.dateRange) {
        const transactionDate = transaction.createdAt
        if (filters.dateRange.from && transactionDate < filters.dateRange.from) {
          return false
        }
        if (filters.dateRange.to && transactionDate > filters.dateRange.to) {
          return false
        }
      }

      // Amount range filter
      if (filters.amountRange) {
        if (filters.amountRange.min && transaction.amount < filters.amountRange.min) {
          return false
        }
        if (filters.amountRange.max && transaction.amount > filters.amountRange.max) {
          return false
        }
      }

      return true
    })
  }, [filters])

  // Separate transactions by status
  const completedTransactions = filteredTransactions.filter((t) => t.status === "completed")
  const pendingTransactions = filteredTransactions.filter((t) => t.status === "pending" || t.status === "processing")
  const failedTransactions = filteredTransactions.filter((t) => t.status === "failed" || t.status === "cancelled")

  const handleClearFilters = () => {
    setFilters({})
  }

  const handleEditMethod = (method: SavedWithdrawalMethod) => {
    console.log("Edit method:", method)
    // Implement edit method logic
  }

  const handleDeleteMethod = (methodId: string) => {
    setSavedMethods((prev) => prev.filter((m) => m.id !== methodId))
  }

  const handleSetDefaultMethod = (methodId: string) => {
    setSavedMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === methodId,
      })),
    )
  }

  const handleAddNewMethod = () => {
    console.log("Add new method")
    // Implement add new method logic
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
                <BreadcrumbLink href="/withdrawals">Withdrawals</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>History</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Withdrawal History</h1>
            <p className="text-gray-600">View and manage your withdrawal transactions and methods</p>
          </div>

          {/* Stats Overview */}
          <HistoryStats stats={mockWithdrawalStats} />

          {/* Main Content */}
          <Tabs defaultValue="history" className="space-y-4">
            <TabsList>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="methods">Saved Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-4">
              {/* Filters */}
              <HistoryFilters filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />

              {/* Transaction Lists */}
              <div className="space-y-6">
                {pendingTransactions.length > 0 && (
                  <TransactionList
                    transactions={pendingTransactions}
                    title="Pending & Processing"
                    emptyMessage="No pending withdrawals"
                  />
                )}

                <TransactionList
                  transactions={completedTransactions}
                  title="Completed Withdrawals"
                  emptyMessage="No completed withdrawals found"
                />

                {failedTransactions.length > 0 && (
                  <TransactionList
                    transactions={failedTransactions}
                    title="Failed & Cancelled"
                    emptyMessage="No failed withdrawals"
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="methods">
              <SavedMethods
                methods={savedMethods}
                onEdit={handleEditMethod}
                onDelete={handleDeleteMethod}
                onSetDefault={handleSetDefaultMethod}
                onAddNew={handleAddNewMethod}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
