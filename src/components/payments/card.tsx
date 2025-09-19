"use client"

import * as React from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitCardPayment } from "@/app/payments/actions"
import { SecurityBadge } from "./security-badge"
import { CreditCard, Lock, Users } from "lucide-react"

function tokenizeCard(data: { number: string; cvv: string; exp: string; name: string }) {
  const last4 = data.number.replace(/\s+/g, "").slice(-4)
  const token = `tok_${btoa(`${Date.now()}_${last4}`).replace(/=+$/, "")}`
  return { token, last4 }
}

export function CardSection({
  targetGroup,
}: {
  targetGroup?: { id: string; name: string }
}) {
  const [cardNumber, setCardNumber] = React.useState("")
  const [cvv, setCvv] = React.useState("")
  const [exp, setExp] = React.useState("")
  const [name, setName] = React.useState("")
  const [amount, setAmount] = React.useState<string>("")

  const [state, action, pending] = useActionState(submitCardPayment, null)

  function formatCardNum(value: string) {
    return value
      .replace(/[^\d]/g, "")
      .slice(0, 19)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  function formatExp(value: string) {
    const v = value.replace(/[^\d]/g, "").slice(0, 4)
    if (v.length <= 2) return v
    return v.slice(0, 2) + "/" + v.slice(2)
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Card Payment</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {targetGroup && (
          <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-2 py-1 text-xs">
            <Users className="h-4 w-4 text-emerald-700" />
            <span>
              Paying to: <span className="font-medium">{targetGroup.name}</span>
            </span>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          We never store your full card number or CVV. On submit, a one-time token is generated and sent to the server.
        </p>
        <form
          action={async (fd) => {
            const { token, last4 } = tokenizeCard({ number: cardNumber, cvv, exp, name })
            setTimeout(() => {
              setCardNumber("")
              setCvv("")
            }, 0)

            fd.set("token", token)
            fd.set("last4", last4)
            fd.set("name", name)
            fd.set("exp", exp)
            fd.set("amount", amount || "0")
            if (targetGroup?.name) fd.set("groupName", targetGroup.name)
            await action(fd)
          }}
          className="grid gap-3"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="card-name">Name on card</Label>
            <Input
              id="card-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Amina Yusuf"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="card-number">Card number</Label>
            <div className="relative">
              <CreditCard className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
              <Input
                id="card-number"
                autoComplete="cc-number"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNum(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className="pl-8"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="exp">Expiry (MM/YY)</Label>
              <Input
                id="exp"
                autoComplete="cc-exp"
                inputMode="numeric"
                value={exp}
                onChange={(e) => setExp(formatExp(e.target.value))}
                placeholder="08/27"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                <Input
                  id="cvv"
                  type="password"
                  inputMode="numeric"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
                  placeholder="123"
                  className="pl-8"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="card-amount">Amount (KES)</Label>
            <Input
              id="card-amount"
              inputMode="numeric"
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="5000"
              required
            />
          </div>
          <SecurityBadge />
          <Button
            type="submit"
            disabled={pending || !amount}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
          >
            {pending ? "Processing…" : "Pay Now"}
          </Button>
          {state && (
            <div
              className={[
                "rounded-md border p-2 text-xs",
                state.ok
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-amber-300 bg-amber-50 text-amber-800",
              ].join(" ")}
            >
              {state.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
