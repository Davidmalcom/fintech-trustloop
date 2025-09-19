"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { GroupMember } from "./types"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function GroupMembers({
  members,
  isMember,
  onJoin,
}: {
  members: GroupMember[]
  isMember: boolean
  onJoin: () => void
}) {
  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Members</CardTitle>
          {!isMember && (
            <Button onClick={onJoin} size="sm" className="h-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              Join Group
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {members.map((m) => (
            <li key={m.id} className="flex items-center gap-3 p-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-emerald-100 text-emerald-800">{initials(m.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{m.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Joined{" "}
                  {new Date(m.joinedAtISO).toLocaleDateString(undefined, {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              {m.role && (
                <Badge variant="outline" className="text-[11px]">
                  {m.role}
                </Badge>
              )}
            </li>
          ))}
          {members.length === 0 && <li className="p-4 text-center text-sm text-muted-foreground">No members yet.</li>}
        </ul>
      </CardContent>
    </Card>
  )
}
