import type { FundSource, WithdrawalMethod, WithdrawalTransaction, WithdrawalLimits } from "./types"

export const mockFundSources: FundSource[] = [
  {
    id: "profits",
    name: "Investment Profits",
    amount: 45250.75,
    icon: "TrendingUp",
    description: "Returns from your investment portfolio",
    color: "text-green-600",
  },
  {
    id: "revenue",
    name: "Business Revenue",
    amount: 28900.5,
    icon: "Briefcase",
    description: "Income from business activities",
    color: "text-blue-600",
  },
  {
    id: "group_deposits",
    name: "Group Deposits",
    amount: 15750.25,
    icon: "Users",
    description: "Contributions from chama and investment groups",
    color: "text-purple-600",
  },
  {
    id: "other_income",
    name: "Other Income",
    amount: 8320.0,
    icon: "DollarSign",
    description: "Miscellaneous income sources",
    color: "text-orange-600",
  },
]

export const mockWithdrawalMethods: WithdrawalMethod[] = [
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: "Smartphone",
    processingTime: "Instant",
    fee: 25,
    feeType: "fixed",
    minAmount: 100,
    maxAmount: 150000,
    description: "Instant mobile money transfer",
    fields: [
      {
        id: "phone_number",
        name: "phoneNumber",
        label: "M-Pesa Phone Number",
        type: "tel",
        required: true,
        placeholder: "+254 7XX XXX XXX",
        validation: {
          pattern: "^\\+254[17]\\d{8}$",
          message: "Please enter a valid Kenyan phone number",
        },
      },
    ],
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: "Building",
    processingTime: "1-3 business days",
    fee: 0.5,
    feeType: "percentage",
    minAmount: 500,
    maxAmount: 1000000,
    description: "Direct bank account transfer",
    fields: [
      {
        id: "bank_name",
        name: "bankName",
        label: "Bank Name",
        type: "select",
        required: true,
        options: [
          { value: "equity", label: "Equity Bank" },
          { value: "kcb", label: "KCB Bank" },
          { value: "coop", label: "Co-operative Bank" },
          { value: "absa", label: "Absa Bank" },
          { value: "standard", label: "Standard Chartered" },
        ],
      },
      {
        id: "account_number",
        name: "accountNumber",
        label: "Account Number",
        type: "text",
        required: true,
        placeholder: "Enter your account number",
        validation: {
          minLength: 8,
          maxLength: 20,
          message: "Account number must be 8-20 digits",
        },
      },
      {
        id: "account_name",
        name: "accountName",
        label: "Account Holder Name",
        type: "text",
        required: true,
        placeholder: "Full name as per bank records",
      },
    ],
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "CreditCard",
    processingTime: "3-5 business days",
    fee: 2.5,
    feeType: "percentage",
    minAmount: 1000,
    maxAmount: 500000,
    description: "International PayPal transfer",
    fields: [
      {
        id: "paypal_email",
        name: "paypalEmail",
        label: "PayPal Email Address",
        type: "email",
        required: true,
        placeholder: "your.email@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
    ],
  },
]

export const mockWithdrawalLimits: WithdrawalLimits = {
  daily: 200000,
  monthly: 2000000,
  perTransaction: 500000,
  remaining: {
    daily: 175000,
    monthly: 1850000,
  },
}

export const mockRecentWithdrawals: WithdrawalTransaction[] = [
  {
    id: "wd_001",
    reference: "TL-WD-2024-001",
    amount: 25000,
    fee: 25,
    totalAmount: 25025,
    source: mockFundSources[0],
    method: mockWithdrawalMethods[0],
    destinationDetails: {
      phoneNumber: "+254 712 345 678",
    },
    status: "completed",
    createdAt: new Date("2024-01-15T10:30:00"),
    processedAt: new Date("2024-01-15T10:31:00"),
    notes: "Emergency withdrawal",
  },
  {
    id: "wd_002",
    reference: "TL-WD-2024-002",
    amount: 50000,
    fee: 250,
    totalAmount: 50250,
    source: mockFundSources[1],
    method: mockWithdrawalMethods[1],
    destinationDetails: {
      bankName: "Equity Bank",
      accountNumber: "1234567890",
      accountName: "John Doe",
    },
    status: "processing",
    createdAt: new Date("2024-01-14T14:20:00"),
    estimatedCompletion: new Date("2024-01-17T17:00:00"),
  },
  {
    id: "wd_003",
    reference: "TL-WD-2024-003",
    amount: 15000,
    fee: 375,
    totalAmount: 15375,
    source: mockFundSources[2],
    method: mockWithdrawalMethods[2],
    destinationDetails: {
      paypalEmail: "john.doe@example.com",
    },
    status: "pending",
    createdAt: new Date("2024-01-13T09:15:00"),
    estimatedCompletion: new Date("2024-01-18T17:00:00"),
  },
]

export const getTotalAvailableFunds = (): number => {
  return mockFundSources.reduce((total, source) => total + source.amount, 0)
}

export const calculateWithdrawalFee = (amount: number, method: WithdrawalMethod): number => {
  if (method.feeType === "fixed") {
    return method.fee
  } else {
    return (amount * method.fee) / 100
  }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
