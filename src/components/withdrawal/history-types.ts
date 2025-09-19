export interface WithdrawalHistoryFilter {
  status?: "all" | "completed" | "processing" | "pending" | "failed" | "cancelled"
  method?: "all" | "mpesa" | "bank_transfer" | "paypal"
  dateRange?: {
    from: Date
    to: Date
  }
  amountRange?: {
    min: number
    max: number
  }
}

export interface WithdrawalStats {
  totalWithdrawn: number
  totalFees: number
  totalTransactions: number
  averageAmount: number
  successRate: number
  monthlyWithdrawals: {
    month: string
    amount: number
    count: number
  }[]
}

export interface SavedWithdrawalMethod {
  id: string
  name: string
  type: "mpesa" | "bank_transfer" | "paypal"
  icon: string
  details: Record<string, string>
  isDefault: boolean
  lastUsed: Date
  createdAt: Date
}
