export type NotificationType = "reminder" | "announcement" | "payment"

export type NotificationItem = {
  id: string
  title: string
  time: string // e.g., "2h ago"
  type: NotificationType
}

export type NotificationsProps = {
  items: NotificationItem[]
}
