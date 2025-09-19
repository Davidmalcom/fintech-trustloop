export type MiniNotification = {
  id: string
  title: string
  time: string
}

export type NotificationsPanelProps = {
  items: MiniNotification[]
}
