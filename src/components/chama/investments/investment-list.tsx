"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Building, Sprout, BarChart3, Briefcase, Vote, Plus } from "lucide-react"
import type { Investment } from "../types"
import { cn } from "@/lib/utils"

function getInvestmentIcon(type: Investment["type"]) {
  const icons = {
    real_estate: Building,
    farming: Sprout,
    stocks: BarChart3,
    unit_trusts: BarChart3,
    business: Briefcase,
  }
  return icons[type]
}

function getInvestmentTypeLabel(type: Investment["type"]) {
  const labels = {
    real_estate: "Real Estate",
    farming: "Farming",
    stocks: "Stocks",
    unit_trusts: "Unit Trusts",
    business: "Business",
  }
  return labels[type]
}

export function InvestmentList({
  investments,
  canPropose = false,
}: {
  investments: Investment[]
  canPropose?: boolean
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Investments</h2>
        {canPropose && (
          <Button size="sm" className="h-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <Plus className="mr-1 h-4 w-4" />
            Propose
          </Button>
        )}
      </div>

      {/* Investment Cards */}
      <div className="space-y-3">
        {investments.map((investment) => {
          const Icon = getInvestmentIcon(investment.type)
          const returnPercentage = (investment.returns / investment.amount) * 100
          const isPositive = investment.returns >= 0
          const votingProgress = (investment.votesFor / investment.totalVotes) * 100

          return (
            <Card key={investment.id} className="rounded-xl border">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{investment.title}</p>
                      <p className="text-xs text-muted-foreground">{getInvestmentTypeLabel(investment.type)}</p>
                    </div>
                  </div>
                  <Badge variant={investment.status === "active" ? "default" : "secondary"} className="text-xs">
                    {investment.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2">{investment.description}</p>

                {/* Financial Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Invested</p>
                    <p className="font-medium">
                      {investment.currency} {investment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Value</p>
                    <p className="font-medium">
                      {investment.currency} {investment.currentValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Returns */}
                <div className="flex items-center justify-between rounded-md bg-muted/40 px-2 py-1">
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-xs">Returns</span>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-xs font-medium", isPositive ? "text-emerald-600" : "text-red-600")}>
                      {isPositive ? "+" : ""}
                      {investment.currency} {investment.returns.toLocaleString()}
                    </p>
                    <p className={cn("text-[10px]", isPositive ? "text-emerald-600" : "text-red-600")}>
                      {isPositive ? "+" : ""}
                      {returnPercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Voting Status (for pending investments) */}
                {investment.status === "pending_approval" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Voting Progress</span>
                      <span>
                        {investment.votesFor}/{investment.totalVotes} votes
                      </span>
                    </div>
                    <Progress value={votingProgress} className="h-2" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 flex-1 text-xs bg-transparent">
                        <Vote className="mr-1 h-3 w-3" />
                        Vote
                      </Button>
                    </div>
                  </div>
                )}

                {/* Maturity Date */}
                {investment.maturityDate && (
                  <p className="text-xs text-muted-foreground">
                    Matures: {new Date(investment.maturityDate).toLocaleDateString()}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  Proposed by {investment.proposedBy} • {new Date(investment.dateInvested).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          )
        })}

        {investments.length === 0 && (
          <Card className="rounded-xl border">
            <CardContent className="p-6 text-center">
              <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No investments yet</p>
              {canPropose && (
                <Button size="sm" className="mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <Plus className="mr-1 h-4 w-4" />
                  Propose Investment
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
