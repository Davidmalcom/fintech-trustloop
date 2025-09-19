export type LoanType = {
  id: string
  name: string
  description: string
  minAmount: number
  maxAmount: number
  interestRate: number // annual percentage
  maxTerm: number // months
  requirements: string[]
  features: string[]
  processingTime: string
  collateralRequired: boolean
}

export type LoanApplication = {
  id: string
  applicantId: string
  applicantName: string
  loanTypeId: string
  amount: number
  term: number // months
  purpose: string
  monthlyIncome: number
  employmentStatus: string
  guarantors: string[]
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected" | "disbursed"
  applicationDate: string
  reviewDate?: string
  disbursementDate?: string
  monthlyPayment: number
  totalPayment: number
  interestAmount: number
}

export type LoanCalculation = {
  principal: number
  interestRate: number
  term: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  paymentSchedule: {
    month: number
    payment: number
    principal: number
    interest: number
    balance: number
  }[]
}

export type FAQ = {
  id: string
  question: string
  answer: string
  category: "eligibility" | "application" | "repayment" | "general"
}
