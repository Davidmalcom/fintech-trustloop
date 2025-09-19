export type ActiveLoan = {
  id: string
  loanTypeId: string
  loanTypeName: string
  originalAmount: number
  remainingBalance: number
  monthlyPayment: number
  interestRate: number
  nextDueDate: string
  finalDueDate: string
  status: "current" | "overdue" | "paid_off" | "defaulted"
  paymentsRemaining: number
  totalPayments: number
  currency: string
}

export type PaymentHistory = {
  id: string
  loanId: string
  amount: number
  paymentDate: string
  dueDate: string
  status: "paid" | "late" | "missed"
  method: "mpesa" | "bank" | "cash"
  currency: string
}

export type LoanSuggestion = {
  id: string
  loanTypeId: string
  loanTypeName: string
  suggestedAmount: number
  reason: string
  interestRate: number
  maxTerm: number
  priority: "high" | "medium" | "low"
  currency: string
}

export type LoanDashboardData = {
  activeLoans: ActiveLoan[]
  paymentHistory: PaymentHistory[]
  suggestions: LoanSuggestion[]
  totalOutstanding: number
  nextPaymentDue: {
    amount: number
    date: string
    loanId: string
  } | null
  creditScore: number
  currency: string
}
