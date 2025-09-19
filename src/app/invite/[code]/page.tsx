"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle, XCircle, Clock, Wallet2 } from "lucide-react"
import { mockChamaData } from "@/components/chama/mock-data"

export default function InvitePage() {
  const params = useParams<{ code: string }>()
  const code = params?.code ?? "inv_001"
  const [status, setStatus] = React.useState<"pending" | "accepted" | "declined">("pending")

  // Mock invitation lookup
  const invitation = mockChamaData.invitations.find((inv) => inv.inviteCode === code)
  const chama = mockChamaData

  const handleAccept = () => {
    setStatus("accepted")
    // In real app, would make API call to join group
  }

  const handleDecline = () => {
    setStatus("declined")
  }

  if (!invitation) {
    return (
      <div className="mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center bg-background px-4">
        <Card className="w-full rounded-xl border">
          <CardContent className="p-6 text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-600" />
            <h1 className="mt-4 text-lg font-semibold">Invalid Invitation</h1>
            <p className="mt-2 text-sm text-muted-foreground">This invitation link is invalid or has expired.</p>
            <Button className="mt-4" asChild>
              <a href="/dashboard">Go to TrustLoop</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "accepted") {
    return (
      <div className="mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center bg-background px-4">
        <Card className="w-full rounded-xl border">
          <CardContent className="p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <h1 className="mt-4 text-lg font-semibold">Welcome to {chama.name}!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You've successfully joined the group. You can now participate in contributions and activities.
            </p>
            <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white" asChild>
              <a href="/chama">Go to Chama</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "declined") {
    return (
      <div className="mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center bg-background px-4">
        <Card className="w-full rounded-xl border">
          <CardContent className="p-6 text-center">
            <XCircle className="mx-auto h-12 w-12 text-gray-600" />
            <h1 className="mt-4 text-lg font-semibold">Invitation Declined</h1>
            <p className="mt-2 text-sm text-muted-foreground">You've declined the invitation to join {chama.name}.</p>
            <Button variant="outline" className="mt-4 bg-transparent" asChild>
              <a href="/dashboard">Go to TrustLoop</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-background">
      <main className="flex-1 px-4 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-3 w-fit">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-xl font-bold">You're Invited!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {invitation.invitedByName} has invited you to join their chama group
            </p>
          </div>

          {/* Group Info */}
          <Card className="rounded-xl border">
            <CardHeader className="pb-3">
              <CardTitle className="text-center">{chama.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">{chama.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4 text-emerald-600" />
                    <span className="text-lg font-semibold">{chama.totalMembers}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Wallet2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-lg font-semibold">
                      {chama.currency} {chama.contributionSchedule.amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{chama.contributionSchedule.frequency} contribution</p>
                </div>
              </div>

              {/* Members Preview */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Current Members</p>
                <div className="flex -space-x-2">
                  {chama.members.slice(0, 4).map((member) => (
                    <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                      <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {chama.members.length > 4 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                      +{chama.members.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invitation Details */}
          <Card className="rounded-xl border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Invitation Code</p>
                  <p className="text-xs text-muted-foreground">{invitation.inviteCode}</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800">
                  <Clock className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Expires: {new Date(invitation.expiresAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleAccept} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CheckCircle className="mr-2 h-4 w-4" />
              Accept Invitation
            </Button>
            <Button onClick={handleDecline} variant="outline" className="w-full bg-transparent">
              <XCircle className="mr-2 h-4 w-4" />
              Decline
            </Button>
          </div>

          {/* Terms */}
          <div className="rounded-md border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">
              By accepting this invitation, you agree to participate in the group's contribution schedule and abide by
              the group's rules and decisions.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
