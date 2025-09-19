"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PiggyBank, TrendingUp, Target, Plus, Eye, EyeOff } from "lucide-react"
import type { SavingsAccount } from "../types"
import { useState } from "react"

interface SavingsOverviewProps {
  accounts: SavingsAccount[]
  onCreateNew: () => void
}

export function SavingsOverview({ accounts, onCreateNew }: SavingsOverviewProps) {
  const [showBalances, setShowBalances] = useState(true)

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const totalTarget = accounts.reduce((sum, account) => sum + (account.targetAmount || 0), 0)
  const totalProgress = totalTarget > 0 ? (totalBalance / totalTarget) * 100 : 0

  const monthlyInterest = accounts.reduce((sum, account) => {
    return sum + (account.balance * account.interestRate) / 100 / 12
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Savings</h1>
          <p className="text-gray-600">Track your progress and grow your wealth</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setShowBalances(!showBalances)}>
            {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button onClick={onCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            New Account
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showBalances ? `KES ${totalBalance.toLocaleString()}` : "••••••"}</div>
            <p className="text-xs text-muted-foreground">
              Across {accounts.length} account{accounts.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Interest</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {showBalances ? `+KES ${monthlyInterest.toFixed(0)}` : "••••••"}
            </div>
            <p className="text-xs text-muted-foreground">Estimated earnings this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProgress.toFixed(0)}%</div>
            <Progress value={totalProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auto-Save</CardTitle>
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.filter((a) => a.autoSaveEnabled).length}</div>
            <p className="text-xs text-muted-foreground">Accounts with auto-save enabled</p>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Message */}
      {totalProgress > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">
                  {totalProgress >= 100
                    ? "🎉 Congratulations!"
                    : totalProgress >= 75
                      ? "Almost there!"
                      : totalProgress >= 50
                        ? "Great progress!"
                        : totalProgress >= 25
                          ? "Keep it up!"
                          : "You're on your way!"}
                </h3>
                <p className="text-sm text-green-700">
                  {totalProgress >= 100
                    ? "You've reached your savings goals!"
                    : `You're ${totalProgress.toFixed(0)}% of the way to your savings goals. Keep going!`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
