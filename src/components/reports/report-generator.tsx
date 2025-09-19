"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, FileText, Download } from "lucide-react"
import { format } from "date-fns"
import type { ReportTemplate, ReportRequest } from "./types"

interface ReportGeneratorProps {
  template: ReportTemplate | null
  isOpen: boolean
  onClose: () => void
  onGenerate: (request: ReportRequest) => void
}

export function ReportGenerator({ template, isOpen, onClose, onGenerate }: ReportGeneratorProps) {
  const [formData, setFormData] = useState<Partial<ReportRequest>>({
    name: "",
    format: "pdf",
    includeCharts: true,
    filters: {},
  })
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [fieldId]: value,
      },
    }))
  }

  const handleSubmit = () => {
    if (!template || !dateRange.from || !dateRange.to) return

    const request: ReportRequest = {
      templateId: template.id,
      name: formData.name || `${template.name} - ${format(new Date(), "MMM yyyy")}`,
      dateRange: {
        from: dateRange.from,
        to: dateRange.to,
      },
      filters: formData.filters || {},
      format: formData.format as "pdf" | "excel" | "csv",
      includeCharts: formData.includeCharts || false,
    }

    onGenerate(request)
    onClose()

    // Reset form
    setFormData({
      name: "",
      format: "pdf",
      includeCharts: true,
      filters: {},
    })
    setDateRange({})
  }

  const setDefaultDateRange = (range: string) => {
    const now = new Date()
    let from: Date
    const to: Date = now

    switch (range) {
      case "last_30_days":
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "last_3_months":
        from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
        break
      case "last_6_months":
        from = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
        break
      case "last_year":
        from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        break
      default:
        return
    }

    setDateRange({ from, to })
  }

  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Generate {template.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Name */}
          <div className="space-y-2">
            <Label htmlFor="reportName">Report Name</Label>
            <Input
              id="reportName"
              placeholder={`${template.name} - ${format(new Date(), "MMM yyyy")}`}
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <Label>Date Range</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="outline" size="sm" onClick={() => setDefaultDateRange("last_30_days")}>
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDefaultDateRange("last_3_months")}>
                Last 3 Months
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDefaultDateRange("last_6_months")}>
                Last 6 Months
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDefaultDateRange("last_year")}>
                Last Year
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Template Fields */}
          {template.fields.length > 0 && (
            <div className="space-y-4">
              <Label className="text-base font-medium">Report Options</Label>
              {template.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  {field.type === "select" && (
                    <Select
                      value={formData.filters?.[field.id] || field.defaultValue}
                      onValueChange={(value) => handleFieldChange(field.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "boolean" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.id}
                        checked={formData.filters?.[field.id] ?? field.defaultValue}
                        onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
                      />
                      <Label htmlFor={field.id} className="text-sm font-normal">
                        {field.label}
                      </Label>
                    </div>
                  )}
                  {field.type === "number" && (
                    <Input
                      id={field.id}
                      type="number"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={formData.filters?.[field.id] || ""}
                      onChange={(e) => handleFieldChange(field.id, Number.parseFloat(e.target.value) || 0)}
                    />
                  )}
                  {field.type === "text" && (
                    <Textarea
                      id={field.id}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={formData.filters?.[field.id] || ""}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select
              value={formData.format}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, format: value as any }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {template.formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Include Charts */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeCharts"
              checked={formData.includeCharts}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, includeCharts: checked as boolean }))}
            />
            <Label htmlFor="includeCharts" className="text-sm font-normal">
              Include charts and visualizations
            </Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!dateRange.from || !dateRange.to}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
