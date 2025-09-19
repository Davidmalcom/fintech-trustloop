"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, TrendingUp, Briefcase, Users, DollarSign } from "lucide-react"
import type { FundSource } from "./types"
import { formatCurrency } from "./mock-data"

interface FundBreakdownProps {
  fundSources: FundSource[]
  totalAmount: number
}

export function FundBreakdown({ fundSources, totalAmount }: FundBreakdownProps) {
  const [showAmounts, setShowAmounts] = useState(true)

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp":
        return TrendingUp
      case "Briefcase":
        return Briefcase
      case "Users":
        return Users
      case "DollarSign":
        return DollarSign
      default:
        return DollarSign
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Available Funds</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowAmounts(!showAmounts)}>
            {showAmounts ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Amount */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-600 mb-1">Total Available</p>
          <p className="text-3xl font-bold text-gray-900">{showAmounts ? formatCurrency(totalAmount) : "••••••"}</p>
        </div>

        {/* Fund Sources */}
        <div className="space-y-3">
          {fundSources.map((source) => {
            const IconComponent = getSourceIcon(source.icon)
            const percentage = (source.amount / totalAmount) * 100

            return (
              <div key={source.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent className={`h-5 w-5 ${source.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{source.name}</h4>
                      <p className="text-xs text-gray-500">{source.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{showAmounts ? formatCurrency(source.amount) : "••••••"}</p>
                    <Badge variant="secondary" className="text-xs">
                      {percentage.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
