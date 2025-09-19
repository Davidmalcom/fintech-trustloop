"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, CreditCard, CheckCircle, DollarSign, BarChart3 } from "lucide-react"
import type { WithdrawalStats } from "./history-types"
import { formatCurrency } from "./mock-data"

interface HistoryStatsProps {
  stats: WithdrawalStats
}

export function HistoryStats({ stats }: HistoryStatsProps) {
  const statCards = [
    {
      title: "Total Withdrawn",
      value: formatCurrency(stats.totalWithdrawn),
      icon: TrendingDown,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Fees Paid",
      value: formatCurrency(stats.totalFees),
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Total Transactions",
      value: stats.totalTransactions.toString(),
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Average Amount",
      value: formatCurrency(stats.averageAmount),
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Success Rate
            <Badge
              variant={stats.successRate >= 80 ? "default" : stats.successRate >= 60 ? "secondary" : "destructive"}
            >
              {stats.successRate}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">
              {Math.round((stats.successRate / 100) * stats.totalTransactions)} out of {stats.totalTransactions}{" "}
              withdrawals completed successfully
            </span>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.successRate}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
