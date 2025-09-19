import type { ReportTemplate, GeneratedReport, ReportStats } from "./types"

export const mockReportTemplates: ReportTemplate[] = [
  {
    id: "financial_summary",
    name: "Financial Summary Report",
    description: "Comprehensive overview of your financial activities including income, expenses, and net worth",
    category: "financial",
    icon: "BarChart3",
    fields: [
      {
        id: "include_investments",
        name: "includeInvestments",
        label: "Include Investment Data",
        type: "boolean",
        required: false,
        defaultValue: true,
      },
      {
        id: "currency",
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        options: [
          { value: "KES", label: "Kenyan Shilling (KES)" },
          { value: "USD", label: "US Dollar (USD)" },
          { value: "EUR", label: "Euro (EUR)" },
        ],
        defaultValue: "KES",
      },
    ],
    defaultDateRange: "last_3_months",
    formats: ["pdf", "excel"],
    estimatedTime: "2-3 minutes",
  },
  {
    id: "transaction_history",
    name: "Transaction History Report",
    description: "Detailed list of all transactions with filtering and categorization options",
    category: "transaction",
    icon: "Receipt",
    fields: [
      {
        id: "transaction_type",
        name: "transactionType",
        label: "Transaction Type",
        type: "select",
        required: false,
        options: [
          { value: "all", label: "All Transactions" },
          { value: "payments", label: "Payments Only" },
          { value: "withdrawals", label: "Withdrawals Only" },
          { value: "deposits", label: "Deposits Only" },
        ],
        defaultValue: "all",
      },
      {
        id: "min_amount",
        name: "minAmount",
        label: "Minimum Amount",
        type: "number",
        required: false,
      },
      {
        id: "group_by",
        name: "groupBy",
        label: "Group By",
        type: "select",
        required: false,
        options: [
          { value: "none", label: "No Grouping" },
          { value: "date", label: "By Date" },
          { value: "type", label: "By Type" },
          { value: "amount", label: "By Amount Range" },
        ],
        defaultValue: "date",
      },
    ],
    defaultDateRange: "last_6_months",
    formats: ["pdf", "excel", "csv"],
    estimatedTime: "1-2 minutes",
  },
  {
    id: "group_performance",
    name: "Group Performance Report",
    description: "Analysis of your group investments and chama performance metrics",
    category: "financial",
    icon: "Users",
    fields: [
      {
        id: "group_ids",
        name: "groupIds",
        label: "Select Groups",
        type: "select",
        required: false,
        options: [
          { value: "all", label: "All Groups" },
          { value: "mama_mboga", label: "Mama Mboga Chama" },
          { value: "tech_innovators", label: "Tech Innovators" },
          { value: "investment_club", label: "Investment Club" },
        ],
        defaultValue: "all",
      },
      {
        id: "include_projections",
        name: "includeProjections",
        label: "Include Future Projections",
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    ],
    defaultDateRange: "last_year",
    formats: ["pdf", "excel"],
    estimatedTime: "3-4 minutes",
  },
  {
    id: "tax_summary",
    name: "Tax Summary Report",
    description: "Tax-ready report with all necessary information for filing returns",
    category: "tax",
    icon: "FileText",
    fields: [
      {
        id: "tax_year",
        name: "taxYear",
        label: "Tax Year",
        type: "select",
        required: true,
        options: [
          { value: "2024", label: "2024" },
          { value: "2023", label: "2023" },
          { value: "2022", label: "2022" },
        ],
        defaultValue: "2024",
      },
      {
        id: "include_deductions",
        name: "includeDeductions",
        label: "Include Deductible Expenses",
        type: "boolean",
        required: false,
        defaultValue: true,
      },
    ],
    defaultDateRange: "last_year",
    formats: ["pdf", "excel"],
    estimatedTime: "4-5 minutes",
  },
  {
    id: "investment_performance",
    name: "Investment Performance Report",
    description: "Detailed analysis of your investment portfolio performance and returns",
    category: "financial",
    icon: "TrendingUp",
    fields: [
      {
        id: "benchmark",
        name: "benchmark",
        label: "Compare Against Benchmark",
        type: "select",
        required: false,
        options: [
          { value: "none", label: "No Benchmark" },
          { value: "nse20", label: "NSE 20 Index" },
          { value: "treasury", label: "Treasury Bills" },
          { value: "inflation", label: "Inflation Rate" },
        ],
        defaultValue: "nse20",
      },
      {
        id: "include_dividends",
        name: "includeDividends",
        label: "Include Dividend Income",
        type: "boolean",
        required: false,
        defaultValue: true,
      },
    ],
    defaultDateRange: "last_year",
    formats: ["pdf", "excel"],
    estimatedTime: "3-4 minutes",
  },
  {
    id: "custom_report",
    name: "Custom Report Builder",
    description: "Build your own custom report with specific data points and visualizations",
    category: "custom",
    icon: "Settings",
    fields: [
      {
        id: "data_sources",
        name: "dataSources",
        label: "Data Sources",
        type: "select",
        required: true,
        options: [
          { value: "transactions", label: "Transactions" },
          { value: "investments", label: "Investments" },
          { value: "groups", label: "Groups" },
          { value: "loans", label: "Loans" },
        ],
      },
      {
        id: "chart_types",
        name: "chartTypes",
        label: "Chart Types",
        type: "select",
        required: false,
        options: [
          { value: "bar", label: "Bar Charts" },
          { value: "line", label: "Line Charts" },
          { value: "pie", label: "Pie Charts" },
          { value: "table", label: "Tables Only" },
        ],
        defaultValue: "bar",
      },
    ],
    defaultDateRange: "custom",
    formats: ["pdf", "excel", "csv"],
    estimatedTime: "5-10 minutes",
  },
]

export const mockGeneratedReports: GeneratedReport[] = [
  {
    id: "report_001",
    name: "Financial Summary - Q4 2023",
    template: mockReportTemplates[0],
    request: {
      templateId: "financial_summary",
      name: "Financial Summary - Q4 2023",
      dateRange: {
        from: new Date("2023-10-01"),
        to: new Date("2023-12-31"),
      },
      filters: {
        includeInvestments: true,
        currency: "KES",
      },
      format: "pdf",
      includeCharts: true,
    },
    status: "completed",
    createdAt: new Date("2024-01-15T10:30:00"),
    completedAt: new Date("2024-01-15T10:33:00"),
    downloadUrl: "/reports/financial_summary_q4_2023.pdf",
    fileSize: 2.4,
  },
  {
    id: "report_002",
    name: "Transaction History - December 2023",
    template: mockReportTemplates[1],
    request: {
      templateId: "transaction_history",
      name: "Transaction History - December 2023",
      dateRange: {
        from: new Date("2023-12-01"),
        to: new Date("2023-12-31"),
      },
      filters: {
        transactionType: "all",
        groupBy: "date",
      },
      format: "excel",
      includeCharts: false,
    },
    status: "completed",
    createdAt: new Date("2024-01-10T14:20:00"),
    completedAt: new Date("2024-01-10T14:22:00"),
    downloadUrl: "/reports/transaction_history_dec_2023.xlsx",
    fileSize: 1.8,
  },
  {
    id: "report_003",
    name: "Tax Summary 2023",
    template: mockReportTemplates[3],
    request: {
      templateId: "tax_summary",
      name: "Tax Summary 2023",
      dateRange: {
        from: new Date("2023-01-01"),
        to: new Date("2023-12-31"),
      },
      filters: {
        taxYear: "2023",
        includeDeductions: true,
      },
      format: "pdf",
      includeCharts: true,
    },
    status: "generating",
    createdAt: new Date("2024-01-16T09:15:00"),
  },
]

export const mockReportStats: ReportStats = {
  totalReports: 15,
  reportsThisMonth: 3,
  mostUsedTemplate: "Financial Summary Report",
  averageGenerationTime: 3.2,
  totalDownloads: 42,
}

export const formatFileSize = (sizeInMB: number): string => {
  if (sizeInMB < 1) {
    return `${Math.round(sizeInMB * 1024)} KB`
  }
  return `${sizeInMB.toFixed(1)} MB`
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
