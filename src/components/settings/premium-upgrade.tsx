"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Crown,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart3,
  CreditCard,
  Headphones,
} from "lucide-react"

const premiumFeatures = [
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Detailed insights into your savings and investment performance",
  },
  {
    icon: Shield,
    title: "Priority Support",
    description: "24/7 premium customer support with faster response times",
  },
  {
    icon: CreditCard,
    title: "Higher Loan Limits",
    description: "Access to larger loan amounts with better interest rates",
  },
  {
    icon: Users,
    title: "Unlimited Groups",
    description: "Join and create unlimited chama groups",
  },
  {
    icon: BarChart3,
    title: "Investment Opportunities",
    description: "Exclusive access to premium investment products",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Zero-fee instant transfers between groups and accounts",
  },
]

export function PremiumUpgrade() {
  const [isCurrentlyPremium] = React.useState(true) // Mock current premium status
  const [autoRenew, setAutoRenew] = React.useState(true)

  return (
    <div className="space-y-4">
      {/* Current Status */}
      <Card className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2">
                <Crown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-amber-800">Premium Member</h3>
                <p className="text-xs text-amber-700">Active until March 15, 2025</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
              <Star className="mr-1 h-3 w-3" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Premium Features</CardTitle>
          <p className="text-xs text-muted-foreground">Unlock the full potential of TrustLoop</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {premiumFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30">
                <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{feature.title}</p>
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Subscription Management */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Subscription Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-renew" className="text-sm font-medium">
                Auto-renewal
              </Label>
              <p className="text-xs text-muted-foreground">Automatically renew your premium subscription</p>
            </div>
            <Switch id="auto-renew" checked={autoRenew} onCheckedChange={setAutoRenew} />
          </div>

          <div className="rounded-lg bg-muted/40 p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Current Plan</span>
              <span className="text-sm font-bold">KES 500/month</span>
            </div>
            <p className="text-xs text-muted-foreground">Next billing date: March 15, 2025</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Change Plan
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent text-red-600 border-red-200 hover:bg-red-50">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Billing History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { date: "Feb 15, 2025", amount: "KES 500", status: "Paid" },
              { date: "Jan 15, 2025", amount: "KES 500", status: "Paid" },
              { date: "Dec 15, 2024", amount: "KES 500", status: "Paid" },
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-3">
                <div>
                  <p className="text-sm font-medium">{bill.date}</p>
                  <p className="text-xs text-muted-foreground">Premium Subscription</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{bill.amount}</p>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                    {bill.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-3">
            <Button variant="ghost" className="w-full text-xs text-emerald-600 hover:bg-emerald-50">
              View All Billing History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="rounded-xl border border-emerald-200 bg-emerald-50/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-2">
              <Headphones className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-emerald-800">Premium Support</h4>
              <p className="text-xs text-emerald-700">Get priority help from our support team</p>
            </div>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
