"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart3, Receipt, Users, FileText, TrendingUp, Settings, Clock, Download } from "lucide-react"
import type { ReportTemplate } from "./types"

interface ReportTemplatesProps {
  templates: ReportTemplate[]
  onGenerateReport: (template: ReportTemplate) => void
}

export function ReportTemplates({ templates, onGenerateReport }: ReportTemplatesProps) {
  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case "BarChart3":
        return BarChart3
      case "Receipt":
        return Receipt
      case "Users":
        return Users
      case "FileText":
        return FileText
      case "TrendingUp":
        return TrendingUp
      case "Settings":
        return Settings
      default:
        return BarChart3
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "financial":
        return "bg-blue-100 text-blue-800"
      case "transaction":
        return "bg-green-100 text-green-800"
      case "tax":
        return "bg-orange-100 text-orange-800"
      case "custom":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const groupedTemplates = templates.reduce(
    (acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = []
      }
      acc[template.category].push(template)
      return acc
    },
    {} as Record<string, ReportTemplate[]>,
  )

  const categoryTitles = {
    financial: "Financial Reports",
    transaction: "Transaction Reports",
    tax: "Tax Reports",
    custom: "Custom Reports",
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4">{categoryTitles[category as keyof typeof categoryTitles]}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTemplates.map((template) => {
              const IconComponent = getTemplateIcon(template.icon)
              return (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </AvatarFallback>
                      </Avatar>
                      <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{template.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{template.formats.join(", ").toUpperCase()}</span>
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => onGenerateReport(template)}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
