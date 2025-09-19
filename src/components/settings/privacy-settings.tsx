"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Users, BarChart3, MapPin, Download, Trash2, Shield, Globe } from "lucide-react"

export function PrivacySettings() {
  const [settings, setSettings] = React.useState({
    profileVisibility: "friends",
    activitySharing: true,
    locationTracking: false,
    dataAnalytics: true,
    thirdPartySharing: false,
    marketingPersonalization: true,
  })

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Privacy Controls</CardTitle>
        <p className="text-xs text-muted-foreground">Control how your data is used and shared</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Privacy */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Profile Privacy</h4>

          <div className="space-y-3">
            <div>
              <Label className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Profile Visibility
              </Label>
              <Select
                value={settings.profileVisibility}
                onValueChange={(value) => updateSetting("profileVisibility", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Anyone can see</SelectItem>
                  <SelectItem value="friends">Group Members Only</SelectItem>
                  <SelectItem value="private">Private - Only me</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <Label htmlFor="activity" className="text-sm font-medium">
                    Activity Sharing
                  </Label>
                  <p className="text-xs text-muted-foreground">Share your savings and payment activities</p>
                </div>
              </div>
              <Switch
                id="activity"
                checked={settings.activitySharing}
                onCheckedChange={(checked) => updateSetting("activitySharing", checked)}
              />
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Data Collection</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-red-600" />
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location Tracking
                  </Label>
                  <p className="text-xs text-muted-foreground">Help us provide location-based services</p>
                </div>
              </div>
              <Switch
                id="location"
                checked={settings.locationTracking}
                onCheckedChange={(checked) => updateSetting("locationTracking", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <div>
                  <Label htmlFor="analytics" className="text-sm font-medium">
                    Usage Analytics
                  </Label>
                  <p className="text-xs text-muted-foreground">Help us improve the app with usage data</p>
                </div>
              </div>
              <Switch
                id="analytics"
                checked={settings.dataAnalytics}
                onCheckedChange={(checked) => updateSetting("dataAnalytics", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-amber-600" />
                <div>
                  <Label htmlFor="third-party" className="text-sm font-medium">
                    Third-party Sharing
                  </Label>
                  <p className="text-xs text-muted-foreground">Share data with trusted partners</p>
                </div>
              </div>
              <Switch
                id="third-party"
                checked={settings.thirdPartySharing}
                onCheckedChange={(checked) => updateSetting("thirdPartySharing", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-emerald-600" />
                <div>
                  <Label htmlFor="personalization" className="text-sm font-medium">
                    Marketing Personalization
                  </Label>
                  <p className="text-xs text-muted-foreground">Personalize ads and recommendations</p>
                </div>
              </div>
              <Switch
                id="personalization"
                checked={settings.marketingPersonalization}
                onCheckedChange={(checked) => updateSetting("marketingPersonalization", checked)}
              />
            </div>
          </div>
        </div>

        {/* Data Rights */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Your Data Rights</h4>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Download My Data
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Eye className="mr-2 h-4 w-4" />
              View Data Usage
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start bg-transparent text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete My Account
            </Button>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="rounded-lg bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">
            Learn more about how we protect your privacy in our{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
