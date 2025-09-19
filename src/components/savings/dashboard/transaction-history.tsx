"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Download, Filter } from "lucide-react"
import type { SavingsTransaction } from "../types"
import { format } from "date-fns"

interface TransactionHistoryProps {
  transactions: SavingsTransaction[]
  onExport: () => void
  onFilter: () => void
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "deposit":
      return ArrowUpRight
    case "withdrawal":
      return ArrowDownLeft
    case "interest":
      return TrendingUp
    default:
      return ArrowUpRight
  }
}

const getTransactionColor = (type: string) => {
  switch (type) {
    case "deposit":
      return "text-green-600"
    case "withdrawal":
      return "text-red-600"
    case "interest":
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function TransactionHistory({ transactions, onExport, onFilter }: TransactionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent deposits, withdrawals, and interest earnings</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No transactions yet</p>
              <p className="text-sm">Your transaction history will appear here</p>
            </div>
          ) : (
            transactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type)
              const colorClass = getTransactionColor(transaction.type)

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-gray-100 ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{format(new Date(transaction.timestamp), "MMM dd, yyyy HH:mm")}</span>
                        {transaction.method && (
                          <>
                            <span>•</span>
                            <span>{transaction.method}</span>
                          </>
                        )}
                        {transaction.reference && (
                          <>
                            <span>•</span>
                            <span>Ref: {transaction.reference}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-semibold ${colorClass}`}>
                      {transaction.type === "withdrawal" ? "-" : "+"}KES {transaction.amount.toLocaleString()}
                    </p>
                    <Badge variant="outline" className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {transactions.length > 0 && (
          <div className="text-center pt-4">
            <Button variant="ghost" size="sm">
              View All Transactions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
