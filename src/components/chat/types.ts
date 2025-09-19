export interface ChatUser {
  id: string
  name: string
  avatar?: string
  isOnline: boolean
  lastSeen?: Date
  role?: "admin" | "treasurer" | "secretary" | "member"
}

export interface ChatGroup {
  id: string
  name: string
  description?: string
  avatar?: string
  memberCount: number
  type: "chama" | "investment" | "savings"
  isActive: boolean
  lastActivity?: Date
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  type: "text" | "image" | "document" | "audio" | "system"
  timestamp: Date
  isRead: boolean
  replyTo?: string
  attachments?: ChatAttachment[]
}

export interface ChatAttachment {
  id: string
  name: string
  type: "image" | "document" | "audio"
  url: string
  size: number
}

export interface ChatConversation {
  id: string
  type: "group" | "direct" | "bot"
  name: string
  avatar?: string
  participants: ChatUser[]
  lastMessage?: ChatMessage
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BotResponse {
  id: string
  type: "text" | "quick_replies" | "card" | "list"
  content: string
  quickReplies?: string[]
  cards?: BotCard[]
}

export interface BotCard {
  title: string
  subtitle?: string
  image?: string
  buttons: BotButton[]
}

export interface BotButton {
  title: string
  type: "postback" | "web_url"
  payload?: string
  url?: string
}

export interface ChatNotification {
  id: string
  conversationId: string
  message: ChatMessage
  isRead: boolean
  timestamp: Date
}
