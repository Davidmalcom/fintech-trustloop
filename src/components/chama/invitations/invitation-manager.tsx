"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Copy, Plus, Share, UserPlus, Clock, CheckCircle, XCircle } from "lucide-react"
import type { Invitation } from "../types"

export function InvitationManager({
  invitations,
  canInvite = false,
  onCreateInvite,
}: {
  invitations: Invitation[]
  canInvite?: boolean
  onCreateInvite?: (phone: string, email?: string) => void
}) {
  const [phone, setPhone] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleCreateInvite = () => {
    if (phone.trim() && onCreateInvite) {
      onCreateInvite(phone.trim(), email.trim() || undefined)
      setPhone("")
      setEmail("")
      setOpen(false)
    }
  }

  const copyInviteLink = async (code: string) => {
    const link = `https://trustloop.app/invite/${code}`
    try {
      await navigator.clipboard.writeText(link)
      alert("Invite link copied to clipboard!")
    } catch {
      alert("Failed to copy link")
    }
  }

  const shareInvite = (code: string, phone: string) => {
    const link = `https://trustloop.app/invite/${code}`
    const message = `You're invited to join our TrustLoop chama! Click here to join: ${link}`
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const getStatusIcon = (status: Invitation["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "declined":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "expired":
        return <XCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: Invitation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "accepted":
        return "bg-emerald-100 text-emerald-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Member Invitations</CardTitle>
          {canInvite && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <Plus className="mr-1 h-4 w-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite New Member</DialogTitle>
                  <DialogDescription>Send an invitation to join your chama group.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="invite-phone">Phone Number *</Label>
                    <Input
                      id="invite-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="254712345678"
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="invite-email">Email (optional)</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateInvite}
                    disabled={!phone.trim()}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                  >
                    <UserPlus className="mr-1 h-4 w-4" />
                    Send Invite
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {invitations.length > 0 ? (
          <div className="divide-y">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{invitation.phone}</p>
                    <p className="text-xs text-muted-foreground">
                      Invited by {invitation.invitedByName} • {new Date(invitation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(invitation.status)}>
                    {getStatusIcon(invitation.status)}
                    <span className="ml-1">{invitation.status}</span>
                  </Badge>
                </div>

                {invitation.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 flex-1 bg-transparent"
                      onClick={() => copyInviteLink(invitation.inviteCode)}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy Link
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 flex-1 bg-transparent"
                      onClick={() => shareInvite(invitation.inviteCode, invitation.phone)}
                    >
                      <Share className="mr-1 h-3 w-3" />
                      WhatsApp
                    </Button>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Code: {invitation.inviteCode} • Expires: {new Date(invitation.expiresAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <UserPlus className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No invitations sent yet</p>
            {canInvite && (
              <Button
                size="sm"
                className="mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                onClick={() => setOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" />
                Send First Invite
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
