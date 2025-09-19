"use client"

import * as React from "react"
import { ArrowLeft, Search, Plus, Bot, Crown, Shield, User, Users, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Contact {
  id: string
  name: string
  role: "admin" | "treasurer" | "secretary" | "member"
  isOnline: boolean
  lastSeen?: string
  avatar?: string
  isSelected?: boolean
}

interface Group {
  id: string
  name: string
  description: string
  type: "chama" | "investment" | "savings" | "social"
  memberCount: number
  isActive: boolean
  lastActivity: string
}

const mockContacts: Contact[] = [
  {
    id: "user-1",
    name: "Sarah Wanjiku",
    role: "treasurer",
    isOnline: true,
    avatar: "/placeholder.svg",
  },
  {
    id: "user-2",
    name: "John Kamau",
    role: "admin",
    isOnline: true,
    avatar: "/placeholder.svg",
  },
  {
    id: "user-3",
    name: "Mary Njeri",
    role: "secretary",
    isOnline: false,
    lastSeen: "2 hours ago",
    avatar: "/placeholder.svg",
  },
  {
    id: "user-4",
    name: "Peter Ochieng",
    role: "member",
    isOnline: true,
    avatar: "/placeholder.svg",
  },
  {
    id: "user-5",
    name: "Grace Akinyi",
    role: "admin",
    isOnline: false,
    lastSeen: "1 day ago",
    avatar: "/placeholder.svg",
  },
  {
    id: "user-6",
    name: "David Mwangi",
    role: "member",
    isOnline: true,
    avatar: "/placeholder.svg",
  },
  {
    id: "user-7",
    name: "Ruth Wambui",
    role: "secretary",
    isOnline: false,
    lastSeen: "3 hours ago",
    avatar: "/placeholder.svg",
  },
]

const mockGroups: Group[] = [
  {
    id: "group-1",
    name: "Umoja Chama",
    description: "Monthly savings and investment group",
    type: "chama",
    memberCount: 12,
    isActive: true,
    lastActivity: "2 hours ago",
  },
  {
    id: "group-2",
    name: "Investment Committee",
    description: "Strategic investment planning and decisions",
    type: "investment",
    memberCount: 8,
    isActive: true,
    lastActivity: "1 day ago",
  },
  {
    id: "group-3",
    name: "Savings Circle",
    description: "Weekly savings contributions and support",
    type: "savings",
    memberCount: 15,
    isActive: true,
    lastActivity: "5 hours ago",
  },
  {
    id: "group-4",
    name: "Business Network",
    description: "Networking and business opportunities",
    type: "social",
    memberCount: 25,
    isActive: false,
    lastActivity: "1 week ago",
  },
]

function getRoleIcon(role: string) {
  switch (role) {
    case "admin":
      return <Crown className="h-3 w-3" />
    case "treasurer":
      return <Shield className="h-3 w-3" />
    case "secretary":
      return <User className="h-3 w-3" />
    default:
      return <User className="h-3 w-3" />
  }
}

function getRoleColor(role: string) {
  switch (role) {
    case "admin":
      return "bg-yellow-100 text-yellow-800"
    case "treasurer":
      return "bg-blue-100 text-blue-800"
    case "secretary":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getGroupTypeColor(type: string) {
  switch (type) {
    case "chama":
      return "bg-purple-100 text-purple-800"
    case "investment":
      return "bg-blue-100 text-blue-800"
    case "savings":
      return "bg-green-100 text-green-800"
    case "social":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export default function NewChatPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("people")
  const [showGroupDialog, setShowGroupDialog] = React.useState(false)
  const [selectedContacts, setSelectedContacts] = React.useState<Contact[]>([])
  const [groupName, setGroupName] = React.useState("")
  const [groupDescription, setGroupDescription] = React.useState("")

  const filteredContacts = React.useMemo(() => {
    return mockContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const filteredGroups = React.useMemo(() => {
    return mockGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const handleStartDirectChat = (contactId: string) => {
    // Simulate creating a new direct chat
    router.push(`/chat/${contactId}`)
  }

  const handleJoinGroupChat = (groupId: string) => {
    router.push(`/chat/${groupId}`)
  }

  const handleContactSelection = (contact: Contact) => {
    setSelectedContacts((prev) => {
      const isSelected = prev.some((c) => c.id === contact.id)
      if (isSelected) {
        return prev.filter((c) => c.id !== contact.id)
      } else {
        return [...prev, contact]
      }
    })
  }

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedContacts.length > 0) {
      // Simulate creating a new group
      const newGroupId = `group-${Date.now()}`
      router.push(`/chat/${newGroupId}`)
    }
  }

  const resetGroupCreation = () => {
    setGroupName("")
    setGroupDescription("")
    setSelectedContacts([])
    setShowGroupDialog(false)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/chat">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">New Chat</h1>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowGroupDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* TrustLoop Assistant */}
      <div className="p-4 border-b bg-emerald-50">
        <Link href="/chat/bot">
          <Card className="hover:bg-emerald-100/50 transition-colors cursor-pointer border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-emerald-100 text-emerald-800">
                    <Bot className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">TrustLoop Assistant</h3>
                    <Badge className="bg-emerald-600 text-white text-xs">AI</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get help with your account, payments, groups, and loans
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Search */}
      <div className="p-4 border-b bg-white sticky top-[73px] z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search people and groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-2 sticky top-[145px] z-10 bg-white">
          <TabsTrigger value="people" className="text-sm">
            People ({filteredContacts.length})
          </TabsTrigger>
          <TabsTrigger value="groups" className="text-sm">
            Groups ({filteredGroups.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="people" className="flex-1 mt-2 overflow-hidden">
          <ScrollArea className="h-full">
            {filteredContacts.length > 0 ? (
              <div className="space-y-1 p-4 pb-20">
                {filteredContacts.map((contact) => (
                  <Card
                    key={contact.id}
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleStartDirectChat(contact.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {getInitials(contact.name)}
                            </AvatarFallback>
                          </Avatar>
                          {contact.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{contact.name}</h3>
                            <Badge variant="secondary" className={`text-xs ${getRoleColor(contact.role)}`}>
                              <div className="flex items-center gap-1">
                                {getRoleIcon(contact.role)}
                                <span className="capitalize">{contact.role}</span>
                              </div>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {contact.isOnline ? "Online" : `Last seen ${contact.lastSeen}`}
                          </p>
                        </div>
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No people found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try a different search term" : "No contacts available"}
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 mt-2 overflow-hidden">
          <ScrollArea className="h-full">
            {filteredGroups.length > 0 ? (
              <div className="space-y-1 p-4 pb-20">
                {filteredGroups.map((group) => (
                  <Card
                    key={group.id}
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleJoinGroupChat(group.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            <Users className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{group.name}</h3>
                            <Badge variant="secondary" className={`text-xs ${getGroupTypeColor(group.type)}`}>
                              <span className="capitalize">{group.type}</span>
                            </Badge>
                            {!group.isActive && (
                              <Badge variant="outline" className="text-xs">
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-1">{group.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{group.memberCount} members</span>
                            <span>Active {group.lastActivity}</span>
                          </div>
                        </div>
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No groups found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try a different search term" : "No groups available"}
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowGroupDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Create Group Dialog */}
      <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
        <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 flex-1 overflow-hidden">
            {/* Group Details */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  placeholder="Enter group name..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="groupDescription">Description (Optional)</Label>
                <Textarea
                  id="groupDescription"
                  placeholder="Describe your group..."
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Member Selection */}
            <div className="flex-1 flex flex-col min-h-0">
              <Label>Select Members ({selectedContacts.length} selected)</Label>
              <ScrollArea className="flex-1 mt-2 border rounded-md">
                <div className="p-2">
                  {mockContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => handleContactSelection(contact)}
                    >
                      <Checkbox
                        checked={selectedContacts.some((c) => c.id === contact.id)}
                        onChange={() => handleContactSelection(contact)}
                      />
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                          {getInitials(contact.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{contact.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{contact.role}</p>
                      </div>
                      {selectedContacts.some((c) => c.id === contact.id) && (
                        <Check className="h-4 w-4 text-emerald-600" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetGroupCreation} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleCreateGroup}
                disabled={!groupName.trim() || selectedContacts.length === 0}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Create Group
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
