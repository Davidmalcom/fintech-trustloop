"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, MessageCircle } from "lucide-react"
import type { ChatUser, ChatGroup } from "./types"
import { mockUsers, mockGroups } from "./mock-data"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

interface NewChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStartChat: (type: "direct" | "group", id: string, name: string) => void
}

export function NewChatDialog({ open, onOpenChange, onStartChat }: NewChatDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTab, setSelectedTab] = React.useState("users")

  const filteredUsers = React.useMemo(() => {
    return mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const filteredGroups = React.useMemo(() => {
    return mockGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const handleStartDirectChat = (user: ChatUser) => {
    onStartChat("direct", user.id, user.name)
    onOpenChange(false)
    setSearchQuery("")
  }

  const handleStartGroupChat = (group: ChatGroup) => {
    onStartChat("group", group.id, group.name)
    onOpenChange(false)
    setSearchQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Start a new conversation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search people or groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                People
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Groups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-4">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => handleStartDirectChat(user)}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-emerald-100 text-emerald-800">
                            {initials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{user.name}</p>
                          {user.role && (
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {user.isOnline
                            ? "Online"
                            : user.lastSeen
                              ? `Last seen ${user.lastSeen.toLocaleTimeString()}`
                              : "Offline"}
                        </p>
                      </div>
                    </div>
                  ))}
                  {filteredUsers.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No people found</p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="groups" className="mt-4">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {filteredGroups.map((group) => (
                    <div
                      key={group.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => handleStartGroupChat(group)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-emerald-100 text-emerald-800">
                          <Users className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{group.name}</p>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              group.type === "chama"
                                ? "border-emerald-200 text-emerald-800"
                                : group.type === "investment"
                                  ? "border-blue-200 text-blue-800"
                                  : "border-purple-200 text-purple-800"
                            }`}
                          >
                            {group.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {group.memberCount} members • {group.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  {filteredGroups.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No groups found</p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
