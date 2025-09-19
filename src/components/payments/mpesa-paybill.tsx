"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PAYBILL } from "./mock"
import { Copy, Landmark, Users } from "lucide-react"

export function MpesaPaybillSection({
  targetGroup,
}: {
  targetGroup?: { id: string; name: string }
}) {
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      alert("Copied to clipboard")
    } catch {
      alert("Copy failed")
    }
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">M-Pesa (Paybill)</CardTitle>
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
        <div className="flex items-center gap-2 text-sm">
          <Landmark className="h-5 w-5 text-emerald-700" />
          <span>Use Paybill to pay directly from the M-Pesa app.</span>
        </div>
        <div className="grid gap-2 rounded-md border p-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Business number</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{PAYBILL.number}</span>
              <Button variant="outline" size="sm" onClick={() => copy(PAYBILL.number)} className="h-8">
                <Copy className="mr-1 h-4 w-4" /> Copy
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Account</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {PAYBILL.account}
                {targetGroup ? ` • ${targetGroup.name}` : ""}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copy(`${PAYBILL.account}${targetGroup ? ` • ${targetGroup.name}` : ""}`)}
                className="h-8"
              >
                <Copy className="mr-1 h-4 w-4" /> Copy
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Enter your amount in KES and confirm in the M-Pesa app.</div>
        </div>
      </CardContent>
    </Card>
  )
}
