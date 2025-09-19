"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, AlertTriangle, ArrowRight, Info } from "lucide-react"
import type { SavingsAccount } from "../types"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

interface WithdrawalFormProps {
  accounts: SavingsAccount[]
  selectedAccountId?: string
  onWithdraw: (data: WithdrawalData) => void
  onCancel: () => void
}

export interface WithdrawalData {
  accountId: string
  amount: number
  reason: string
  confirmed: boolean
}

const withdrawalReasons = [
  "Emergency expense",
  "Planned purchase",
  "Investment opportunity",
  "Transfer to another account",
  "Personal use",
  "Other",
]

export function WithdrawalForm({ accounts, selectedAccountId, onWithdraw, onCancel }: WithdrawalFormProps) {
  const [formData, setFormData] = useState<WithdrawalData>({
    accountId: selectedAccountId || "",
    amount: 0,
    reason: "",
    confirmed: false,
  })

  const selectedAccount = accounts.find((acc) => acc.id === formData.accountId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onWithdraw(formData)
  }

  const getWithdrawalWarnings = () => {
    if (!selectedAccount) return []

    const warnings = []

    if (selectedAccount.type.id === "fixed") {
      warnings.push("Early withdrawal from Fixed Deposit may incur penalties")
    }

    if (selectedAccount.type.id === "goal" && selectedAccount.targetAmount) {
      const progress = (selectedAccount.balance / selectedAccount.targetAmount) * 100
      if (progress > 50) {
        warnings.push("Withdrawing now may affect your goal completion bonus")
      }
    }

    if (formData.amount > selectedAccount.balance * 0.5) {
      warnings.push("Large withdrawal may significantly impact your savings progress")
    }

    return warnings
  }

  const warnings = getWithdrawalWarnings()
  const maxWithdrawal = selectedAccount?.balance || 0
  const dailyLimit = selectedAccount?.type.maxWithdrawal || 100000

  return (
    <>
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Withdraw from Savings</CardTitle>
        <CardDescription>Withdraw money from your savings account</CardDescription>
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
          <Shield className="h-4 w-4" />
          <span>Your withdrawals are secure and protected</span>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Selection */}
          <div className="space-y-2">
            <Label htmlFor="account">Select Account *</Label>
            <Select
              value={formData.accountId}
              onValueChange={(value) => setFormData({ ...formData, accountId: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose savings account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{account.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {account.type.name}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedAccount && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between text-sm">
                  <span>Available Balance:</span>
                  <span className="font-medium">KES {selectedAccount.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily Limit:</span>
                  <span className="font-medium">KES {dailyLimit.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Withdrawal Rules */}
          {selectedAccount && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <p className="font-medium mb-2">Withdrawal Rules for {selectedAccount.type.name}:</p>
                <ul className="text-sm space-y-1">
                  {selectedAccount.type.withdrawalRules.map((rule, index) => (
                    <li key={index}>• {rule}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KES) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">KES</span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                className="pl-12 text-lg"
                value={formData.amount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: e.target.value ? Number(e.target.value) : 0,
                  })
                }
                required
                min={1}
                max={Math.min(maxWithdrawal, dailyLimit)}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Minimum: KES 1</span>
              <span>Maximum: KES {Math.min(maxWithdrawal, dailyLimit).toLocaleString()}</span>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Withdrawal *</Label>
            <Select
              value={formData.reason}
              onValueChange={(value) => setFormData({ ...formData, reason: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {withdrawalReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Warnings */}
          {warnings.length > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription>
                <p className="font-medium text-yellow-800 mb-2">Please Note:</p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Confirmation */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirm"
              checked={formData.confirmed}
              onCheckedChange={(checked) => setFormData({ ...formData, confirmed: !!checked })}
            />
            <Label htmlFor="confirm" className="text-sm">
              I understand the withdrawal rules and confirm this transaction
            </Label>
          </div>

          {/* Summary */}
          {formData.amount > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <h4 className="font-medium">Withdrawal Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Withdrawal Amount:</span>
                  <span>KES {formData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Balance:</span>
                  <span>KES {(maxWithdrawal - formData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Processing Time:</span>
                  <span>Instant</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!formData.accountId || !formData.amount || !formData.reason || !formData.confirmed}
            >
              Withdraw KES {formData.amount.toLocaleString()}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    <div className="h-16"></div>
    <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
              </>
  )
}
