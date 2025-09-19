"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, Key, Eye, Clock, MapPin, AlertTriangle, CheckCircle } from "lucide-react"

export function SecuritySettings() {
  const [settings, setSettings] = React.useState({
    twoFactorAuth: true,
    biometricLogin: false,
    loginAlerts: true,
    sessionTimeout: true,
  })

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Security & Privacy</CardTitle>
        <p className="text-xs text-muted-foreground">Keep your account secure</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Security Status */}
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <div>
              <h4 className="text-sm font-medium text-emerald-800">Account Security: Strong</h4>
              <p className="text-xs text-emerald-700">Your account is well protected</p>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Authentication</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-emerald-600" />
                <div>
                  <Label htmlFor="2fa" className="text-sm font-medium">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                  Enabled
                </Badge>
                <Switch
                  id="2fa"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <div>
                  <Label htmlFor="biometric" className="text-sm font-medium">
                    Biometric Login
                  </Label>
                  <p className="text-xs text-muted-foreground">Use fingerprint or face recognition</p>
                </div>
              </div>
              <Switch
                id="biometric"
                checked={settings.biometricLogin}
                onCheckedChange={(checked) => updateSetting("biometricLogin", checked)}
              />
            </div>
          </div>
        </div>

        {/* Password & Access */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Password & Access</h4>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Eye className="mr-2 h-4 w-4" />
              View Active Sessions
            </Button>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Security Alerts</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <div>
                  <Label htmlFor="login-alerts" className="text-sm font-medium">
                    Login Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">Get notified of new device logins</p>
                </div>
              </div>
              <Switch
                id="login-alerts"
                checked={settings.loginAlerts}
                onCheckedChange={(checked) => updateSetting("loginAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <Label htmlFor="session-timeout" className="text-sm font-medium">
                    Auto Session Timeout
                  </Label>
                  <p className="text-xs text-muted-foreground">Automatically log out after inactivity</p>
                </div>
              </div>
              <Switch
                id="session-timeout"
                checked={settings.sessionTimeout}
                onCheckedChange={(checked) => updateSetting("sessionTimeout", checked)}
              />
            </div>
          </div>
        </div>

        {/* Recent Security Activity */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Recent Security Activity</h4>

          <div className="space-y-2">
            {[
              { action: "Password changed", time: "2 days ago", location: "Nairobi, Kenya" },
              { action: "New device login", time: "1 week ago", location: "Nairobi, Kenya" },
              { action: "2FA enabled", time: "2 weeks ago", location: "Nairobi, Kenya" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time}</span>
                    <MapPin className="h-3 w-3" />
                    <span>{activity.location}</span>
                  </div>
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Emergency Actions</h4>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent text-red-600 border-red-200 hover:bg-red-50"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Log Out All Devices
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start bg-transparent text-red-600 border-red-200 hover:bg-red-50"
            >
              <Shield className="mr-2 h-4 w-4" />
              Freeze Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
