"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  Check,
  Settings,
  DollarSign,
  Users,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  Calendar,
  CreditCard,
  PiggyBank,
  CheckCircle,
  Trash2,
} from "lucide-react"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "payment",
      title: "Payment Received",
      message: "You received $500 from Sunrise Chama monthly contribution",
      time: "2 minutes ago",
      read: false,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      type: "group",
      title: "New Group Invitation",
      message: "Sarah invited you to join 'Future Builders Investment Group'",
      time: "1 hour ago",
      read: false,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      type: "chat",
      title: "New Message",
      message: "John: Don't forget about tomorrow's meeting at 2 PM",
      time: "3 hours ago",
      read: true,
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: 4,
      type: "investment",
      title: "Investment Update",
      message: "Your Tech Growth Fund is up 5.2% this week (+$750)",
      time: "5 hours ago",
      read: false,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 5,
      type: "alert",
      title: "Payment Due Reminder",
      message: "Your loan payment of $250 is due in 3 days",
      time: "1 day ago",
      read: true,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: 6,
      type: "meeting",
      title: "Meeting Reminder",
      message: "Unity Chama monthly meeting starts in 30 minutes",
      time: "2 days ago",
      read: true,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 7,
      type: "payment",
      title: "Transaction Completed",
      message: "Successfully sent $200 to Mary for group contribution",
      time: "3 days ago",
      read: true,
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 8,
      type: "loan",
      title: "Loan Approved",
      message: "Your loan application for $5,000 has been approved",
      time: "1 week ago",
      read: true,
      icon: PiggyBank,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ])

  const [settings, setSettings] = useState({
    payments: true,
    groups: true,
    chat: true,
    investments: true,
    alerts: true,
    meetings: true,
    loans: true,
    email: true,
    push: true,
    sms: false,
  })

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getFilteredNotifications = () => {
    if (selectedTab === "all") return notifications
    if (selectedTab === "unread") return notifications.filter((n) => !n.read)
    return notifications.filter((n) => n.type === selectedTab)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const notificationTypes = [
    { key: "payments", label: "Payments", icon: DollarSign },
    { key: "groups", label: "Groups", icon: Users },
    { key: "chat", label: "Messages", icon: MessageCircle },
    { key: "investments", label: "Investments", icon: TrendingUp },
    { key: "alerts", label: "Alerts", icon: AlertTriangle },
    { key: "meetings", label: "Meetings", icon: Calendar },
    { key: "loans", label: "Loans", icon: PiggyBank },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <h1 className="text-lg font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20 md:pb-4 space-y-6 max-w-4xl mx-auto w-full">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="group">Groups</TabsTrigger>
            <TabsTrigger value="chat" className="hidden lg:flex">
              Messages
            </TabsTrigger>
            <TabsTrigger value="investment" className="hidden lg:flex">
              Investments
            </TabsTrigger>
            <TabsTrigger value="alert" className="hidden lg:flex">
              Alerts
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {getFilteredNotifications().map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-md ${!notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${notification.bgColor}`}>
                      <notification.icon className={`h-4 w-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-7 text-xs"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {getFilteredNotifications().length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-2">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {getFilteredNotifications().map((notification) => (
              <Card
                key={notification.id}
                className="transition-all hover:shadow-md border-l-4 border-l-blue-500 bg-blue-50/30"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${notification.bgColor}`}>
                      <notification.icon className={`h-4 w-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-7 text-xs"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark Read
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {getFilteredNotifications().length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">You have no unread notifications.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {["payment", "group", "chat", "investment", "alert", "meeting", "loan"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              {getFilteredNotifications().map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${!notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${notification.bgColor}`}>
                        <notification.icon className={`h-4 w-4 ${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center space-x-2 mt-3">
                          {!notification.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-7 text-xs"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {getFilteredNotifications().length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-lg mb-2">No {type} notifications</h3>
                    <p className="text-muted-foreground">You have no {type} notifications at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  {notificationTypes.map((type) => (
                    <div key={type.key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <type.icon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor={type.key}>{type.label}</Label>
                      </div>
                      <Switch
                        id={type.key}
                        checked={settings[type.key as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, [type.key]: checked }))}
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Methods</h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email">Email Notifications</Label>
                    <Switch
                      id="email"
                      checked={settings.email}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push">Push Notifications</Label>
                    <Switch
                      id="push"
                      checked={settings.push}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms">SMS Notifications</Label>
                    <Switch
                      id="sms"
                      checked={settings.sms}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, sms: checked }))}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
