"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Lock, Target, Check, Info } from "lucide-react"
import type { SavingsType } from "../types"
import { savingsTypes } from "../mock-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SavingsTypeSelectorProps {
  onSelect: (type: SavingsType) => void
  selectedType?: SavingsType
}

const iconMap = {
  wallet: Wallet,
  lock: Lock,
  target: Target,
}

const colorMap = {
  blue: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  green: "bg-green-50 border-green-200 hover:bg-green-100",
  purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
}

export function SavingsTypeSelector({ onSelect, selectedType }: SavingsTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Savings Type</h2>
        <p className="text-gray-600">Select the savings option that best fits your financial goals</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {savingsTypes.map((type) => {
          const Icon = iconMap[type.icon as keyof typeof iconMap]
          const isSelected = selectedType?.id === type.id

          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-200 ${
                colorMap[type.color as keyof typeof colorMap]
              } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => onSelect(type)}
            >
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center space-x-2">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-medium mb-2">Features:</p>
                          <ul className="text-sm space-y-1">
                            {type.features.map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Badge variant="secondary" className="mx-auto">
                  {type.interestRate}% Annual Interest
                </Badge>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <CardDescription className="text-sm">{type.description}</CardDescription>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Key Benefits:</p>
                  <ul className="text-xs space-y-1">
                    {type.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center justify-center space-x-1">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isSelected && (
                  <div className="flex items-center justify-center space-x-1 text-blue-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Selected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
