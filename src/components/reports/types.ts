export interface ReportTemplate {
  id: string
  name: string
  description: string
  category: "financial" | "transaction" | "tax" | "custom"
  icon: string
  fields: ReportField[]
  defaultDateRange: "last_30_days" | "last_3_months" | "last_6_months" | "last_year" | "custom"
  formats: ("pdf" | "excel" | "csv")[]
  estimatedTime: string
}

export interface ReportField {
  id: string
  name: string
  label: string
  type: "text" | "select" | "date" | "number" | "boolean"
  required: boolean
  options?: { value: string; label: string }[]
  defaultValue?: any
}

export interface ReportRequest {
  templateId: string
  name: string
  dateRange: {
    from: Date
    to: Date
  }
  filters: Record<string, any>
  format: "pdf" | "excel" | "csv"
  includeCharts: boolean
  groupBy?: string
}

export interface GeneratedReport {
  id: string
  name: string
  template: ReportTemplate
  request: ReportRequest
  status: "generating" | "completed" | "failed"
  createdAt: Date
  completedAt?: Date
  downloadUrl?: string
  fileSize?: number
  error?: string
}

export interface ReportStats {
  totalReports: number
  reportsThisMonth: number
  mostUsedTemplate: string
  averageGenerationTime: number
  totalDownloads: number
}
