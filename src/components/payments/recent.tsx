'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { recentPaymentsMock } from './mock'
import { Wallet2, Smartphone, Landmark } from 'lucide-react'

function iconFor(method: 'mpesa-stk' | 'mpesa-paybill' | 'card' | 'bank') {
  switch (method) {
    case 'mpesa-stk':
    case 'mpesa-paybill':
      return Smartphone
    case 'bank':
      return Landmark
    default:
      return Wallet2
  }
}

export function RecentPayments() {
  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {recentPaymentsMock.map((p) => {
            const Icon = iconFor(p.method)
            return (
              <li key={p.id} className="flex items-center gap-3 p-3">
                <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{p.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{p.time}</p>
                </div>
                <div className="text-sm font-medium">
                  {p.currency} {p.amount.toLocaleString()}
                </div>
              </li>
            )
          })}
          {recentPaymentsMock.length === 0 && (
            <li className="p-3 text-sm text-muted-foreground">No recent payments.</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
