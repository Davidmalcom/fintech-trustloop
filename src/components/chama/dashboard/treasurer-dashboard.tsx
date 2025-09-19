"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet2, TrendingUp, AlertTriangle, Calendar, Users, PieChart, Download } from "lucide-react"
import type { ChamaGroup } from "../types"

export function TreasurerDashboard({ chama }: { chama: ChamaGroup }) {
  const totalExpected = chama.members.length * chama.contributionSchedule.amount
  const totalReceived = chama.transactions
    .filter((t) => t.type === "contribution" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const collectionRate = (totalReceived / totalExpected) * 100

  const pendingLoans = chama.loans.filter((l) => l.status === "pending").length
  const activeInvestments = chama.investments.filter((i) => i.status === "active").length

  const overdueMembers = chama.members.filter((m) => {
    // Mock logic for overdue - in real app would check against due dates
    return Math.random() > 0.8
  }).length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-3 text-white">
        <h1 className="text-base font-semibold">Treasurer Dashboard</h1>
        <p className="mt-1 text-[12px] opacity-95">Manage finances, track contributions, and oversee investments</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="rounded-xl border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Wallet2 className="h-5 w-5 text-emerald-600" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Total Funds</p>
                <p className="text-sm font-semibold">
                  {chama.currency} {chama.totalFunds.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Collection Rate</p>
                <p className="text-sm font-semibold">{Math.round(collectionRate)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collection Progress */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">This Period's Collections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Collected</span>
            <span className="font-medium">
              {chama.currency} {totalReceived.toLocaleString()} / {totalExpected.toLocaleString()}
            </span>
          </div>
          <Progress value={collectionRate} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{chama.members.length - overdueMembers} paid</span>
            <span>{overdueMembers} pending</span>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Actions */}
      <div className="grid gap-3">
        {overdueMembers > 0 && (
          <Card className="rounded-xl border border-amber-200 bg-amber-50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-amber-800">
                    {overdueMembers} member{overdueMembers > 1 ? "s" : ""} overdue
                  </p>
                  <p className="text-xs text-amber-700">Send reminders or follow up</p>
                </div>
                <Button size="sm" variant="outline" className="h-8 border-amber-300 text-amber-700 bg-transparent">
                  Remind
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {pendingLoans > 0 && (
          <Card className="rounded-xl border border-blue-200 bg-blue-50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-blue-800">
                    {pendingLoans} loan{pendingLoans > 1 ? "s" : ""} pending approval
                  </p>
                  <p className="text-xs text-blue-700">Review and approve/reject</p>
                </div>
                <Button size="sm" variant="outline" className="h-8 border-blue-300 text-blue-700 bg-transparent">
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="h-10 flex-col gap-1 bg-transparent">
            <PieChart className="h-4 w-4" />
            <span className="text-xs">View Reports</span>
          </Button>
          <Button variant="outline" size="sm" className="h-10 flex-col gap-1 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="text-xs">Export Data</span>
          </Button>
          <Button variant="outline" size="sm" className="h-10 flex-col gap-1 bg-transparent">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Schedule Payout</span>
          </Button>
          <Button variant="outline" size="sm" className="h-10 flex-col gap-1 bg-transparent">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Investment</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="rounded-xl border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {chama.transactions.slice(0, 5).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm">{txn.memberName}</p>
                  <p className="text-xs text-muted-foreground">
                    {txn.description} • {new Date(txn.dateISO).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={txn.status === "completed" ? "default" : "secondary"} className="text-xs">
                    {txn.status}
                  </Badge>
                  <span className="text-sm font-medium">
                    {txn.currency} {txn.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
