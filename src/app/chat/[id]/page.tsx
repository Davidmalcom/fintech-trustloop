"use client"

import * as React from "react"
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
  Search,
  UserPlus,
  VolumeX,
  Archive,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  type: "text" | "image" | "file"
  timestamp: Date
  isRead: boolean
}

interface ChatConversation {
  id: string
  name: string
  type: "direct" | "group"
  participants: Array<{
    id: string
    name: string
    avatar?: string
    isOnline: boolean
    role?: string
  }>
  messages: ChatMessage[]
  isTyping?: boolean
}

const mockConversations: Record<string, ChatConversation> = {
  "conv-1": {
    id: "conv-1",
    name: "Sarah Wanjiku",
    type: "direct",
    participants: [
      {
        id: "user-1",
        name: "Sarah Wanjiku",
        isOnline: true,
      },
    ],
    messages: [
      {
        id: "msg-1",
        senderId: "user-1",
        senderName: "Sarah Wanjiku",
        content: "Hi! How are you doing?",
        type: "text",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-2",
        senderId: "me",
        senderName: "You",
        content: "I'm doing well, thanks! How about you?",
        type: "text",
        timestamp: new Date(Date.now() - 55 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-3",
        senderId: "user-1",
        senderName: "Sarah Wanjiku",
        content: "Great! I wanted to ask about the loan payment reminder system.",
        type: "text",
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-4",
        senderId: "me",
        senderName: "You",
        content: "The system automatically sends reminders 3 days before the due date.",
        type: "text",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-5",
        senderId: "user-1",
        senderName: "Sarah Wanjiku",
        content: "Thanks for the loan payment reminder!",
        type: "text",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
      },
    ],
    isTyping: false,
  },
  "conv-2": {
    id: "conv-2",
    name: "Umoja Chama",
    type: "group",
    participants: [
      { id: "user-2", name: "John Kamau", isOnline: true, role: "admin" },
      { id: "user-3", name: "Mary Njeri", isOnline: false, role: "treasurer" },
      { id: "user-4", name: "Peter Ochieng", isOnline: true, role: "member" },
      { id: "me", name: "You", isOnline: true, role: "member" },
    ],
    messages: [
      {
        id: "msg-g1",
        senderId: "user-2",
        senderName: "John Kamau",
        content: "Good morning everyone! Hope you're all doing well.",
        type: "text",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-g2",
        senderId: "user-3",
        senderName: "Mary Njeri",
        content: "Morning John! Ready for today's meeting?",
        type: "text",
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-g3",
        senderId: "me",
        senderName: "You",
        content: "Yes, I've prepared the financial reports we discussed.",
        type: "text",
        timestamp: new Date(Date.now() - 85 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-g4",
        senderId: "user-4",
        senderName: "Peter Ochieng",
        content: "Great! I'll bring the investment proposals.",
        type: "text",
        timestamp: new Date(Date.now() - 80 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-g5",
        senderId: "user-2",
        senderName: "John Kamau",
        content: "Perfect! Meeting tomorrow at 2 PM as scheduled.",
        type: "text",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isRead: false,
      },
    ],
    isTyping: true,
  },
  "conv-3": {
    id: "conv-3",
    name: "John Kamau",
    type: "direct",
    participants: [
      {
        id: "user-2",
        name: "John Kamau",
        isOnline: false,
      },
    ],
    messages: [
      {
        id: "msg-j1",
        senderId: "user-2",
        senderName: "John Kamau",
        content: "Hey, can we discuss the investment opportunity?",
        type: "text",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-j2",
        senderId: "me",
        senderName: "You",
        content: "Of course! What did you have in mind?",
        type: "text",
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: "msg-j3",
        senderId: "user-2",
        senderName: "John Kamau",
        content: "I'll send the documents today",
        type: "text",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
    ],
    isTyping: false,
  },
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function formatDate(date: Date) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return "Today"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else {
    return date.toLocaleDateString()
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export default function ChatPage() {
  const params = useParams()
  const conversationId = params.id as string
  const [newMessage, setNewMessage] = React.useState("")
  const [conversation, setConversation] = React.useState<ChatConversation | null>(null)
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const conv = mockConversations[conversationId]
    if (conv) {
      setConversation(conv)
    }
  }, [conversationId])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation?.messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !conversation) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      senderName: "You",
      content: newMessage.trim(),
      type: "text",
      timestamp: new Date(),
      isRead: true,
    }

    setConversation((prev) => {
      if (!prev) return null
      return {
        ...prev,
        messages: [...prev.messages, message],
      }
    })

    setNewMessage("")

    // Simulate response for direct messages
    if (conversation.type === "direct") {
      setIsTyping(true)
      setTimeout(() => {
        const responses = [
          "Thanks for your message!",
          "That sounds great!",
          "I'll get back to you on that.",
          "Perfect, let's do that.",
          "Understood, thanks for clarifying.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const responseMessage: ChatMessage = {
          id: `msg-${Date.now()}-response`,
          senderId: conversation.participants[0].id,
          senderName: conversation.participants[0].name,
          content: randomResponse,
          type: "text",
          timestamp: new Date(),
          isRead: false,
        }

        setConversation((prev) => {
          if (!prev) return null
          return {
            ...prev,
            messages: [...prev.messages, responseMessage],
          }
        })
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Chat not found</h1>
        <p className="text-muted-foreground mb-4">The conversation you're looking for doesn't exist.</p>
        <Link href="/chat">
          <Button>Back to Chats</Button>
        </Link>
      </div>
    )
  }

  const groupedMessages = conversation.messages.reduce(
    (groups, message) => {
      const date = formatDate(message.timestamp)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
      return groups
    },
    {} as Record<string, ChatMessage[]>,
  )

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <Link href="/chat">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className={conversation.type === "group" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}
            >
              {getInitials(conversation.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold">{conversation.name}</h1>
            <p className="text-sm text-muted-foreground">
              {conversation.type === "group"
                ? `${conversation.participants.length} members`
                : conversation.participants[0]?.isOnline
                  ? "Online"
                  : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {conversation.type === "direct" && (
            <>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {conversation.type === "direct" ? (
                <>
                  <DropdownMenuItem>
                    <Search className="h-4 w-4 mr-2" />
                    Search in chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <VolumeX className="h-4 w-4 mr-2" />
                    Mute notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive chat
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete chat
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add members
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Search className="h-4 w-4 mr-2" />
                    Search in chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <VolumeX className="h-4 w-4 mr-2" />
                    Mute notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive chat
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Leave group
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date}>
              <div className="flex justify-center mb-4">
                <Badge variant="secondary" className="text-xs">
                  {date}
                </Badge>
              </div>
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-3 py-2 ${
                        message.senderId === "me" ? "bg-emerald-600 text-white" : "bg-muted text-foreground"
                      }`}
                    >
                      {conversation.type === "group" && message.senderId !== "me" && (
                        <p className="text-xs font-semibold mb-1 opacity-70">{message.senderName}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === "me" ? "text-emerald-100" : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {(isTyping || conversation.isTyping) && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
