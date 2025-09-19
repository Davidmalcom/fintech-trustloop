"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Wallet, Lock, Target, TrendingUp, Calendar, Repeat, Settings } from "lucide-react"
import type { SavingsAccount } from "../types"
import { format } from "date-fns"

interface AccountDetailsProps {
  accounts: SavingsAccount[]
  onDeposit: (accountId: string) => void
  onWithdraw: (accountId: string) => void
  onToggleAutoSave: (accountId: string, enabled: boolean) => void
}

const iconMap = {
  wallet: Wallet,
  lock: Lock,
  target: Target,
}

const colorMap = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
}

export function AccountDetails({ accounts, onDeposit, onWithdraw, onToggleAutoSave }: AccountDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Your Savings Accounts</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {accounts.map((account) => {
          const Icon = iconMap[account.type.icon as keyof typeof iconMap]
          const progress = account.targetAmount ? (account.balance / account.targetAmount) * 100 : 0
          const monthlyInterest = (account.balance * account.interestRate) / 100 / 12

          return (
            <Card key={account.id} className="overflow-hidden">
              <CardHeader
                className={`bg-gradient-to-r ${colorMap[account.type.color as keyof typeof colorMap]} text-white`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{account.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {account.type.name}
                  </Badge>
                </div>
                <CardDescription className="text-white/90">{account.interestRate}% annual interest</CardDescription>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Balance */}
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">KES {account.balance.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Current Balance</p>
                </div>

                {/* Progress (if target set) */}
                {account.targetAmount && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Goal</span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>KES {account.balance.toLocaleString()}</span>
                      <span>KES {account.targetAmount.toLocaleString()}</span>
                    </div>
                    {account.targetDate && (
                      <p className="text-xs text-gray-500 text-center">
                        Target: {format(new Date(account.targetDate), "MMM dd, yyyy")}
                      </p>
                    )}
                  </div>
                )}

                {/* Monthly Interest */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Monthly Interest</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">+KES {monthlyInterest.toFixed(0)}</span>
                </div>

                {/* Auto-Save Status */}
                {account.autoSaveEnabled && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Repeat className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Auto-Save Active</p>
                        <p className="text-xs text-gray-500">
                          KES {account.autoSaveAmount?.toLocaleString()} {account.autoSaveFrequency}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={account.autoSaveEnabled}
                      onCheckedChange={(checked) => onToggleAutoSave(account.id, checked)}
                    />
                  </div>
                )}

                {/* Next Auto-Save */}
                {account.autoSaveEnabled && account.nextAutoSave && (
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Next auto-save: {format(new Date(account.nextAutoSave), "MMM dd, yyyy")}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button onClick={() => onDeposit(account.id)} className="flex-1" size="sm">
                    Deposit
                  </Button>
                  <Button onClick={() => onWithdraw(account.id)} variant="outline" className="flex-1" size="sm">
                    Withdraw
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
