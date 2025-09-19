"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus, AlertCircle, Info, AlertTriangle } from "lucide-react"
import type { Announcement } from "../types"
import { cn } from "@/lib/utils"

function getPriorityIcon(priority: Announcement["priority"]) {
  const icons = {
    low: Info,
    medium: AlertCircle,
    high: AlertTriangle,
  }
  return icons[priority]
}

function getPriorityColor(priority: Announcement["priority"]) {
  const colors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-800",
  }
  return colors[priority]
}

export function Announcements({
  announcements,
  canPost = false,
}: {
  announcements: Announcement[]
  canPost?: boolean
}) {
  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Announcements</CardTitle>
          {canPost && (
            <Button size="sm" className="h-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <Plus className="mr-1 h-4 w-4" />
              Post
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {announcements.length > 0 ? (
          <div className="divide-y">
            {announcements.map((announcement) => {
              const PriorityIcon = getPriorityIcon(announcement.priority)
              return (
                <div key={announcement.id} className="p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-emerald-50 p-1.5 text-emerald-700">
                        <Megaphone className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{announcement.title}</p>
                        <p className="text-xs text-muted-foreground">
                          By {announcement.authorName} • {new Date(announcement.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn("text-xs", getPriorityColor(announcement.priority))}>
                      <PriorityIcon className="mr-1 h-3 w-3" />
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">{announcement.content}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-6 text-center">
            <Megaphone className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No announcements yet</p>
            {canPost && (
              <Button size="sm" className="mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <Plus className="mr-1 h-4 w-4" />
                Create Announcement
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
