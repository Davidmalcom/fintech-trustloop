import type { ChamaRole, ChamaPermission } from "./types"

export const ROLE_PERMISSIONS: Record<ChamaRole, ChamaPermission[]> = {
  admin: [
    "manage_members",
    "manage_finances",
    "approve_loans",
    "approve_investments",
    "approve_withdrawals",
    "manage_meetings",
    "view_reports",
    "post_announcements",
  ],
  treasurer: ["manage_finances", "approve_loans", "approve_investments", "approve_withdrawals", "view_reports"],
  secretary: ["manage_meetings", "view_reports", "post_announcements"],
  auditor: ["view_reports"],
  member: [],
}

export function hasPermission(role: ChamaRole, permission: ChamaPermission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission)
}

export function getRoleDisplayName(role: ChamaRole): string {
  const names = {
    admin: "Admin",
    treasurer: "Treasurer",
    secretary: "Secretary",
    auditor: "Auditor",
    member: "Member",
  }
  return names[role]
}

export function getRoleColor(role: ChamaRole): string {
  const colors = {
    admin: "bg-red-100 text-red-800",
    treasurer: "bg-emerald-100 text-emerald-800",
    secretary: "bg-blue-100 text-blue-800",
    auditor: "bg-purple-100 text-purple-800",
    member: "bg-gray-100 text-gray-800",
  }
  return colors[role]
}
