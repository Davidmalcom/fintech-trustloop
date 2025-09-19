import type { WithdrawalTransaction, SavedWithdrawalMethod, WithdrawalStats } from "./history-types"
import { mockFundSources, mockWithdrawalMethods } from "./mock-data"

export const mockWithdrawalHistory: WithdrawalTransaction[] = [
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
  {
    id: "wd_004",
    reference: "TL-WD-2024-004",
    amount: 75000,
    fee: 25,
    totalAmount: 75025,
    source: mockFundSources[0],
    method: mockWithdrawalMethods[0],
    destinationDetails: {
      phoneNumber: "+254 712 345 678",
    },
    status: "completed",
    createdAt: new Date("2024-01-10T16:45:00"),
    processedAt: new Date("2024-01-10T16:46:00"),
  },
  {
    id: "wd_005",
    reference: "TL-WD-2024-005",
    amount: 30000,
    fee: 150,
    totalAmount: 30150,
    source: mockFundSources[1],
    method: mockWithdrawalMethods[1],
    destinationDetails: {
      bankName: "KCB Bank",
      accountNumber: "0987654321",
      accountName: "John Doe",
    },
    status: "failed",
    createdAt: new Date("2024-01-08T11:20:00"),
    notes: "Insufficient funds in source account",
  },
]

export const mockSavedMethods: SavedWithdrawalMethod[] = [
  {
    id: "saved_mpesa_1",
    name: "My M-Pesa",
    type: "mpesa",
    icon: "Smartphone",
    details: {
      phoneNumber: "+254 712 345 678",
    },
    isDefault: true,
    lastUsed: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2023-06-15T09:00:00"),
  },
  {
    id: "saved_bank_1",
    name: "Equity Savings",
    type: "bank_transfer",
    icon: "Building",
    details: {
      bankName: "Equity Bank",
      accountNumber: "1234567890",
      accountName: "John Doe",
    },
    isDefault: false,
    lastUsed: new Date("2024-01-14T14:20:00"),
    createdAt: new Date("2023-08-20T14:30:00"),
  },
  {
    id: "saved_paypal_1",
    name: "PayPal Account",
    type: "paypal",
    icon: "CreditCard",
    details: {
      paypalEmail: "john.doe@example.com",
    },
    isDefault: false,
    lastUsed: new Date("2024-01-13T09:15:00"),
    createdAt: new Date("2023-09-10T10:15:00"),
  },
]

export const mockWithdrawalStats: WithdrawalStats = {
  totalWithdrawn: 195000,
  totalFees: 825,
  totalTransactions: 5,
  averageAmount: 39000,
  successRate: 60, // 3 out of 5 successful
  monthlyWithdrawals: [
    { month: "Dec 2023", amount: 45000, count: 2 },
    { month: "Jan 2024", amount: 195000, count: 5 },
  ],
}
