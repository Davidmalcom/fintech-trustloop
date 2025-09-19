"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Smartphone, Mail, MessageCircle, CreditCard, Users, TrendingUp } from "lucide-react"

export function NotificationSettings() {
  const [settings, setSettings] = React.useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    groupUpdates: true,
    loanAlerts: true,
    investmentUpdates: false,
    marketingEmails: false,
    quietHours: "22:00-07:00",
    frequency: "immediate",
  })

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Notification Preferences</CardTitle>
        <p className="text-xs text-muted-foreground">Choose how you want to be notified</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Notification Channels */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Notification Channels</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="push" className="text-sm font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Receive notifications on your device</p>
                </div>
              </div>
              <Switch
                id="push"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                id="email"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="sms" className="text-sm font-medium">
                    SMS Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Receive important alerts via SMS</p>
                </div>
              </div>
              <Switch
                id="sms"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
              />
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">What to notify me about</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-emerald-600" />
                <div>
                  <Label htmlFor="payments" className="text-sm font-medium">
                    Payment Reminders
                  </Label>
                  <p className="text-xs text-muted-foreground">Due dates and overdue payments</p>
                </div>
              </div>
              <Switch
                id="payments"
                checked={settings.paymentReminders}
                onCheckedChange={(checked) => updateSetting("paymentReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <Label htmlFor="groups" className="text-sm font-medium">
                    Group Updates
                  </Label>
                  <p className="text-xs text-muted-foreground">New members, announcements, and activities</p>
                </div>
              </div>
              <Switch
                id="groups"
                checked={settings.groupUpdates}
                onCheckedChange={(checked) => updateSetting("groupUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-amber-600" />
                <div>
                  <Label htmlFor="loans" className="text-sm font-medium">
                    Loan Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">Loan approvals, due dates, and updates</p>
                </div>
              </div>
              <Switch
                id="loans"
                checked={settings.loanAlerts}
                onCheckedChange={(checked) => updateSetting("loanAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <div>
                  <Label htmlFor="investments" className="text-sm font-medium">
                    Investment Updates
                  </Label>
                  <p className="text-xs text-muted-foreground">Performance reports and opportunities</p>
                </div>
              </div>
              <Switch
                id="investments"
                checked={settings.investmentUpdates}
                onCheckedChange={(checked) => updateSetting("investmentUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-gray-600" />
                <div>
                  <Label htmlFor="marketing" className="text-sm font-medium">
                    Marketing Communications
                  </Label>
                  <p className="text-xs text-muted-foreground">Product updates and promotional offers</p>
                </div>
              </div>
              <Switch
                id="marketing"
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => updateSetting("marketingEmails", checked)}
              />
            </div>
          </div>
        </div>

        {/* Notification Timing */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Notification Timing</h4>

          <div className="grid gap-3">
            <div>
              <Label className="text-sm">Quiet Hours</Label>
              <Select value={settings.quietHours} onValueChange={(value) => updateSetting("quietHours", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No quiet hours</SelectItem>
                  <SelectItem value="22:00-07:00">10 PM - 7 AM</SelectItem>
                  <SelectItem value="23:00-06:00">11 PM - 6 AM</SelectItem>
                  <SelectItem value="21:00-08:00">9 PM - 8 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Notification Frequency</Label>
              <Select value={settings.frequency} onValueChange={(value) => updateSetting("frequency", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
