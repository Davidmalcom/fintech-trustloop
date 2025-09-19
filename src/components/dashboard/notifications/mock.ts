import type { NotificationsProps } from "./types"

export const mockNotificationsProps: NotificationsProps = {
  items: [
    {
      id: "1",
      type: "payment",
      title: "Payment received from Sarah",
      time: "2 minutes ago",
    },
    {
      id: "2",
      type: "reminder",
      title: "Monthly contribution due tomorrow",
      time: "1 hour ago",
    },
    {
      id: "3",
      type: "announcement",
      title: "New group member joined Savings Circle",
      time: "3 hours ago",
    },
  ],
}
