"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Smartphone, Building, CreditCard, RefreshCw } from "lucide-react"
import type { FundSource, WithdrawalMethod, WithdrawalLimits, WithdrawalRequest, WithdrawalFormData } from "./types"
import { formatCurrency, calculateWithdrawalFee } from "./mock-data"

interface WithdrawalFormProps {
  fundSources: FundSource[]
  withdrawalMethods: WithdrawalMethod[]
  limits: WithdrawalLimits
  onSubmit: (request: WithdrawalRequest) => void
  isLoading: boolean
}

export function WithdrawalForm({ fundSources, withdrawalMethods, limits, onSubmit, isLoading }: WithdrawalFormProps) {
  const [formData, setFormData] = useState<WithdrawalFormData>({
    amount: "",
    sourceId: "",
    methodId: "",
    destinationDetails: {},
    notes: "",
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const selectedSource = fundSources.find((s) => s.id === formData.sourceId)
  const selectedMethod = withdrawalMethods.find((m) => m.id === formData.methodId)
  const amount = Number.parseFloat(formData.amount) || 0
  const fee = selectedMethod ? calculateWithdrawalFee(amount, selectedMethod) : 0
  const totalAmount = amount + fee

  const getMethodIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone":
        return Smartphone
      case "Building":
        return Building
      case "CreditCard":
        return CreditCard
      default:
        return CreditCard
    }
  }

  const handleAmountChange = (value: string) => {
    setFormData((prev) => ({ ...prev, amount: value }))
  }

  const handleWithdrawAll = () => {
    if (selectedSource) {
      setFormData((prev) => ({ ...prev, amount: selectedSource.amount.toString() }))
    }
  }

  const handleDestinationDetailChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      destinationDetails: {
        ...prev.destinationDetails,
        [fieldName]: value,
      },
    }))
  }

  const validateForm = () => {
    if (!amount || amount <= 0) return false
    if (!formData.sourceId || !formData.methodId) return false
    if (selectedSource && amount > selectedSource.amount) return false
    if (selectedMethod) {
      if (amount < selectedMethod.minAmount || amount > selectedMethod.maxAmount) return false
      // Check if all required fields are filled
      const requiredFields = selectedMethod.fields.filter((f) => f.required)
      for (const field of requiredFields) {
        if (!formData.destinationDetails[field.name]) return false
      }
    }
    return true
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const request: WithdrawalRequest = {
      amount,
      sourceId: formData.sourceId,
      methodId: formData.methodId,
      destinationDetails: formData.destinationDetails,
      notes: formData.notes,
    }

    onSubmit(request)
    setShowConfirmation(false)
  }

  const isFormValid = validateForm()
  const exceedsSourceAmount = selectedSource && amount > selectedSource.amount
  const belowMinAmount = selectedMethod && amount < selectedMethod.minAmount
  const aboveMaxAmount = selectedMethod && amount > selectedMethod.maxAmount

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Withdrawal Amount (KES)</Label>
            <div className="flex space-x-2">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleWithdrawAll} disabled={!selectedSource}>
                Withdraw All
              </Button>
            </div>
            {exceedsSourceAmount && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Amount exceeds available funds in selected source
              </p>
            )}
            {belowMinAmount && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Minimum amount: {formatCurrency(selectedMethod.minAmount)}
              </p>
            )}
            {aboveMaxAmount && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Maximum amount: {formatCurrency(selectedMethod.maxAmount)}
              </p>
            )}
          </div>

          {/* Fund Source Selection */}
          <div className="space-y-2">
            <Label>Fund Source</Label>
            <Select
              value={formData.sourceId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, sourceId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fund source" />
              </SelectTrigger>
              <SelectContent>
                {fundSources.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{source.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {formatCurrency(source.amount)}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Withdrawal Method Selection */}
          <div className="space-y-2">
            <Label>Withdrawal Method</Label>
            <Select
              value={formData.methodId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, methodId: value, destinationDetails: {} }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                {withdrawalMethods.map((method) => {
                  const IconComponent = getMethodIcon(method.icon)
                  return (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-xs text-gray-500">{method.processingTime}</p>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Destination Fields */}
          {selectedMethod && (
            <div className="space-y-4">
              <Label className="text-base font-medium">Destination Details</Label>
              {selectedMethod.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {field.type === "select" ? (
                    <Select
                      value={formData.destinationDetails[field.name] || ""}
                      onValueChange={(value) => handleDestinationDetailChange(field.name, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData.destinationDetails[field.name] || ""}
                      onChange={(e) => handleDestinationDetailChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Fee Summary */}
          {amount > 0 && selectedMethod && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Withdrawal Amount:</span>
                <span>{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Fee:</span>
                <span>{formatCurrency(fee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Deduction:</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button className="w-full" onClick={() => setShowConfirmation(true)} disabled={!isFormValid || isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Review Withdrawal"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Withdrawal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Withdrawal Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Source:</span>
                  <span>{selectedSource?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span>{selectedMethod?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span>{selectedMethod?.processingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span>{formatCurrency(fee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Deduction:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Please review the details above. Once confirmed, this withdrawal cannot be cancelled.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Confirm Withdrawal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
