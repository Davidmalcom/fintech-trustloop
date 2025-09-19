"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SecurityBadge } from "./security-badge"
import { Phone, Send, Info, Users } from "lucide-react"
import { PAYBILL } from "./mock"

type Result = { ok: true; message: string } | { ok: false; message: string } | null

export function MpesaSection({
  targetGroup,
}: {
  targetGroup?: { id: string; name: string }
}) {
  const [msisdn, setMsisdn] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [reference, setReference] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [result, setResult] = React.useState<Result>(null)

  // Prefill reference with group name when selected, if user hasn't typed anything yet
  React.useEffect(() => {
    if (targetGroup && reference.trim() === "") {
      setReference(targetGroup.name)
    }
  }, [targetGroup])

  function validate(): string | null {
    if (!/^2547\d{8}$/.test(msisdn.trim())) {
      return "Enter a valid Safaricom number in E.164 format, e.g., 2547XXXXXXXX"
    }
    const amt = Number(amount || 0)
    if (!amt || amt <= 0) {
      return "Enter a valid amount greater than 0"
    }
    return null
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const error = validate()
    if (error) {
      setResult({ ok: false, message: error })
      return
    }
    setResult(null)
    setPending(true)
    await new Promise((r) => setTimeout(r, 900))
    setPending(false)
    setResult({
      ok: true,
      message: `STK push sent to ${msisdn}. Approve to pay ${Number(amount).toLocaleString()} KES${reference ? ` • ${reference}` : ""}${targetGroup ? ` (to ${targetGroup.name})` : ""}.`,
    })
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">M-Pesa (STK Push)</CardTitle>
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
          Enter your Safaricom number in E.164 format and amount. You'll receive a prompt to authorize the payment.
        </p>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="msisdn">Phone (E.164)</Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
              <Input
                id="msisdn"
                placeholder="2547XXXXXXXX"
                className="pl-8"
                required
                inputMode="numeric"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="amount">Amount (KES)</Label>
            <Input
              id="amount"
              type="number"
              min={1}
              step={1}
              placeholder="5000"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="reference">Reference (optional)</Label>
            <Input
              id="reference"
              placeholder="e.g., Mama Mboga Chama"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
          <SecurityBadge />
          <Button type="submit" disabled={pending} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <Send className="mr-2 h-4 w-4" />
            {pending ? "Sending STK..." : "Send STK Push"}
          </Button>
          {result && (
            <div
              className={[
                "rounded-md border p-2 text-xs",
                result.ok
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-amber-300 bg-amber-50 text-amber-800",
              ].join(" ")}
            >
              {result.message}
            </div>
          )}
        </form>

        <div className="mt-2 rounded-md border bg-muted/40 p-2">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium">
            <Info className="h-4 w-4" /> Alternative: M-Pesa Paybill
          </div>
          <ul className="text-xs text-muted-foreground">
            <li>1. Open M-Pesa &gt; Lipa na M-Pesa &gt; Pay Bill</li>
            <li>
              2. Business number: <span className="font-medium">{PAYBILL.number}</span>
            </li>
            <li>
              3. Account: <span className="font-medium">{PAYBILL.account}</span>
              {targetGroup && (
                <>
                  {" "}
                  &middot; Ref: <span className="font-medium">{targetGroup.name}</span>
                </>
              )}
            </li>
            <li>4. Enter amount and confirm</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default MpesaSection
