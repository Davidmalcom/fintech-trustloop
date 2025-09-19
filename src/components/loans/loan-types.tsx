"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Shield, CheckCircle, AlertCircle } from "lucide-react"
import type { LoanType } from "./types"
import { loanTypes } from "./mock-data"

function LoanTypeCard({ loanType, onApply }: { loanType: LoanType; onApply: (loanTypeId: string) => void }) {
  return (
    <Card className="rounded-xl border transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{loanType.name}</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{loanType.description}</p>
          </div>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            {loanType.interestRate}% p.a.
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Details */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-muted-foreground">Amount Range:</span>
            <p className="font-medium">
              KES {loanType.minAmount.toLocaleString()} - {loanType.maxAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Max Term:</span>
            <p className="font-medium">{loanType.maxTerm} months</p>
          </div>
        </div>

        {/* Processing Time & Collateral */}
        <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-xs">Processing: {loanType.processingTime}</span>
          </div>
          <div className="flex items-center gap-1">
            {loanType.collateralRequired ? (
              <AlertCircle className="h-4 w-4 text-amber-600" />
            ) : (
              <Shield className="h-4 w-4 text-emerald-600" />
            )}
            <span className="text-xs">{loanType.collateralRequired ? "Collateral required" : "No collateral"}</span>
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="mb-2 text-xs font-medium">Key Features:</p>
          <ul className="space-y-1">
            {loanType.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-emerald-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements Preview */}
        <div>
          <p className="mb-2 text-xs font-medium">Requirements:</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{loanType.requirements.join(", ")}</p>
        </div>

        <Button
          onClick={() => onApply(loanType.id)}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  )
}

export function LoanTypes({ onApply }: { onApply: (loanTypeId: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Available Loan Options</h2>
        <p className="text-xs text-muted-foreground">
          Choose from our range of loan products designed for chama members
        </p>
      </div>

      <div className="grid gap-4">
        {loanTypes.map((loanType) => (
          <LoanTypeCard key={loanType.id} loanType={loanType} onApply={onApply} />
        ))}
      </div>
    </div>
  )
}
