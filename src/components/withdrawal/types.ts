export type FundSource = {
  id: string
  name: string
  amount: number
  icon: string
  description: string
  color: string
}

export type WithdrawalMethod = {
  id: string
  name: string
  icon: string
  processingTime: string
  fee: number
  feeType: "fixed" | "percentage"
  minAmount: number
  maxAmount: number
  description: string
  fields: WithdrawalField[]
}

export type WithdrawalField = {
  id: string
  name: string
  label: string
  type: "text" | "email" | "tel" | "select"
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    message?: string
  }
}

export type WithdrawalRequest = {
  amount: number
  sourceId: string
  methodId: string
  destinationDetails: Record<string, string>
  notes?: string
}

export type WithdrawalTransaction = {
  id: string
  reference: string
  amount: number
  fee: number
  totalAmount: number
  source: FundSource
  method: WithdrawalMethod
  destinationDetails: Record<string, string>
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  createdAt: Date
  processedAt?: Date
  estimatedCompletion?: Date
  notes?: string
}

export type WithdrawalFormData = {
  amount: string
  sourceId: string
  methodId: string
  destinationDetails: Record<string, string>
  notes: string
}

export type WithdrawalLimits = {
  daily: number
  monthly: number
  perTransaction: number
  remaining: {
    daily: number
    monthly: number
  }
}
