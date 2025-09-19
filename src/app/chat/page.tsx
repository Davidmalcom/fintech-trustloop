"use client"

import * as React from "react"
import { Search, MessageCircle, Users, Bot, Plus, Pin, Archive, MoreVertical, VolumeX, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
//import { mockBottomNavItems } from "@/components/dashboard/bottom-nav/mock"
import Link from "next/link"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

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
  type: "direct" | "group" | "bot"
  participants: Array<{
    id: string
    name: string
    avatar?: string
    isOnline: boolean
    role?: string
  }>
  lastMessage?: ChatMessage
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
  isArchived: boolean
  updatedAt: Date
}

const mockConversations: ChatConversation[] = [
  {
    id: "bot",
    name: "TrustLoop Assistant",
    type: "bot",
    participants: [
      {
        id: "bot-1",
        name: "TrustLoop Assistant",
        isOnline: true,
      },
    ],
    lastMessage: {
      id: "msg-bot-1",
      senderId: "bot-1",
      senderName: "TrustLoop Assistant",
      content: "Hi! I'm here to help you with your TrustLoop account. Ask me anything!",
      type: "text",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
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
    lastMessage: {
      id: "msg-1",
      senderId: "user-1",
      senderName: "Sarah Wanjiku",
      content: "Thanks for the loan payment reminder!",
      type: "text",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
    },
    unreadCount: 2,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "conv-2",
    name: "Umoja Chama",
    type: "group",
    participants: [
      { id: "user-2", name: "John Kamau", isOnline: true, role: "admin" },
      { id: "user-3", name: "Mary Njeri", isOnline: false, role: "treasurer" },
      { id: "user-4", name: "Peter Ochieng", isOnline: true, role: "member" },
    ],
    lastMessage: {
      id: "msg-2",
      senderId: "user-2",
      senderName: "John Kamau",
      content: "Meeting tomorrow at 2 PM",
      type: "text",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: false,
    },
    unreadCount: 5,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
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
    lastMessage: {
      id: "msg-3",
      senderId: "user-2",
      senderName: "John Kamau",
      content: "I'll send the documents today",
      type: "text",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "conv-4",
    name: "Investment Committee",
    type: "group",
    participants: [
      { id: "user-5", name: "Grace Akinyi", isOnline: true, role: "admin" },
      { id: "user-6", name: "David Mwangi", isOnline: false, role: "member" },
      { id: "user-7", name: "Ruth Wambui", isOnline: true, role: "secretary" },
    ],
    lastMessage: {
      id: "msg-4",
      senderId: "user-5",
      senderName: "Grace Akinyi",
      content: "New investment proposal approved",
      type: "text",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: false,
    },
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  // Add more mock conversations for better scrolling demonstration
  {
    id: "conv-5",
    name: "Finance Team",
    type: "group",
    participants: [
      { id: "user-8", name: "Michael Kiprotich", isOnline: true, role: "treasurer" },
      { id: "user-9", name: "Ann Mwangi", isOnline: false, role: "member" },
    ],
    lastMessage: {
      id: "msg-5",
      senderId: "user-8",
      senderName: "Michael Kiprotich",
      content: "Budget review completed",
      type: "text",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "conv-6",
    name: "Alice Wanjiru",
    type: "direct",
    participants: [
      {
        id: "user-10",
        name: "Alice Wanjiru",
        isOnline: false,
      },
    ],
    lastMessage: {
      id: "msg-6",
      senderId: "user-10",
      senderName: "Alice Wanjiru",
      content: "Thank you for the help!",
      type: "text",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
    isArchived: false,
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
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

export default function ChatListPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [conversations, setConversations] = React.useState<ChatConversation[]>(mockConversations)

  const filteredConversations = React.useMemo(() => {
    let filtered = conversations

    if (searchQuery) {
      filtered = filtered.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return b.updatedAt.getTime() - a.updatedAt.getTime()
    })
  }, [conversations, searchQuery])

  const directChats = filteredConversations.filter((c) => c.type === "direct")
  const groupChats = filteredConversations.filter((c) => c.type === "group")

  const handleTogglePin = (conversationId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversationId ? { ...conv, isPinned: !conv.isPinned } : conv)),
    )
  }

  const handleArchive = (conversationId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, isArchived: true } : conv)))
  }

  const handleDelete = (conversationId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setConversations((prev) => prev.filter((conv) => conv.id !== conversationId))
  }

  const getConversationAvatar = (conversation: ChatConversation) => {
    if (conversation.type === "bot") {
      return (
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-emerald-100 text-emerald-800">
            <Bot className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      )
    }

    if (conversation.type === "group") {
      return (
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-purple-100 text-purple-800">
            <Users className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      )
    }

    return (
      <Avatar className="h-12 w-12">
        <AvatarFallback className="bg-blue-100 text-blue-800">{getInitials(conversation.name)}</AvatarFallback>
      </Avatar>
    )
  }

  const ConversationItem = ({ conversation }: { conversation: ChatConversation }) => {
    const href = conversation.type === "bot" ? "/chat/bot" : `/chat/${conversation.id}`

    return (
      <Link href={href} className="block group">
        <div className="flex items-center gap-3 p-4 hover:bg-muted/50 active:bg-muted/70 transition-colors border-b border-border/50 touch-manipulation">
          <div className="relative">
            {getConversationAvatar(conversation)}
            {conversation.type === "direct" && conversation.participants[0]?.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                {conversation.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                {conversation.isMuted && <VolumeX className="h-3 w-3 text-muted-foreground" />}
                {conversation.type === "bot" && (
                  <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                    AI
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
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
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.preventDefault()}
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => handleTogglePin(conversation.id, e)}>
                      <Pin className="h-4 w-4 mr-2" />
                      {conversation.isPinned ? "Unpin" : "Pin"} conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleArchive(conversation.id, e)}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleDelete(conversation.id, e)} className="text-destructive">
                      Delete conversation
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
                  className="bg-emerald-600 text-white text-xs px-2 py-0.5 min-w-[20px] h-5 ml-2"
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
      </Link>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - Sticky */}
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
          <Link href="/chat/new">
            <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Conversations - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="all" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-2 mb-2 sticky top-0 z-10 bg-white">
            <TabsTrigger value="all" className="text-xs">
              All ({filteredConversations.length})
            </TabsTrigger>
            <TabsTrigger value="direct" className="text-xs">
              Direct ({directChats.length})
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">
              Groups ({groupChats.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full">
              {filteredConversations.length > 0 ? (
                <div className="pb-20">
                  {filteredConversations.map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No conversations found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Try a different search term" : "Start a new conversation"}
                  </p>
                  <Link href="/chat/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Start Chatting</Button>
                  </Link>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="direct" className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full">
              {directChats.length > 0 ? (
                <div className="pb-20">
                  {directChats.map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No direct chats</h3>
                  <p className="text-muted-foreground mb-4">Start a conversation with someone</p>
                  <Link href="/chat/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">New Chat</Button>
                  </Link>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="groups" className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full">
              {groupChats.length > 0 ? (
                <div className="pb-20">
                  {groupChats.map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No group chats</h3>
                  <p className="text-muted-foreground mb-4">Create or join a group</p>
                  <Link href="/chat/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">New Group</Button>
                  </Link>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <BottomNav {...mockBottomNavProps} />
    </div>
  )
}
