"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, CreditCard, DollarSign, Users, HelpCircle, TrendingUp, History } from "lucide-react"
import { cn } from "@/lib/utils"

interface BotChatProps {
  onSendMessage: (message: string) => void
  onQuickReply: (reply: string) => void
}

export function BotChat({ onSendMessage, onQuickReply }: BotChatProps) {
  const [showQuickReplies, setShowQuickReplies] = React.useState(true)

  const quickReplyActions = [
    {
      text: "Check my loan status",
      icon: <CreditCard className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
    {
      text: "Make a payment",
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    {
      text: "View group balance",
      icon: <Users className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    },
    {
      text: "Contact support",
      icon: <HelpCircle className="h-4 w-4" />,
      color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    },
    {
      text: "Investment options",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    },
    {
      text: "Payment history",
      icon: <History className="h-4 w-4" />,
      color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    },
  ]

  const handleQuickReply = (reply: string) => {
    onQuickReply(reply)
    setShowQuickReplies(false)
  }

  return (
    <div className="space-y-4">
      {/* Bot Welcome Message */}
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-emerald-100 text-emerald-800">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
            <p className="text-sm">
              Hello! I'm your TrustLoop Assistant. I can help you with payments, loans, group management, and more. What
              would you like to do today?
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Just now</p>
        </div>
      </div>

      {/* Quick Reply Options */}
      {showQuickReplies && (
        <Card className="border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">Quick actions</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickReplyActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={cn("justify-start h-auto p-3 text-left", action.color)}
                  onClick={() => handleQuickReply(action.text)}
                >
                  <div className="flex items-center gap-3">
                    {action.icon}
                    <span className="text-sm">{action.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bot Capabilities */}
      <Card className="border-emerald-200">
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Bot className="h-4 w-4 text-emerald-600" />
            What I can help you with
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              <span>Check loan status and payment schedules</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              <span>Process payments and transfers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              <span>View group balances and contributions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              <span>Provide investment recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              <span>Answer questions about TrustLoop features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              <span>Connect you with customer support</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
