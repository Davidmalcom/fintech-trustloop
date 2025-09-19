export type QuickAction = {
  id: "join" | "create" | "send" | "invite"
  label: string
  href?: string
}

export type QuickActionsProps = {
  actions: QuickAction[]
}
