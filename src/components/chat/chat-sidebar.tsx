"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MessageCircle, Users, Bot, Pin, VolumeX, Archive, MoreVertical, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ChatConversation } from "./types"
import { cn } from "@/lib/utils"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function formatTime(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "now"
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  return date.toLocaleDateString()
}

interface ChatSidebarProps {
  conversations: ChatConversation[]
  activeConversationId?: string
  onConversationSelect: (conversationId: string) => void
  onNewChat: () => void
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewChat,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "groups" | "direct" | "bot">("all")

  const filteredConversations = React.useMemo(() => {
    let filtered = conversations

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((conv) => {
        if (filter === "groups") return conv.type === "group"
        if (filter === "direct") return conv.type === "direct"
        if (filter === "bot") return conv.type === "bot"
        return true
      })
    }

    // Sort by pinned first, then by last message time
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return b.updatedAt.getTime() - a.updatedAt.getTime()
    })
  }, [conversations, searchQuery, filter])

  const getConversationIcon = (conversation: ChatConversation) => {
    if (conversation.type === "bot") return <Bot className="h-4 w-4" />
    if (conversation.type === "group") return <Users className="h-4 w-4" />
    return <MessageCircle className="h-4 w-4" />
  }

  const getConversationAvatar = (conversation: ChatConversation) => {
    if (conversation.type === "bot") {
      return (
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-emerald-100 text-emerald-800">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )
    }

    return (
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-emerald-100 text-emerald-800">{initials(conversation.name)}</AvatarFallback>
      </Avatar>
    )
  }

  return (
    <Card className="h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button onClick={onNewChat} size="icon" variant="ghost" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="text-xs"
            >
              All
            </Button>
            <Button
              variant={filter === "groups" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("groups")}
              className="text-xs"
            >
              <Users className="h-3 w-3 mr-1" />
              Groups
            </Button>
            <Button
              variant={filter === "direct" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("direct")}
              className="text-xs"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Direct
            </Button>
            <Button
              variant={filter === "bot" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("bot")}
              className="text-xs"
            >
              <Bot className="h-3 w-3 mr-1" />
              Bot
            </Button>
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                  activeConversationId === conversation.id && "bg-emerald-50 border border-emerald-200",
                )}
                onClick={() => onConversationSelect(conversation.id)}
              >
                <div className="relative">
                  {getConversationAvatar(conversation)}
                  {conversation.type === "direct" && conversation.participants[0]?.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                      {conversation.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                      {conversation.isMuted && <VolumeX className="h-3 w-3 text-muted-foreground" />}
                    </div>
                    <div className="flex items-center gap-1">
                      {conversation.lastMessage && (
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>{conversation.isPinned ? "Unpin" : "Pin"} conversation</DropdownMenuItem>
                          <DropdownMenuItem>{conversation.isMuted ? "Unmute" : "Mute"} notifications</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage?.content || "No messages yet"}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge
                        variant="default"
                        className="bg-emerald-600 text-white text-xs px-2 py-0.5 min-w-[20px] h-5"
                      >
                        {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
                      </Badge>
                    )}
                  </div>

                  {conversation.type === "group" && (
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{conversation.participants.length} members</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredConversations.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? "No conversations found" : "No conversations yet"}
                </p>
                <Button onClick={onNewChat} variant="outline" size="sm" className="mt-2 bg-transparent">
                  Start a conversation
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
