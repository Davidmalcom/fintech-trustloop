export interface SavingsAccount {
  id: string
  name: string
  type: SavingsType
  balance: number
  targetAmount?: number
  targetDate?: string
  interestRate: number
  createdAt: string
  isActive: boolean
  autoSaveEnabled: boolean
  autoSaveAmount?: number
  autoSaveFrequency?: "daily" | "weekly" | "monthly"
  nextAutoSave?: string
}

export interface SavingsType {
  id: string
  name: string
  description: string
  interestRate: number
  minDeposit: number
  maxWithdrawal?: number
  withdrawalRules: string[]
  features: string[]
  icon: string
  color: string
}

export interface SavingsTransaction {
  id: string
  accountId: string
  type: "deposit" | "withdrawal" | "interest"
  amount: number
  description: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  method?: string
  reference?: string
}

export interface SavingsPlan {
  id: string
  name: string
  description: string
  monthlyAmount: number
  duration: number
  projectedReturn: number
  riskLevel: "low" | "medium" | "high"
  features: string[]
}

export interface Milestone {
  id: string
  accountId: string
  title: string
  description: string
  targetPercentage: number
  reward?: string
  achieved: boolean
  achievedAt?: string
}
