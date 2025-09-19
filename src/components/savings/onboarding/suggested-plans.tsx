"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Star } from "lucide-react"
import type { SavingsPlan } from "../types"
import { suggestedPlans } from "../mock-data"

interface SuggestedPlansProps {
  targetAmount: number
  targetDate: Date
  onSelectPlan: (plan: SavingsPlan) => void
  onSkip: () => void
}

const riskColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const riskIcons = {
  low: Shield,
  medium: TrendingUp,
  high: Star,
}

export function SuggestedPlans({ targetAmount, targetDate, onSelectPlan, onSkip }: SuggestedPlansProps) {
  const monthsToTarget = Math.ceil((targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Recommended Savings Plans</h2>
        <p className="text-gray-600">
          Based on your target of KES {targetAmount.toLocaleString()} in {monthsToTarget} months
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {suggestedPlans.map((plan) => {
          const RiskIcon = riskIcons[plan.riskLevel]
          const monthlyRequired = Math.ceil(targetAmount / monthsToTarget)
          const isRecommended = Math.abs(plan.monthlyAmount - monthlyRequired) < 1000

          return (
            <Card
              key={plan.id}
              className={`relative transition-all duration-200 hover:shadow-lg ${
                isRecommended ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center space-x-2">
                  <RiskIcon className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                </div>
                <Badge variant="outline" className={riskColors[plan.riskLevel]}>
                  {plan.riskLevel.toUpperCase()} RISK
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-center">{plan.description}</CardDescription>

                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">KES {plan.monthlyAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{plan.duration} months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Projected Total:</span>
                      <span className="font-medium text-green-600">KES {plan.projectedReturn.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Potential Gain:</span>
                      <span className="font-medium text-green-600">
                        +KES {(plan.projectedReturn - plan.monthlyAmount * plan.duration).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Features:</p>
                    <ul className="text-xs space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <div className="h-1 w-1 bg-blue-600 rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={() => onSelectPlan(plan)}
                  className="w-full"
                  variant={isRecommended ? "default" : "outline"}
                >
                  Choose This Plan
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={onSkip}>
          Skip for now - I'll set up manually
        </Button>
      </div>
    </div>
  )
}
