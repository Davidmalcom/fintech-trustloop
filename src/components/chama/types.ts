export type ChamaRole = "admin" | "treasurer" | "secretary" | "auditor" | "member"

export type ChamaPermission =
  | "manage_members"
  | "manage_finances"
  | "approve_loans"
  | "approve_investments"
  | "approve_withdrawals"
  | "manage_meetings"
  | "view_reports"
  | "post_announcements"

export type ChamaMember = {
  id: string
  name: string
  phone: string
  role: ChamaRole
  joinedAtISO: string
  contributionAmount: number
  totalContributed: number
  isActive: boolean
  avatar?: string
}

export type ContributionSchedule = {
  frequency: "weekly" | "biweekly" | "monthly"
  amount: number
  dueDate: string // ISO date
  nextDueDate: string // ISO date
}

export type Investment = {
  id: string
  type: "real_estate" | "farming" | "stocks" | "unit_trusts" | "business"
  title: string
  description: string
  amount: number
  currency: string
  dateInvested: string
  maturityDate?: string
  currentValue: number
  returns: number
  status: "active" | "matured" | "pending_approval"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  proposedBy: string
}

export type Loan = {
  id: string
  borrowerId: string
  borrowerName: string
  amount: number
  currency: string
  interestRate: number
  dateIssued: string
  dueDate: string
  status: "pending" | "approved" | "active" | "repaid" | "overdue"
  approvedBy?: string[]
  monthlyPayment: number
  remainingBalance: number
}

export type Transaction = {
  id: string
  type: "contribution" | "payout" | "loan" | "investment" | "withdrawal"
  memberId: string
  memberName: string
  amount: number
  currency: string
  dateISO: string
  description: string
  status: "pending" | "completed" | "failed"
  approvedBy?: string[]
}

export type ChatMessage = {
  id: string
  senderId: string
  senderName: string
  content: string
  type: "text" | "image" | "document"
  timestamp: string
  attachmentUrl?: string
}

export type Announcement = {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  timestamp: string
  priority: "low" | "medium" | "high"
}

export type Invitation = {
  id: string
  invitedBy: string
  invitedByName: string
  phone: string
  email?: string
  status: "pending" | "accepted" | "declined" | "expired"
  createdAt: string
  expiresAt: string
  inviteCode: string
}

export type ChamaGroup = {
  id: string
  name: string
  description: string
  totalMembers: number
  totalFunds: number
  currency: string
  contributionSchedule: ContributionSchedule
  members: ChamaMember[]
  investments: Investment[]
  loans: Loan[]
  transactions: Transaction[]
  chatMessages: ChatMessage[]
  announcements: Announcement[]
  invitations: Invitation[]
  currentUserRole: ChamaRole
  currentUserId: string
}
