"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Wallet2 } from "lucide-react"

import { MpesaSection } from "@/components/payments/mpesa"
import { MpesaPaybillSection } from "@/components/payments/mpesa-paybill"
import { CardSection } from "@/components/payments/card"
import { BankTransferSection } from "@/components/payments/bank"
import type { ActiveLoan } from "../dashboard/types"

export function LoanPaymentForm({ loan }: { loan: ActiveLoan }) {
  const [paymentType, setPaymentType] = React.useState<"full" | "partial" | "custom">("full")
  const [customAmount, setCustomAmount] = React.useState("")
  const [autoPayEnabled, setAutoPayEnabled] = React.useState(false)

  const getPaymentAmount = () => {
    switch (paymentType) {
      case "full":
        return loan.remainingBalance
      case "partial":
        return loan.monthlyPayment
      case "custom":
        return Number(customAmount) || 0
      default:
        return loan.monthlyPayment
    }
  }

  const paymentAmount = getPaymentAmount()

  // Mock payment context for existing payment components
  const paymentContext = {
    id: loan.id,
    name: `${loan.loanTypeName} Payment`,
    amount: paymentAmount,
    currency: loan.currency,
  }

  return (
    <div className="space-y-4">
      {/* Payment Amount Selection */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Payment Amount</CardTitle>
          <p className="text-xs text-muted-foreground">Choose how much you want to pay</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={paymentType} onValueChange={(value) => setPaymentType(value as any)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partial" id="partial" />
              <Label htmlFor="partial" className="flex-1">
                <div className="flex justify-between items-center">
                  <span>Monthly Payment</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {loan.currency} {loan.monthlyPayment.toLocaleString()}
                  </Badge>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full" className="flex-1">
                <div className="flex justify-between items-center">
                  <span>Pay Off Loan (Full Balance)</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {loan.currency} {loan.remainingBalance.toLocaleString()}
                  </Badge>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="flex-1">
                <div className="space-y-2">
                  <span>Custom Amount</span>
                  {paymentType === "custom" && (
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min={1}
                      max={loan.remainingBalance}
                    />
                  )}
                </div>
              </Label>
            </div>
          </RadioGroup>

          {/* Payment Summary */}
          <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-emerald-800">Payment Amount:</span>
              <span className="text-lg font-bold text-emerald-800">
                {loan.currency} {paymentAmount.toLocaleString()}
              </span>
            </div>
            {paymentType === "full" && (
              <p className="text-xs text-emerald-700 mt-1">
                This will fully pay off your loan. No more payments required!
              </p>
            )}
            {paymentType === "custom" && paymentAmount > loan.monthlyPayment && (
              <p className="text-xs text-emerald-700 mt-1">
                Extra payment will reduce your remaining balance and future payments.
              </p>
            )}
          </div>

          {/* Auto-pay Option */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="autopay"
              checked={autoPayEnabled}
              onCheckedChange={(checked) => setAutoPayEnabled(checked as boolean)}
            />
            <Label htmlFor="autopay" className="text-xs leading-relaxed">
              Enable auto-pay for future monthly payments (you can disable this anytime in settings)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Payment Method</CardTitle>
          <p className="text-xs text-muted-foreground">Choose how you want to pay</p>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="mpesa-stk" className="w-full">
            <div className="px-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mpesa-stk">M-Pesa STK</TabsTrigger>
                <TabsTrigger value="mpesa-paybill">M-Pesa Paybill</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="mpesa-stk" className="mt-3 px-3 pb-3">
              <MpesaSection targetGroup={paymentContext} />
            </TabsContent>
            <TabsContent value="mpesa-paybill" className="mt-3 px-3 pb-3">
              <MpesaPaybillSection targetGroup={paymentContext} />
            </TabsContent>
          </Tabs>

          <div className="px-3">
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Card</TabsTrigger>
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="mt-3">
                <CardSection targetGroup={paymentContext} />
              </TabsContent>
              <TabsContent value="bank" className="mt-3">
                <BankTransferSection targetGroup={paymentContext} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Payment Benefits */}
      <Card className="rounded-xl border border-emerald-200 bg-emerald-50/30">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Wallet2 className="h-4 w-4 text-emerald-600" />
            <h4 className="text-sm font-medium text-emerald-800">Payment Benefits</h4>
          </div>
          <ul className="text-xs text-emerald-700 space-y-1">
            <li>• Instant payment confirmation and receipt</li>
            <li>• Automatic loan balance update</li>
            <li>• Improved credit score with on-time payments</li>
            {paymentType === "full" && <li>• No more interest charges after full payment</li>}
            {paymentAmount > loan.monthlyPayment && <li>• Reduced total interest with extra payments</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
