"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Share2, Copy, ArrowLeft, Clock } from "lucide-react"
import type { WithdrawalTransaction } from "./types"
import { formatCurrency, formatDate } from "./mock-data"

interface SuccessScreenProps {
  transaction: WithdrawalTransaction
  onNewWithdrawal: () => void
  onViewHistory: () => void
}

export function SuccessScreen({ transaction, onNewWithdrawal, onViewHistory }: SuccessScreenProps) {
  const copyReference = () => {
    navigator.clipboard.writeText(transaction.reference)
  }

  const downloadReceipt = () => {
    // Implement receipt download logic
    console.log("Downloading receipt for:", transaction.reference)
  }

  const shareReceipt = () => {
    // Implement receipt sharing logic
    if (navigator.share) {
      navigator.share({
        title: "Withdrawal Receipt",
        text: `Withdrawal of ${formatCurrency(transaction.amount)} - Reference: ${transaction.reference}`,
      })
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Submitted</h2>
        <p className="text-gray-600">Your withdrawal request has been processed successfully</p>
      </div>

      {/* Transaction Details */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Amount */}
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(transaction.amount)}</p>
            <p className="text-sm text-gray-600">
              Fee: {formatCurrency(transaction.fee)} • Total: {formatCurrency(transaction.totalAmount)}
            </p>
          </div>

          <Separator />

          {/* Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reference Number</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm">{transaction.reference}</span>
                <Button variant="ghost" size="sm" onClick={copyReference}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <Badge className="bg-blue-100 text-blue-800">
                <Clock className="h-3 w-3 mr-1" />
                {transaction.status}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Method</span>
              <span>{transaction.method.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Source</span>
              <span>{transaction.source.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Submitted</span>
              <span>{formatDate(transaction.createdAt)}</span>
            </div>

            {transaction.estimatedCompletion && (
              <div className="flex justify-between">
                <span className="text-gray-600">Est. Completion</span>
                <span>{formatDate(transaction.estimatedCompletion)}</span>
              </div>
            )}
          </div>

          {transaction.notes && (
            <>
              <Separator />
              <div>
                <p className="text-gray-600 text-sm mb-1">Notes</p>
                <p className="text-sm">{transaction.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Processing Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Processing Information</h4>
              <p className="text-sm text-blue-800 mt-1">
                Your withdrawal is being processed. You'll receive a notification once it's completed. Processing time:{" "}
                {transaction.method.processingTime}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={downloadReceipt}>
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent" onClick={shareReceipt}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={onViewHistory}>
            View History
          </Button>
          <Button className="flex-1" onClick={onNewWithdrawal}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            New Withdrawal
          </Button>
        </div>
      </div>
    </div>
  )
}
