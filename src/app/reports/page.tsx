"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { ReportTemplates } from "@/components/reports/report-templates"
import { ReportGenerator } from "@/components/reports/report-generator"
import { GeneratedReports } from "@/components/reports/generated-reports"
import { ReportStatsComponent } from "@/components/reports/report-stats"
import { mockReportTemplates, mockGeneratedReports, mockReportStats } from "@/components/reports/mock-data"
import type { ReportTemplate, ReportRequest, GeneratedReport } from "@/components/reports/types"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [generatedReports, setGeneratedReports] = useState(mockGeneratedReports)

  const handleGenerateReport = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setIsGeneratorOpen(true)
  }

  const handleReportGeneration = async (request: ReportRequest) => {
    // Create new report with generating status
    const newReport: GeneratedReport = {
      id: `report_${Date.now()}`,
      name: request.name,
      template: selectedTemplate!,
      request,
      status: "generating",
      createdAt: new Date(),
    }

    setGeneratedReports((prev) => [newReport, ...prev])

    toast({
      title: "Report Generation Started",
      description: `Your ${selectedTemplate?.name} is being generated. You'll be notified when it's ready.`,
    })

    // Simulate report generation
    setTimeout(
      () => {
        setGeneratedReports((prev) =>
          prev.map((report) =>
            report.id === newReport.id
              ? {
                  ...report,
                  status: "completed" as const,
                  completedAt: new Date(),
                  downloadUrl: `/reports/${newReport.id}.${request.format}`,
                  fileSize: Math.random() * 5 + 1, // Random file size between 1-6 MB
                }
              : report,
          ),
        )

        toast({
          title: "Report Ready",
          description: `Your ${selectedTemplate?.name} has been generated successfully.`,
        })
      },
      3000 + Math.random() * 2000,
    ) // Random generation time between 3-5 seconds
  }

  const handleDownloadReport = (report: GeneratedReport) => {
    if (report.downloadUrl) {
      // In a real app, this would trigger the actual download
      console.log("Downloading report:", report.downloadUrl)
      toast({
        title: "Download Started",
        description: `Downloading ${report.name}...`,
      })
    }
  }

  const handleDeleteReport = (reportId: string) => {
    setGeneratedReports((prev) => prev.filter((report) => report.id !== reportId))
    toast({
      title: "Report Deleted",
      description: "The report has been deleted successfully.",
    })
  }

  const handleShareReport = (report: GeneratedReport) => {
    // In a real app, this would open a share dialog or copy link
    navigator.clipboard.writeText(`${window.location.origin}${report.downloadUrl}`)
    toast({
      title: "Link Copied",
      description: "Report download link copied to clipboard.",
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
            <p className="text-gray-600">Generate and download comprehensive financial reports</p>
          </div>

          {/* Stats Overview */}
          <ReportStatsComponent stats={mockReportStats} />

          {/* Main Content */}
          <Tabs defaultValue="templates" className="space-y-4">
            <TabsList>
              <TabsTrigger value="templates">Report Templates</TabsTrigger>
              <TabsTrigger value="generated">Generated Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <ReportTemplates templates={mockReportTemplates} onGenerateReport={handleGenerateReport} />
            </TabsContent>

            <TabsContent value="generated">
              <GeneratedReports
                reports={generatedReports}
                onDownload={handleDownloadReport}
                onDelete={handleDeleteReport}
                onShare={handleShareReport}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
      </SidebarInset>

      {/* Report Generator Dialog */}
      <ReportGenerator
        template={selectedTemplate}
        isOpen={isGeneratorOpen}
        onClose={() => {
          setIsGeneratorOpen(false)
          setSelectedTemplate(null)
        }}
        onGenerate={handleReportGeneration}
      />
    </SidebarProvider>
  )
}
