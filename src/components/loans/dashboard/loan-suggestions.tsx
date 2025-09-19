"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star, Lightbulb } from "lucide-react"
import type { LoanSuggestion } from "./types"
import { cn } from "@/lib/utils"

function getPriorityIcon(priority: LoanSuggestion["priority"]) {
  switch (priority) {
    case "high":
      return <Star className="h-4 w-4 text-amber-600" />
    case "medium":
      return <TrendingUp className="h-4 w-4 text-blue-600" />
    case "low":
      return <Lightbulb className="h-4 w-4 text-emerald-600" />
  }
}

function getPriorityColor(priority: LoanSuggestion["priority"]) {
  switch (priority) {
    case "high":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "medium":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "low":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
  }
}

function SuggestionCard({
  suggestion,
  onApply,
}: {
  suggestion: LoanSuggestion
  onApply: (suggestionId: string) => void
}) {
  return (
    <Card className="rounded-xl border transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <CardTitle className="text-sm font-medium">{suggestion.loanTypeName}</CardTitle>
            <p className="text-xs text-muted-foreground">
              Suggested amount: {suggestion.currency} {suggestion.suggestedAmount.toLocaleString()}
            </p>
          </div>
          <Badge className={cn("text-xs", getPriorityColor(suggestion.priority))}>
            {getPriorityIcon(suggestion.priority)}
            <span className="ml-1 capitalize">{suggestion.priority}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.reason}</p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-muted-foreground">Interest Rate:</span>
            <p className="font-medium">{suggestion.interestRate}% p.a.</p>
          </div>
          <div>
            <span className="text-muted-foreground">Max Term:</span>
            <p className="font-medium">{suggestion.maxTerm} months</p>
          </div>
        </div>

        <Button
          onClick={() => onApply(suggestion.id)}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
          size="sm"
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  )
}

export function LoanSuggestions({
  suggestions,
  onApply,
}: {
  suggestions: LoanSuggestion[]
  onApply: (suggestionId: string) => void
}) {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-emerald-600" />
        <h2 className="text-base font-semibold">Recommended for You</h2>
      </div>
      <p className="text-xs text-muted-foreground">
        Based on your payment history and profile, these loans might interest you
      </p>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} onApply={onApply} />
        ))}
      </div>
    </div>
  )
}
