"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, CreditCard, Smartphone, Building, ArrowRight } from "lucide-react"
import type { SavingsAccount } from "../types"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

interface DepositFormProps {
  accounts: SavingsAccount[]
  selectedAccountId?: string
  onDeposit: (data: DepositData) => void
  onCancel: () => void
}

export interface DepositData {
  accountId: string
  amount: number
  method: string
  description?: string
}

const paymentMethods = [
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: Smartphone,
    description: "Instant transfer from M-Pesa",
    fee: 0,
    processingTime: "Instant",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building,
    description: "Transfer from your bank account",
    fee: 50,
    processingTime: "1-2 hours",
  },
  {
    id: "card",
    name: "Debit/Credit Card",
    icon: CreditCard,
    description: "Pay with your card",
    fee: 25,
    processingTime: "Instant",
  },
]

const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000]

export function DepositForm({ accounts, selectedAccountId, onDeposit, onCancel }: DepositFormProps) {
  const [formData, setFormData] = useState<DepositData>({
    accountId: selectedAccountId || "",
    amount: 0,
    method: "",
  })
  const [selectedMethod, setSelectedMethod] = useState<(typeof paymentMethods)[0] | null>(null)

  const selectedAccount = accounts.find((acc) => acc.id === formData.accountId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onDeposit(formData)
  }

  const handleQuickAmount = (amount: number) => {
    setFormData({ ...formData, amount })
  }

  const handleMethodSelect = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId)
    setSelectedMethod(method || null)
    setFormData({ ...formData, method: methodId })
  }

  const totalAmount = formData.amount + (selectedMethod?.fee || 0)

  return (
    <>
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Deposit to Savings</CardTitle>
        <CardDescription>Add money to your savings account securely</CardDescription>
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
          <Shield className="h-4 w-4" />
          <span>Your deposits are protected and insured</span>
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
                  <span>Current Balance:</span>
                  <span className="font-medium">KES {selectedAccount.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Interest Rate:</span>
                  <span className="font-medium text-green-600">{selectedAccount.interestRate}% p.a.</span>
                </div>
              </div>
            )}
          </div>

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
                min={selectedAccount?.type.minDeposit || 1}
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(amount)}
                  className={formData.amount === amount ? "bg-blue-50 border-blue-300" : ""}
                >
                  {amount >= 1000 ? `${amount / 1000}K` : amount}
                </Button>
              ))}
            </div>

            {selectedAccount && formData.amount > 0 && (
              <div className="text-sm text-gray-600">
                Minimum deposit: KES {selectedAccount.type.minDeposit.toLocaleString()}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Payment Method *</Label>
            <div className="grid gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                const isSelected = selectedMethod?.id === method.id

                return (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleMethodSelect(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{method.fee === 0 ? "Free" : `KES ${method.fee}`}</p>
                        <p className="text-xs text-gray-500">{method.processingTime}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="e.g., Monthly savings, Emergency fund top-up"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Summary */}
          {formData.amount > 0 && selectedMethod && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <h4 className="font-medium">Transaction Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Deposit Amount:</span>
                  <span>KES {formData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>{selectedMethod.fee === 0 ? "Free" : `KES ${selectedMethod.fee}`}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-1">
                  <span>Total:</span>
                  <span>KES {totalAmount.toLocaleString()}</span>
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
              disabled={!formData.accountId || !formData.amount || !formData.method}
            >
              Deposit KES {formData.amount.toLocaleString()}
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
