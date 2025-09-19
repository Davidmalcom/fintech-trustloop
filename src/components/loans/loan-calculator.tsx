"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, DollarSign } from "lucide-react"
import type { LoanCalculation } from "./types"
import { loanTypes } from "./mock-data"

function calculateLoan(principal: number, annualRate: number, termMonths: number): LoanCalculation {
  const monthlyRate = annualRate / 100 / 12
  const monthlyPayment =
    monthlyRate === 0
      ? principal / termMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1)

  const totalPayment = monthlyPayment * termMonths
  const totalInterest = totalPayment - principal

  const paymentSchedule = []
  let balance = principal

  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = balance * monthlyRate
    const principalPayment = monthlyPayment - interestPayment
    balance -= principalPayment

    paymentSchedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
    })
  }

  return {
    principal,
    interestRate: annualRate,
    term: termMonths,
    monthlyPayment,
    totalPayment,
    totalInterest,
    paymentSchedule,
  }
}

export function LoanCalculator() {
  const [loanType, setLoanType] = React.useState(loanTypes[0].id)
  const [amount, setAmount] = React.useState(50000)
  const [term, setTerm] = React.useState(12)
  const [calculation, setCalculation] = React.useState<LoanCalculation | null>(null)

  const selectedLoanType = loanTypes.find((lt) => lt.id === loanType) || loanTypes[0]

  React.useEffect(() => {
    if (amount >= selectedLoanType.minAmount && amount <= selectedLoanType.maxAmount) {
      const calc = calculateLoan(amount, selectedLoanType.interestRate, term)
      setCalculation(calc)
    } else {
      setCalculation(null)
    }
  }, [amount, term, selectedLoanType])

  const handleAmountChange = (value: string) => {
    const numValue = Number.parseInt(value.replace(/,/g, "")) || 0
    setAmount(Math.min(Math.max(numValue, selectedLoanType.minAmount), selectedLoanType.maxAmount))
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Calculator className="h-5 w-5 text-emerald-600" />
          Loan Calculator
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Calculate your monthly payments and see the total cost of your loan
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Loan Type Selection */}
        <div className="space-y-2">
          <Label>Loan Type</Label>
          <Select value={loanType} onValueChange={setLoanType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {loanTypes.map((lt) => (
                <SelectItem key={lt.id} value={lt.id}>
                  {lt.name} ({lt.interestRate}% p.a.)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Loan Amount */}
        <div className="space-y-2">
          <Label>Loan Amount (KES)</Label>
          <Input
            type="text"
            value={amount.toLocaleString()}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="50,000"
          />
          <Slider
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            min={selectedLoanType.minAmount}
            max={selectedLoanType.maxAmount}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Min: KES {selectedLoanType.minAmount.toLocaleString()}</span>
            <span>Max: KES {selectedLoanType.maxAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Loan Term */}
        <div className="space-y-2">
          <Label>Loan Term (Months)</Label>
          <Select value={term.toString()} onValueChange={(value) => setTerm(Number.parseInt(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: selectedLoanType.maxTerm }, (_, i) => i + 1)
                .filter((month) => month % 3 === 0 || month <= 6)
                .map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {month} month{month > 1 ? "s" : ""}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {calculation && (
          <div className="space-y-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
            <h4 className="font-medium text-emerald-800">Loan Summary</h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Monthly Payment</span>
                </div>
                <p className="text-lg font-bold text-emerald-800">
                  KES {Math.round(calculation.monthlyPayment).toLocaleString()}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Total Interest</span>
                </div>
                <p className="text-lg font-bold text-emerald-800">
                  KES {Math.round(calculation.totalInterest).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Total Repayment:</span>
                <p className="font-medium">KES {Math.round(calculation.totalPayment).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Interest Rate:</span>
                <p className="font-medium">{selectedLoanType.interestRate}% p.a.</p>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              Apply for This Loan
            </Button>
          </div>
        )}

        {!calculation && amount > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs text-amber-800">
              Please enter an amount between KES {selectedLoanType.minAmount.toLocaleString()} and KES{" "}
              {selectedLoanType.maxAmount.toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
