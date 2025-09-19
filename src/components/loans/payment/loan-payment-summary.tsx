"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import type { ActiveLoan } from "../dashboard/types"
import { cn } from "@/lib/utils"

function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate)
  const now = new Date()
  const diffTime = due.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function LoanPaymentSummary({ loan }: { loan: ActiveLoan }) {
  const progressPercentage = ((loan.totalPayments - loan.paymentsRemaining) / loan.totalPayments) * 100
  const daysUntilDue = getDaysUntilDue(loan.nextDueDate)
  const isOverdue = daysUntilDue < 0
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{loan.loanTypeName}</CardTitle>
            <p className="text-xs text-muted-foreground">Loan ID: {loan.id.toUpperCase()}</p>
          </div>
          <Badge
            className={cn(
              isOverdue
                ? "bg-red-100 text-red-800"
                : isDueSoon
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-emerald-800",
            )}
          >
            {isOverdue ? (
              <AlertTriangle className="mr-1 h-3 w-3" />
            ) : isDueSoon ? (
              <AlertTriangle className="mr-1 h-3 w-3" />
            ) : (
              <CheckCircle className="mr-1 h-3 w-3" />
            )}
            {isOverdue ? "Overdue" : isDueSoon ? "Due Soon" : "Current"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Amounts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/40">
            <p className="text-xs text-muted-foreground">Monthly Payment</p>
            <p className="text-lg font-bold text-emerald-800">
              {loan.currency} {loan.monthlyPayment.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/40">
            <p className="text-xs text-muted-foreground">Remaining Balance</p>
            <p className="text-lg font-bold">
              {loan.currency} {loan.remainingBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Due Date Alert */}
        <div
          className={cn(
            "rounded-lg border p-3",
            isOverdue
              ? "border-red-200 bg-red-50"
              : isDueSoon
                ? "border-amber-200 bg-amber-50"
                : "border-emerald-200 bg-emerald-50",
          )}
        >
          <div className="flex items-center gap-2">
            <Calendar
              className={cn("h-4 w-4", isOverdue ? "text-red-600" : isDueSoon ? "text-amber-600" : "text-emerald-600")}
            />
            <div>
              <p className="text-sm font-medium">
                {isOverdue ? "Payment Overdue" : isDueSoon ? "Payment Due Soon" : "Next Payment Due"}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(loan.nextDueDate).toLocaleDateString()}
                {isOverdue && ` (${Math.abs(daysUntilDue)} days overdue)`}
                {isDueSoon && ` (${daysUntilDue} days remaining)`}
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Loan Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{loan.totalPayments - loan.paymentsRemaining} payments made</span>
            <span>{loan.paymentsRemaining} remaining</span>
          </div>
        </div>

        {/* Loan Details */}
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
