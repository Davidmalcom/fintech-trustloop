"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CreditCard, Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import type { ActiveLoan } from "./types"
import { cn } from "@/lib/utils"

function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate)
  const now = new Date()
  const diffTime = due.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function getStatusIcon(status: ActiveLoan["status"], daysUntilDue: number) {
  if (status === "overdue" || daysUntilDue < 0) {
    return <AlertTriangle className="h-4 w-4 text-red-600" />
  }
  if (daysUntilDue <= 3) {
    return <AlertTriangle className="h-4 w-4 text-amber-600" />
  }
  return <CheckCircle className="h-4 w-4 text-emerald-600" />
}

export function LoanPaymentSelector({
  loans,
  onSelectLoan,
}: {
  loans: ActiveLoan[]
  onSelectLoan: (loanId: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  if (loans.length === 0) {
    return (
      <Button disabled className="flex-1 bg-muted text-muted-foreground">
        <CreditCard className="mr-1 h-4 w-4" />
        No Active Loans
      </Button>
    )
  }

  if (loans.length === 1) {
    const loan = loans[0]
    const daysUntilDue = getDaysUntilDue(loan.nextDueDate)
    const isOverdue = daysUntilDue < 0
    const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

    return (
      <Button
        onClick={() => onSelectLoan(loan.id)}
        className={cn(
          "flex-1",
          isOverdue || isDueSoon
            ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800"
            : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white",
        )}
      >
        <CreditCard className="mr-1 h-4 w-4" />
        {isOverdue ? "Pay Overdue" : "Make Payment"}
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <CreditCard className="mr-1 h-4 w-4" />
          Pay Loan ({loans.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3">
          <h4 className="font-medium text-sm mb-3">Select Loan to Pay</h4>
          <div className="space-y-2">
            {loans.map((loan) => {
              const daysUntilDue = getDaysUntilDue(loan.nextDueDate)
              const isOverdue = daysUntilDue < 0
              const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

              return (
                <button
                  key={loan.id}
                  onClick={() => {
                    onSelectLoan(loan.id)
                    setOpen(false)
                  }}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-colors hover:bg-muted/50",
                    isOverdue && "border-red-200 bg-red-50/30",
                    isDueSoon && "border-amber-200 bg-amber-50/30",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{loan.loanTypeName}</p>
                      <p className="text-xs text-muted-foreground">ID: {loan.id.toUpperCase()}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Due: {new Date(loan.nextDueDate).toLocaleDateString()}
                          {isOverdue && <span className="text-red-600 font-medium"> (Overdue)</span>}
                          {isDueSoon && <span className="text-amber-600 font-medium"> (Due Soon)</span>}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getStatusIcon(loan.status, daysUntilDue)}
                      <p className="text-sm font-bold">
                        {loan.currency} {loan.monthlyPayment.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
