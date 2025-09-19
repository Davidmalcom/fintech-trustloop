"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BANK_DETAILS } from "./mock"
import { Button } from "@/components/ui/button"
import { Copy, Landmark, Users } from "lucide-react"

export function BankTransferSection({
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
        <CardTitle className="text-sm font-semibold">Bank Transfer</CardTitle>
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
          <span>Send a transfer from your bank app or branch using the details below.</span>
        </div>
        <div className="grid gap-2 rounded-md border p-3 text-sm">
          <Row label="Bank" value={BANK_DETAILS.bank} />
          <Row label="Account name" value={BANK_DETAILS.accountName} />
          <Row label="Account number" value={BANK_DETAILS.accountNumber} copyable />
          <Row label="Branch" value={BANK_DETAILS.branch} />
          <Row label="SWIFT" value={BANK_DETAILS.swift} copyable />
        </div>
        <p className="text-xs text-muted-foreground">
          Include your reference in the transfer note
          {targetGroup ? (
            <>
              : <span className="font-medium">{targetGroup.name}</span>
            </>
          ) : (
            ""
          )}
          .
        </p>
      </CardContent>
    </Card>
  )

  function Row({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
    return (
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{value}</span>
          {copyable && (
            <Button variant="outline" size="sm" onClick={() => copy(value)} className="h-8">
              <Copy className="mr-1 h-4 w-4" /> Copy
            </Button>
          )}
        </div>
      </div>
    )
  }
}
