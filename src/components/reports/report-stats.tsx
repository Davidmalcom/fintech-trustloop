"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Download, FileText, Clock } from "lucide-react"
import type { ReportStats } from "./types"

interface ReportStatsProps {
  stats: ReportStats
}

export function ReportStatsComponent({ stats }: ReportStatsProps) {
  const statCards = [
    {
      title: "Total Reports",
      value: stats.totalReports.toString(),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "This Month",
      value: stats.reportsThisMonth.toString(),
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Downloads",
      value: stats.totalDownloads.toString(),
      icon: Download,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg. Generation Time",
      value: `${stats.averageGenerationTime}min`,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
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
  )
}
