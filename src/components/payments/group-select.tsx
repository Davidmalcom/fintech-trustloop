"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export type GroupOption = { id: string; name: string }

export function GroupSelect({
  groups,
  value,
  onChange,
}: {
  groups: GroupOption[]
  value?: string
  onChange: (id: string | undefined) => void
}) {
  return (
    <Card className="rounded-xl border">
      <CardContent className="grid gap-2 p-3">
        <Label htmlFor="group-select">Pay to</Label>
        <Select value={value ?? "none"} onValueChange={(v) => onChange(v === "none" ? undefined : v)}>
          <SelectTrigger id="group-select" className="h-10">
            <SelectValue placeholder="Select a group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Destination</SelectLabel>
              <SelectItem value="none">No group (Wallet)</SelectItem>
              {groups.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-[11px] text-muted-foreground">Your payment will be attributed to the selected group.</p>
      </CardContent>
    </Card>
  )
}
