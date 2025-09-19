"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Paperclip,
  ImageIcon,
  Mic,
  Phone,
  Video,
  MoreVertical,
  Users,
  Bot,
  Download,
  Reply,
  Smile,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ChatConversation, ChatMessage } from "./types"
import { cn } from "@/lib/utils"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function formatMessageTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

interface ChatInterfaceProps {
  conversation: ChatConversation
  messages: ChatMessage[]
  currentUserId: string
  onSendMessage: (content: string, type?: "text" | "image" | "document") => void
  onSendBotMessage?: (message: string) => void
}

export function ChatInterface({
  conversation,
  messages,
  currentUserId,
  onSendMessage,
  onSendBotMessage,
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      if (conversation.type === "bot" && onSendBotMessage) {
        onSendBotMessage(newMessage.trim())
      } else {
        onSendMessage(newMessage.trim())
      }
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileType = file.type.startsWith("image/") ? "image" : "document"
      onSendMessage(`Shared ${file.name}`, fileType)
    }
  }

  const getConversationHeader = () => {
    if (conversation.type === "bot") {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-100 text-emerald-800">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">TrustLoop Assistant</h3>
            <p className="text-xs text-muted-foreground">Always available to help</p>
          </div>
        </div>
      )
    }

    if (conversation.type === "group") {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-100 text-emerald-800">
              <Users className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">{conversation.name}</h3>
            <p className="text-xs text-muted-foreground">{conversation.participants.length} members</p>
          </div>
        </div>
      )
    }

    const participant = conversation.participants[0]
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-100 text-emerald-800">{initials(conversation.name)}</AvatarFallback>
          </Avatar>
          {participant?.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-sm">{conversation.name}</h3>
          <p className="text-xs text-muted-foreground">
            {participant?.isOnline
              ? "Online"
              : participant?.lastSeen
                ? `Last seen ${formatMessageTime(participant.lastSeen)}`
                : "Offline"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card className="h-full rounded-none border-l-0 border-t-0 border-b-0">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          {getConversationHeader()}

          <div className="flex items-center gap-2">
            {conversation.type === "direct" && (
              <>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Video className="h-4 w-4" />
                </Button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View profile</DropdownMenuItem>
                <DropdownMenuItem>Search messages</DropdownMenuItem>
                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                {conversation.type === "group" && <DropdownMenuItem>Group settings</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-full flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwn = message.senderId === currentUserId
              const isBot = message.senderId === "bot"

              return (
                <div key={message.id} className={cn("flex gap-3", isOwn ? "flex-row-reverse" : "flex-row")}>
                  {!isOwn && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className={cn("text-xs", isBot ? "bg-emerald-100 text-emerald-800" : "bg-muted")}>
                        {isBot ? <Bot className="h-3 w-3" /> : initials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={cn("max-w-[80%] space-y-1", isOwn ? "items-end" : "items-start")}>
                    {!isOwn && conversation.type === "group" && (
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{message.senderName}</p>
                        {conversation.participants.find((p) => p.id === message.senderId)?.role && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {conversation.participants.find((p) => p.id === message.senderId)?.role}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm",
                        isOwn
                          ? "bg-emerald-600 text-white"
                          : isBot
                            ? "bg-emerald-50 border border-emerald-200"
                            : "bg-muted",
                      )}
                    >
                      {message.type === "text" && <p>{message.content}</p>}

                      {message.type === "image" && (
                        <div className="space-y-2">
                          <div className="rounded bg-muted/20 p-2 text-xs flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Image
                          </div>
                          <p>{message.content}</p>
                        </div>
                      )}

                      {message.type === "document" && message.attachments && (
                        <div className="space-y-2">
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id} className="rounded bg-muted/20 p-2 text-xs">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Paperclip className="h-4 w-4" />
                                  <div>
                                    <p className="font-medium">{attachment.name}</p>
                                    <p className="text-muted-foreground">{formatFileSize(attachment.size)}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          {message.content && <p>{message.content}</p>}
                        </div>
                      )}

                      {message.type === "system" && (
                        <p className="text-center text-muted-foreground italic">{message.content}</p>
                      )}
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 text-xs text-muted-foreground",
                        isOwn ? "justify-end" : "justify-start",
                      )}
                    >
                      <span>{formatMessageTime(message.timestamp)}</span>
                      {!isOwn && (
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                          <Reply className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-muted text-xs">
                    {conversation.type === "bot" ? <Bot className="h-3 w-3" /> : "..."}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <div className="flex gap-1">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>

            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={conversation.type === "bot" ? "Ask me anything..." : "Type a message..."}
              className="flex-1"
            />

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Mic className="h-4 w-4" />
            </Button>

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
