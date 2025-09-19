"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, CheckCircle } from "lucide-react"

export function SecurityBadge() {
  const securityFeatures = [
    {
      icon: Shield,
      label: "256-bit SSL Encryption",
      description: "Your data is protected with bank-level security",
    },
    {
      icon: Lock,
      label: "PCI DSS Compliant",
      description: "Meets the highest payment security standards",
    },
    {
      icon: CheckCircle,
      label: "Verified Secure",
      description: "Regular security audits and compliance checks",
    },
  ]

  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-800">Secure Withdrawal Process</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <feature.icon className="h-4 w-4 text-green-600 flex-shrink-0" />
              <div>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 mb-1">
                  {feature.label}
                </Badge>
                <p className="text-xs text-green-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
