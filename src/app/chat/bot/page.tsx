"use client"

import * as React from "react"
import {
  ArrowLeft,
  Send,
  MoreVertical,
  Download,
  Settings,
  Trash2,
  Smile,
  Paperclip,
  Bot,
  DollarSign,
  Users,
  CreditCard,
  HelpCircle,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface BotMessage {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  quickActions?: Array<{
    label: string
    action: string
    icon?: React.ReactNode
  }>
}

const initialQuickActions = [
  { label: "Check Balance", action: "balance", icon: <DollarSign className="h-4 w-4" /> },
  { label: "View Groups", action: "groups", icon: <Users className="h-4 w-4" /> },
  { label: "Make Payment", action: "payment", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Loan Info", action: "loans", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Get Help", action: "help", icon: <HelpCircle className="h-4 w-4" /> },
]

const botResponses: Record<
  string,
  { message: string; quickActions?: Array<{ label: string; action: string; icon?: React.ReactNode }> }
> = {
  balance: {
    message:
      "Your current TrustLoop balance is KES 15,750. You have 2 active savings goals and 1 pending loan payment of KES 2,500 due next week.",
    quickActions: [
      { label: "View Transactions", action: "transactions", icon: <DollarSign className="h-4 w-4" /> },
      { label: "Make Payment", action: "payment", icon: <CreditCard className="h-4 w-4" /> },
      { label: "Set Savings Goal", action: "savings", icon: <TrendingUp className="h-4 w-4" /> },
    ],
  },
  groups: {
    message:
      "You're a member of 3 groups: Umoja Chama (12 members), Investment Committee (8 members), and Savings Circle (15 members). Your next meeting is with Umoja Chama tomorrow at 2 PM.",
    quickActions: [
      { label: "View Group Details", action: "group-details", icon: <Users className="h-4 w-4" /> },
      { label: "Group Payments", action: "group-payments", icon: <CreditCard className="h-4 w-4" /> },
      { label: "Join New Group", action: "join-group", icon: <Users className="h-4 w-4" /> },
    ],
  },
  payment: {
    message: "I can help you make payments to your groups or loan repayments. What would you like to pay for today?",
    quickActions: [
      { label: "Group Contribution", action: "group-payment", icon: <Users className="h-4 w-4" /> },
      { label: "Loan Payment", action: "loan-payment", icon: <TrendingUp className="h-4 w-4" /> },
      { label: "View Payment History", action: "payment-history", icon: <DollarSign className="h-4 w-4" /> },
    ],
  },
  loans: {
    message:
      "You have 1 active loan of KES 50,000 with 18 months remaining. Your next payment of KES 2,500 is due on January 20th. Your credit score is 750 (Excellent).",
    quickActions: [
      { label: "Make Payment", action: "loan-payment", icon: <CreditCard className="h-4 w-4" /> },
      { label: "Apply for New Loan", action: "new-loan", icon: <TrendingUp className="h-4 w-4" /> },
      { label: "View Loan Details", action: "loan-details", icon: <DollarSign className="h-4 w-4" /> },
    ],
  },
  help: {
    message:
      "I'm here to help! I can assist you with account information, payments, group management, loans, and general TrustLoop questions. What do you need help with?",
    quickActions: [
      { label: "Account Issues", action: "account-help", icon: <HelpCircle className="h-4 w-4" /> },
      { label: "Payment Problems", action: "payment-help", icon: <CreditCard className="h-4 w-4" /> },
      { label: "Contact Support", action: "support", icon: <HelpCircle className="h-4 w-4" /> },
    ],
  },
  greeting: {
    message:
      "Hello! I'm your TrustLoop Assistant. I'm here to help you manage your finances, groups, and loans. How can I assist you today?",
    quickActions: initialQuickActions,
  },
  default: {
    message:
      "I understand you're asking about that. Let me help you with your TrustLoop account. Is there something specific you'd like to know about your balance, groups, payments, or loans?",
    quickActions: initialQuickActions,
  },
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function BotChatPage() {
  const [messages, setMessages] = React.useState<BotMessage[]>([
    {
      id: "welcome",
      content:
        "Hi! I'm your TrustLoop Assistant. I'm here to help you manage your finances, groups, and loans. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
      quickActions: initialQuickActions,
    },
  ])
  const [newMessage, setNewMessage] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (content?: string) => {
    const messageContent = content || newMessage.trim()
    if (!messageContent) return

    const userMessage: BotMessage = {
      id: `user-${Date.now()}`,
      content: messageContent,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const lowerContent = messageContent.toLowerCase()
      let response = botResponses.default

      if (lowerContent.includes("balance") || lowerContent.includes("money") || lowerContent.includes("account")) {
        response = botResponses.balance
      } else if (lowerContent.includes("group") || lowerContent.includes("chama") || lowerContent.includes("member")) {
        response = botResponses.groups
      } else if (lowerContent.includes("payment") || lowerContent.includes("pay") || lowerContent.includes("send")) {
        response = botResponses.payment
      } else if (lowerContent.includes("loan") || lowerContent.includes("borrow") || lowerContent.includes("credit")) {
        response = botResponses.loans
      } else if (lowerContent.includes("help") || lowerContent.includes("support") || lowerContent.includes("assist")) {
        response = botResponses.help
      } else if (lowerContent.includes("hi") || lowerContent.includes("hello") || lowerContent.includes("hey")) {
        response = botResponses.greeting
      }

      const botMessage: BotMessage = {
        id: `bot-${Date.now()}`,
        content: response.message,
        isBot: true,
        timestamp: new Date(),
        quickActions: response.quickActions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string, label: string) => {
    handleSendMessage(label)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearConversation = () => {
    setMessages([
      {
        id: "welcome-new",
        content:
          "Hi! I'm your TrustLoop Assistant. I'm here to help you manage your finances, groups, and loans. How can I assist you today?",
        isBot: true,
        timestamp: new Date(),
        quickActions: initialQuickActions,
      },
    ])
  }

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
            <AvatarFallback className="bg-emerald-100 text-emerald-800">
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold">TrustLoop Assistant</h1>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-muted-foreground">Always available</p>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={clearConversation}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export chat
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Bot settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] ${message.isBot ? "mr-auto" : "ml-auto"}`}>
                {message.isBot && (
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-emerald-100 text-emerald-800">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">TrustLoop Assistant</span>
                    <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                      AI
                    </Badge>
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-3 ${
                    message.isBot ? "bg-muted text-foreground border" : "bg-emerald-600 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.isBot ? "text-muted-foreground" : "text-emerald-100"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {/* Quick Actions */}
                {message.isBot && message.quickActions && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground px-1">Quick actions:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {message.quickActions.map((action, index) => (
                        <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                          <CardContent className="p-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start h-auto p-0 font-normal"
                              onClick={() => handleQuickAction(action.action, action.label)}
                            >
                              <div className="flex items-center gap-2">
                                {action.icon}
                                <span className="text-sm">{action.label}</span>
                              </div>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-emerald-100 text-emerald-800">
                    <Bot className="h-3 w-3" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">TrustLoop Assistant is typing</span>
              </div>
              <div className="bg-muted rounded-lg px-4 py-3 border ml-8">
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
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Ask me anything about your TrustLoop account..."
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
            onClick={() => handleSendMessage()}
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
