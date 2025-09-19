"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Copy,
  Download,
  Smartphone,
  Building,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import type { WithdrawalTransaction } from "./types"
import { formatCurrency, formatDate } from "./mock-data"

interface TransactionListProps {
  transactions: WithdrawalTransaction[]
  title: string
  emptyMessage?: string
}

export function TransactionList({ transactions, title, emptyMessage = "No transactions found" }: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<WithdrawalTransaction | null>(null)

  const getStatusIcon = (status: WithdrawalTransaction["status"]) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "processing":
        return Clock
      case "pending":
        return AlertCircle
      case "failed":
      case "cancelled":
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: WithdrawalTransaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMethodIcon = (methodName: string) => {
    if (methodName.toLowerCase().includes("mpesa")) return Smartphone
    if (methodName.toLowerCase().includes("bank")) return Building
    return CreditCard
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadReceipt = (transaction: WithdrawalTransaction) => {
    // Implement receipt download logic
    console.log("Downloading receipt for:", transaction.reference)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyMessage}</h3>
              <p className="text-gray-600">Your withdrawal transactions will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => {
                const StatusIcon = getStatusIcon(transaction.status)
                const MethodIcon = getMethodIcon(transaction.method.name)

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100">
                          <MethodIcon className="h-6 w-6 text-blue-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{transaction.method.name}</h4>
                          <Badge className={getStatusColor(transaction.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{transaction.reference}</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(transaction.amount)}</p>
                      <p className="text-xs text-gray-500">Fee: {formatCurrency(transaction.fee)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              {/* Status */}
              <div className="text-center">
                <Badge className={`${getStatusColor(selectedTransaction.status)} text-sm px-3 py-1`}>
                  {selectedTransaction.status.toUpperCase()}
                </Badge>
              </div>

              {/* Amount */}
              <div className="text-center">
                <p className="text-2xl font-bold">{formatCurrency(selectedTransaction.amount)}</p>
                <p className="text-sm text-gray-600">
                  Fee: {formatCurrency(selectedTransaction.fee)} • Total:{" "}
                  {formatCurrency(selectedTransaction.totalAmount)}
                </p>
              </div>

              <Separator />

              {/* Transaction Info */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{selectedTransaction.reference}</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(selectedTransaction.reference)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span>{selectedTransaction.method.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Source</span>
                  <span>{selectedTransaction.source.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span>{formatDate(selectedTransaction.createdAt)}</span>
                </div>

                {selectedTransaction.processedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processed</span>
                    <span>{formatDate(selectedTransaction.processedAt)}</span>
                  </div>
                )}

                {selectedTransaction.estimatedCompletion && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Est. Completion</span>
                    <span>{formatDate(selectedTransaction.estimatedCompletion)}</span>
                  </div>
                )}
              </div>

              {selectedTransaction.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Notes</p>
                    <p className="text-sm">{selectedTransaction.notes}</p>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => downloadReceipt(selectedTransaction)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Receipt
                </Button>
                <Button variant="outline" onClick={() => copyToClipboard(selectedTransaction.reference)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
