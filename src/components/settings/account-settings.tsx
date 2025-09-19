"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit } from "lucide-react"

export function AccountSettings() {
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "Amina Yusuf",
    email: "amina.yusuf@example.com",
    phone: "+254712345678",
    location: "Nairobi, Kenya",
    joinDate: "January 2024",
  })

  const handleSave = () => {
    // In real app, would save to API
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false)
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Account Information</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="h-8 bg-transparent">
            <Edit className="mr-1 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback className="bg-emerald-100 text-emerald-800 text-lg">AY</AvatarFallback>
            </Avatar>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 rounded-full bg-emerald-600 p-1.5 text-white hover:bg-emerald-700">
                <Camera className="h-3 w-3" />
              </button>
            )}
          </div>
          <div>
            <h3 className="font-medium">{formData.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                Premium Member
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Verified
              </Badge>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-xs">
              <User className="h-4 w-4" />
              Full Name
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <p className="text-sm font-medium">{formData.name}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-xs">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            ) : (
              <p className="text-sm font-medium">{formData.email}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-xs">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            ) : (
              <p className="text-sm font-medium">{formData.phone}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location" className="flex items-center gap-2 text-xs">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            {isEditing ? (
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            ) : (
              <p className="text-sm font-medium">{formData.location}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2 text-xs">
              <Calendar className="h-4 w-4" />
              Member Since
            </Label>
            <p className="text-sm font-medium">{formData.joinDate}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
