"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Smartphone, Building, CreditCard, MoreVertical, Star, Trash2, Edit, Plus } from "lucide-react"
import type { SavedWithdrawalMethod } from "./history-types"
import { formatDate } from "./mock-data"

interface SavedMethodsProps {
  methods: SavedWithdrawalMethod[]
  onEdit: (method: SavedWithdrawalMethod) => void
  onDelete: (methodId: string) => void
  onSetDefault: (methodId: string) => void
  onAddNew: () => void
}

export function SavedMethods({ methods, onEdit, onDelete, onSetDefault, onAddNew }: SavedMethodsProps) {
  const [deleteMethodId, setDeleteMethodId] = useState<string | null>(null)

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "mpesa":
        return Smartphone
      case "bank_transfer":
        return Building
      case "paypal":
        return CreditCard
      default:
        return CreditCard
    }
  }

  const getMethodDetails = (method: SavedWithdrawalMethod) => {
    switch (method.type) {
      case "mpesa":
        return method.details.phoneNumber
      case "bank_transfer":
        return `${method.details.bankName} - ${method.details.accountNumber}`
      case "paypal":
        return method.details.paypalEmail
      default:
        return "Unknown method"
    }
  }

  const handleDelete = (methodId: string) => {
    onDelete(methodId)
    setDeleteMethodId(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Saved Withdrawal Methods</CardTitle>
            <Button onClick={onAddNew} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {methods.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved methods</h3>
              <p className="text-gray-600 mb-4">Add a withdrawal method to get started</p>
              <Button onClick={onAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Method
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {methods.map((method) => {
                const IconComponent = getMethodIcon(method.type)
                return (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{method.name}</h4>
                          {method.isDefault && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{getMethodDetails(method)}</p>
                        <p className="text-xs text-gray-500">Last used: {formatDate(method.lastUsed)}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(method)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {!method.isDefault && (
                          <DropdownMenuItem onClick={() => onSetDefault(method.id)}>
                            <Star className="h-4 w-4 mr-2" />
                            Set as Default
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => setDeleteMethodId(method.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteMethodId} onOpenChange={() => setDeleteMethodId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Withdrawal Method</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this withdrawal method? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMethodId && handleDelete(deleteMethodId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
