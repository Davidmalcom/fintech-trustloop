"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Download, MoreVertical, Trash2, RefreshCw, CheckCircle, XCircle, Clock, FileText, Share2 } from "lucide-react"
import type { GeneratedReport } from "./types"
import { formatDate, formatFileSize } from "./mock-data"

interface GeneratedReportsProps {
  reports: GeneratedReport[]
  onDownload: (report: GeneratedReport) => void
  onDelete: (reportId: string) => void
  onShare: (report: GeneratedReport) => void
}

export function GeneratedReports({ reports, onDownload, onDelete, onShare }: GeneratedReportsProps) {
  const [deleteReportId, setDeleteReportId] = useState<string | null>(null)

  const getStatusIcon = (status: GeneratedReport["status"]) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "generating":
        return RefreshCw
      case "failed":
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: GeneratedReport["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDelete = (reportId: string) => {
    onDelete(reportId)
    setDeleteReportId(null)
  }

  const sortedReports = [...reports].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedReports.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports generated</h3>
              <p className="text-gray-600">Your generated reports will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedReports.map((report) => {
                const StatusIcon = getStatusIcon(report.status)
                const isGenerating = report.status === "generating"

                return (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{report.name}</h4>
                          <Badge className={getStatusColor(report.status)}>
                            <StatusIcon className={`h-3 w-3 mr-1 ${isGenerating ? "animate-spin" : ""}`} />
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{report.template.name}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>Created: {formatDate(report.createdAt)}</span>
                          {report.completedAt && <span>Completed: {formatDate(report.completedAt)}</span>}
                          {report.fileSize && <span>Size: {formatFileSize(report.fileSize)}</span>}
                        </div>
                        {report.error && <p className="text-xs text-red-600 mt-1">{report.error}</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {report.status === "completed" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => onDownload(report)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onShare(report)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {report.status === "completed" && (
                            <>
                              <DropdownMenuItem onClick={() => onDownload(report)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onShare(report)}>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => setDeleteReportId(report.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteReportId} onOpenChange={() => setDeleteReportId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Report</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this report? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteReportId && handleDelete(deleteReportId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
