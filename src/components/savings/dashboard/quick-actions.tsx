"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpRight, ArrowDownLeft, Target, BarChart3, Settings } from "lucide-react"

interface QuickActionsProps {
  onNewAccount: () => void
  onQuickDeposit: () => void
  onQuickWithdraw: () => void
  onViewGoals: () => void
  onViewReports: () => void
  onSettings: () => void
}

export function QuickActions({
  onNewAccount,
  onQuickDeposit,
  onQuickWithdraw,
  onViewGoals,
  onViewReports,
  onSettings,
}: QuickActionsProps) {
  const actions = [
    {
      title: "New Account",
      description: "Create a new savings account",
      icon: Plus,
      onClick: onNewAccount,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Quick Deposit",
      description: "Add money to your savings",
      icon: ArrowUpRight,
      onClick: onQuickDeposit,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Quick Withdraw",
      description: "Withdraw from your savings",
      icon: ArrowDownLeft,
      onClick: onQuickWithdraw,
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "View Goals",
      description: "Track your savings goals",
      icon: Target,
      onClick: onViewGoals,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Reports",
      description: "View savings analytics",
      icon: BarChart3,
      onClick: onViewReports,
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: "Settings",
      description: "Manage your preferences",
      icon: Settings,
      onClick: onSettings,
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to manage your savings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all bg-transparent"
              onClick={action.onClick}
            >
              <div className={`p-2 rounded-full text-white ${action.color}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
