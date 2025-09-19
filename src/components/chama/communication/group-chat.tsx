"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Paperclip, ImageIcon } from "lucide-react"
import type { ChatMessage } from "../types"
import { cn } from "@/lib/utils"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function GroupChat({
  messages,
  currentUserId,
  onSendMessage,
}: {
  messages: ChatMessage[]
  currentUserId: string
  onSendMessage: (content: string) => void
}) {
  const [newMessage, setNewMessage] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Group Chat</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Messages */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-3">
          {messages.map((message) => {
            const isOwn = message.senderId === currentUserId
            return (
              <div key={message.id} className={cn("flex gap-2", isOwn ? "flex-row-reverse" : "flex-row")}>
                {!isOwn && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs">
                      {initials(message.senderName)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("max-w-[80%] space-y-1", isOwn ? "items-end" : "items-start")}>
                  {!isOwn && <p className="text-xs text-muted-foreground">{message.senderName}</p>}
                  <div className={cn("rounded-lg px-3 py-2 text-sm", isOwn ? "bg-emerald-600 text-white" : "bg-muted")}>
                    {message.type === "text" && <p>{message.content}</p>}
                    {message.type === "image" && (
                      <div className="space-y-1">
                        <div className="rounded bg-muted/20 p-2 text-xs">📷 Image</div>
                        <p>{message.content}</p>
                      </div>
                    )}
                    {message.type === "document" && (
                      <div className="space-y-1">
                        <div className="rounded bg-muted/20 p-2 text-xs">📄 Document</div>
                        <p>{message.content}</p>
                      </div>
                    )}
                  </div>
                  <p className={cn("text-xs text-muted-foreground", isOwn ? "text-right" : "text-left")}>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-3">
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              size="icon"
              className="h-8 w-8 bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
