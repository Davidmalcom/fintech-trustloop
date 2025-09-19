"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import type { ActiveLoan } from "./types"
import { cn } from "@/lib/utils"

function getStatusIcon(status: ActiveLoan["status"]) {
  switch (status) {
    case "current":
      return <CheckCircle className="h-4 w-4 text-emerald-600" />
    case "overdue":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "paid_off":
      return <CheckCircle className="h-4 w-4 text-emerald-600" />
    default:
      return <Clock className="h-4 w-4 text-amber-600" />
  }
}

function getStatusColor(status: ActiveLoan["status"]) {
  switch (status) {
    case "current":
      return "bg-emerald-100 text-emerald-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    case "paid_off":
      return "bg-emerald-100 text-emerald-800"
    default:
      return "bg-amber-100 text-amber-800"
  }
}

function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate)
  const now = new Date()
  const diffTime = due.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function LoanCard({
  loan,
  onMakePayment,
  onViewDetails,
}: {
  loan: ActiveLoan
  onMakePayment: (loanId: string) => void
  onViewDetails: (loanId: string) => void
}) {
  const progressPercentage = ((loan.totalPayments - loan.paymentsRemaining) / loan.totalPayments) * 100
  const daysUntilDue = getDaysUntilDue(loan.nextDueDate)
  const isOverdue = daysUntilDue < 0
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

  return (
    <Card
      className={cn(
        "rounded-xl border transition-all hover:shadow-md",
        isOverdue && "border-red-200 bg-red-50/30",
        isDueSoon && "border-amber-200 bg-amber-50/30",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <CardTitle className="text-sm font-medium">{loan.loanTypeName}</CardTitle>
            <p className="text-xs text-muted-foreground">Loan ID: {loan.id.toUpperCase()}</p>
          </div>
          <Badge className={getStatusColor(loan.status)}>
            {getStatusIcon(loan.status)}
            <span className="ml-1 capitalize">{loan.status.replace("_", " ")}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Balance and Payment Info */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Remaining Balance</p>
            <p className="text-lg font-bold text-emerald-800">
              {loan.currency} {loan.remainingBalance.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Payment</p>
            <p className="text-lg font-bold">
              {loan.currency} {loan.monthlyPayment.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Loan Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {loan.totalPayments - loan.paymentsRemaining} of {loan.totalPayments} payments made
            </span>
            <span>{loan.paymentsRemaining} remaining</span>
          </div>
        </div>

        {/* Next Payment Due */}
        <div
          className={cn(
            "rounded-lg border p-3",
            isOverdue
              ? "border-red-200 bg-red-50"
              : isDueSoon
                ? "border-amber-200 bg-amber-50"
                : "border-muted bg-muted/40",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar
                className={cn(
                  "h-4 w-4",
                  isOverdue ? "text-red-600" : isDueSoon ? "text-amber-600" : "text-muted-foreground",
                )}
              />
              <div>
                <p className="text-xs font-medium">Next Payment Due</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(loan.nextDueDate).toLocaleDateString()}
                  {isOverdue && <span className="text-red-600 font-medium"> (Overdue)</span>}
                  {isDueSoon && <span className="text-amber-600 font-medium"> (Due Soon)</span>}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">
                {loan.currency} {loan.monthlyPayment.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onMakePayment(loan.id)}
            className={cn(
              "flex-1",
              isOverdue || isDueSoon
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white",
            )}
          >
            <CreditCard className="mr-1 h-4 w-4" />
            {isOverdue ? "Pay Now" : "Make Payment"}
          </Button>
          <Button variant="outline" onClick={() => onViewDetails(loan.id)} className="bg-transparent">
            Details
          </Button>
        </div>

        {/* Loan Terms Summary */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <p className="text-muted-foreground">Interest Rate</p>
            <p className="font-medium">{loan.interestRate}% p.a.</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Original Amount</p>
            <p className="font-medium">
              {loan.currency} {loan.originalAmount.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Final Due</p>
            <p className="font-medium">{new Date(loan.finalDueDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ActiveLoans({
  loans,
  onMakePayment,
  onViewDetails,
}: {
  loans: ActiveLoan[]
  onMakePayment: (loanId: string) => void
  onViewDetails: (loanId: string) => void
}) {
  if (loans.length === 0) {
    return (
      <Card className="rounded-xl border">
        <CardContent className="p-6 text-center">
          <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">No active loans</p>
          <p className="text-xs text-muted-foreground">Apply for a loan to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Active Loans</h2>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          {loans.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} onMakePayment={onMakePayment} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  )
}
