"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Landmark, Banknote, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import type { PaymentHistory } from "./types"
import { cn } from "@/lib/utils"

function getPaymentMethodIcon(method: PaymentHistory["method"]) {
  switch (method) {
    case "mpesa":
      return <Smartphone className="h-4 w-4" />
    case "bank":
      return <Landmark className="h-4 w-4" />
    case "cash":
      return <Banknote className="h-4 w-4" />
  }
}

function getStatusIcon(status: PaymentHistory["status"]) {
  switch (status) {
    case "paid":
      return <CheckCircle className="h-4 w-4 text-emerald-600" />
    case "late":
      return <Clock className="h-4 w-4 text-amber-600" />
    case "missed":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
  }
}

function getStatusColor(status: PaymentHistory["status"]) {
  switch (status) {
    case "paid":
      return "bg-emerald-100 text-emerald-800"
    case "late":
      return "bg-amber-100 text-amber-800"
    case "missed":
      return "bg-red-100 text-red-800"
  }
}

export function PaymentHistorySection({
  payments,
  limit = 5,
}: {
  payments: PaymentHistory[]
  limit?: number
}) {
  const recentPayments = payments
    .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
    .slice(0, limit)

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Payment History</CardTitle>
        <p className="text-xs text-muted-foreground">Your last {limit} loan payments</p>
      </CardHeader>

      <CardContent className="p-0">
        {recentPayments.length > 0 ? (
          <div className="divide-y">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-muted p-2">{getPaymentMethodIcon(payment.method)}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Loan ID: {payment.loanId.toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">
                        Paid: {new Date(payment.paymentDate).toLocaleDateString()}
                        {payment.status === "late" && (
                          <span className="text-amber-600">
                            {" "}
                            (Due: {new Date(payment.dueDate).toLocaleDateString()})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <Badge className={cn("text-xs", getStatusColor(payment.status))}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1 capitalize">{payment.status}</span>
                    </Badge>
                    <p className="text-xs text-muted-foreground capitalize">
                      {payment.method === "mpesa" ? "M-Pesa" : payment.method}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No payment history yet</p>
          </div>
        )}

        {payments.length > limit && (
          <div className="border-t p-3">
            <button className="w-full text-center text-xs text-emerald-600 hover:underline">
              View All Payment History
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
