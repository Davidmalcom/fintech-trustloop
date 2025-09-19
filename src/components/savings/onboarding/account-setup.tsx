"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Target, Repeat } from "lucide-react"
import { format } from "date-fns"
import type { SavingsType } from "../types"

interface AccountSetupProps {
  savingsType: SavingsType
  onComplete: (data: AccountSetupData) => void
}

export interface AccountSetupData {
  name: string
  targetAmount?: number
  targetDate?: Date
  autoSaveEnabled: boolean
  autoSaveAmount?: number
  autoSaveFrequency?: "daily" | "weekly" | "monthly"
}

export function AccountSetup({ savingsType, onComplete }: AccountSetupProps) {
  const [formData, setFormData] = useState<AccountSetupData>({
    name: "",
    autoSaveEnabled: false,
  })
  const [targetDate, setTargetDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete({
      ...formData,
      targetDate,
    })
  }

  const isGoalBased = savingsType.id === "goal"

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Set Up Your {savingsType.name}</CardTitle>
        <CardDescription>Customize your savings account to match your financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Name */}
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name *</Label>
            <Input
              id="accountName"
              placeholder="e.g., Emergency Fund, Holiday Savings, Dream Car"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500">Give your savings account a meaningful name to stay motivated</p>
          </div>

          {/* Target Amount (for goal-based or optional for others) */}
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount {isGoalBased ? "*" : "(Optional)"}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">KES</span>
              <Input
                id="targetAmount"
                type="number"
                placeholder="100,000"
                className="pl-12"
                value={formData.targetAmount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetAmount: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                required={isGoalBased}
              />
            </div>
            {isGoalBased && (
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <Target className="h-4 w-4" />
                <span>Setting a target helps track your progress and earn milestone rewards</span>
              </div>
            )}
          </div>

          {/* Target Date */}
          {(isGoalBased || formData.targetAmount) && (
            <div className="space-y-2">
              <Label>Target Date {isGoalBased ? "*" : "(Optional)"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, "PPP") : "Select target date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Auto-Save Toggle */}
          <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center space-x-2">
                  <Repeat className="h-4 w-4 text-green-600" />
                  <span>Enable Auto-Save</span>
                </Label>
                <p className="text-sm text-gray-600">Automatically save a fixed amount at regular intervals</p>
              </div>
              <Switch
                checked={formData.autoSaveEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, autoSaveEnabled: checked })}
              />
            </div>

            {formData.autoSaveEnabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="autoSaveAmount">Amount (KES)</Label>
                  <Input
                    id="autoSaveAmount"
                    type="number"
                    placeholder="5,000"
                    value={formData.autoSaveAmount || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        autoSaveAmount: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    required={formData.autoSaveEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select
                    value={formData.autoSaveFrequency}
                    onValueChange={(value: "daily" | "weekly" | "monthly") =>
                      setFormData({ ...formData, autoSaveFrequency: value })
                    }
                    required={formData.autoSaveEnabled}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Account Type Summary */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Account Summary</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>• Interest Rate: {savingsType.interestRate}% per annum</p>
              <p>• Minimum Deposit: KES {savingsType.minDeposit.toLocaleString()}</p>
              <p>• Type: {savingsType.name}</p>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Create Savings Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
