"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GroupsActions({
  openCreate,
  openJoin,
  setOpenCreate,
  setOpenJoin,
  onCreate,
  onJoin,
}: {
  openCreate: boolean
  openJoin: boolean
  setOpenCreate: (v: boolean) => void
  setOpenJoin: (v: boolean) => void
  onCreate: (input: { name: string; contribution: number; frequency: string }) => void
  onJoin: (input: { code: string }) => void
}) {
  const [name, setName] = React.useState("")
  const [amount, setAmount] = React.useState<string>("")
  const [frequency, setFrequency] = React.useState("weekly")

  const [code, setCode] = React.useState("")

  return (
    <>
      {/* Create Group */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
            <DialogDescription>Set up a new savings group for your community.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="group-name">Group name</Label>
              <Input id="group-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Market Savers" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="contribution">Contribution</Label>
                <Input
                  id="contribution"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="KES 5000"
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button
              onClick={() => {
                const contribution = Number(amount || 0)
                onCreate({ name: name.trim() || "New Group", contribution, frequency })
                setName("")
                setAmount("")
                setFrequency("weekly")
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Join Group */}
      <Dialog open={openJoin} onOpenChange={setOpenJoin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Group</DialogTitle>
            <DialogDescription>Enter an invite code to join an existing group.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="invite-code">Invite code</Label>
              <Input id="invite-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g., TL-ABCD-1234" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenJoin(false)}>Cancel</Button>
            <Button
              onClick={() => {
                onJoin({ code })
                setCode("")
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
            >
              Join
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
