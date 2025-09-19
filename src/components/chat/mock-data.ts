import type { ChatUser, ChatGroup, ChatMessage, ChatConversation } from "./types"

export const mockUsers: ChatUser[] = [
  {
    id: "1",
    name: "Sarah Wanjiku",
    isOnline: true,
    role: "treasurer",
  },
  {
    id: "2",
    name: "John Kamau",
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    role: "admin",
  },
  {
    id: "3",
    name: "Grace Akinyi",
    isOnline: true,
    role: "secretary",
  },
  {
    id: "4",
    name: "Peter Mwangi",
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
    role: "member",
  },
  {
    id: "5",
    name: "Mary Njeri",
    isOnline: true,
    role: "member",
  },
]

export const mockGroups: ChatGroup[] = [
  {
    id: "group-1",
    name: "Umoja Chama",
    description: "Main group for savings and investments",
    memberCount: 12,
    type: "chama",
    isActive: true,
    lastActivity: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: "group-2",
    name: "Investment Committee",
    description: "Discussing investment opportunities",
    memberCount: 5,
    type: "investment",
    isActive: true,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "group-3",
    name: "Savings Circle",
    description: "Weekly savings discussions",
    memberCount: 8,
    type: "savings",
    isActive: true,
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

export const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    senderId: "1",
    senderName: "Sarah Wanjiku",
    content: "Good morning everyone! Just a reminder that our monthly meeting is tomorrow at 2 PM.",
    type: "text",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isRead: true,
  },
  {
    id: "msg-2",
    senderId: "2",
    senderName: "John Kamau",
    content: "Thanks for the reminder Sarah. I'll prepare the financial report.",
    type: "text",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    isRead: true,
  },
  {
    id: "msg-3",
    senderId: "3",
    senderName: "Grace Akinyi",
    content: "I've uploaded the agenda for tomorrow's meeting.",
    type: "document",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
    attachments: [
      {
        id: "att-1",
        name: "Meeting_Agenda_Dec_2024.pdf",
        type: "document",
        url: "/documents/agenda.pdf",
        size: 245760,
      },
    ],
  },
  {
    id: "msg-4",
    senderId: "current-user",
    senderName: "You",
    content: "Perfect! Looking forward to it.",
    type: "text",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    isRead: true,
  },
]

export const mockConversations: ChatConversation[] = [
  {
    id: "conv-1",
    type: "group",
    name: "Umoja Chama",
    participants: mockUsers.slice(0, 4),
    lastMessage: mockMessages[3],
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "conv-2",
    type: "direct",
    name: "Sarah Wanjiku",
    participants: [mockUsers[0]],
    lastMessage: {
      id: "msg-5",
      senderId: "1",
      senderName: "Sarah Wanjiku",
      content: "Can we discuss the loan application process?",
      type: "text",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
    },
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "conv-3",
    type: "bot",
    name: "TrustLoop Assistant",
    participants: [],
    lastMessage: {
      id: "msg-6",
      senderId: "bot",
      senderName: "TrustLoop Assistant",
      content: "How can I help you today? I can assist with payments, loan information, or group management.",
      type: "text",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: "conv-4",
    type: "group",
    name: "Investment Committee",
    participants: mockUsers.slice(0, 3),
    lastMessage: {
      id: "msg-7",
      senderId: "2",
      senderName: "John Kamau",
      content: "The treasury bills are looking good this quarter.",
      type: "text",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "conv-5",
    type: "direct",
    name: "Grace Akinyi",
    participants: [mockUsers[2]],
    lastMessage: {
      id: "msg-8",
      senderId: "3",
      senderName: "Grace Akinyi",
      content: "Thanks for your help with the documentation!",
      type: "text",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
    isArchived: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
]

export const botQuickReplies = [
  "Check my loan status",
  "Make a payment",
  "View group balance",
  "Contact support",
  "Investment options",
  "Payment history",
]

export const botResponses = {
  greeting:
    "Hello! I'm your TrustLoop Assistant. I can help you with payments, loans, group management, and more. What would you like to do today?",
  loanStatus:
    "I can help you check your loan status. You currently have 2 active loans with a total outstanding balance of KES 45,000. Would you like to see the details?",
  payment:
    "I can help you make a payment. Which would you like to pay: Monthly contribution (KES 2,000), Loan payment (KES 3,500), or something else?",
  groupBalance:
    "Your Umoja Chama group currently has a total balance of KES 125,000. Individual contributions this month: KES 24,000. Would you like to see more details?",
  support:
    "I'll connect you with our support team. In the meantime, you can also check our FAQ section or call us at +254 700 123 456.",
  investments:
    "Here are some investment opportunities available to your group: Treasury Bills (8.5% return), Money Market Fund (7.2% return), Fixed Deposits (6.8% return). Would you like more details on any of these?",
  default:
    "I understand you're looking for help. I can assist with loans, payments, group management, investments, and general TrustLoop questions. What specific area would you like help with?",
}

// Mock messages for specific conversations
export const getMessagesForConversation = (conversationId: string): ChatMessage[] => {
  const conversationMessages: Record<string, ChatMessage[]> = {
    "conv-1": [
      {
        id: "msg-conv1-1",
        senderId: "1",
        senderName: "Sarah Wanjiku",
        content: "Good morning everyone! Just a reminder that our monthly meeting is tomorrow at 2 PM.",
        type: "text",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-conv1-2",
        senderId: "2",
        senderName: "John Kamau",
        content: "Thanks for the reminder Sarah. I'll prepare the financial report.",
        type: "text",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-conv1-3",
        senderId: "current-user",
        senderName: "You",
        content: "Perfect! Looking forward to it.",
        type: "text",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        isRead: true,
      },
    ],
    "conv-2": [
      {
        id: "msg-conv2-1",
        senderId: "1",
        senderName: "Sarah Wanjiku",
        content: "Hi! I wanted to discuss the loan application process.",
        type: "text",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-conv2-2",
        senderId: "current-user",
        senderName: "You",
        content: "What specific information do you need?",
        type: "text",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-conv2-3",
        senderId: "1",
        senderName: "Sarah Wanjiku",
        content: "Can we discuss the loan application process?",
        type: "text",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
      },
    ],
    "conv-3": [
      {
        id: "msg-bot-1",
        senderId: "bot",
        senderName: "TrustLoop Assistant",
        content:
          "Hello! I'm your TrustLoop Assistant. I can help you with payments, loans, group management, and more. What would you like to do today?",
        type: "text",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isRead: true,
      },
    ],
    "conv-4": [
      {
        id: "msg-conv4-1",
        senderId: "2",
        senderName: "John Kamau",
        content: "The treasury bills are looking good this quarter.",
        type: "text",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-conv4-2",
        senderId: "3",
        senderName: "Grace Akinyi",
        content: "I agree. Should we increase our investment?",
        type: "text",
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        isRead: true,
      },
    ],
    "conv-5": [
      {
        id: "msg-conv5-1",
        senderId: "current-user",
        senderName: "You",
        content: "Thanks for helping with the documentation!",
        type: "text",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-conv5-2",
        senderId: "3",
        senderName: "Grace Akinyi",
        content: "Thanks for your help with the documentation!",
        type: "text",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: true,
      },
    ],
  }

  return conversationMessages[conversationId] || []
}
