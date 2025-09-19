// export type BottomNavItem = {
//   id: "home" | "groups" | "create" | "profile" | "chat" | "payments" | "loans"
//   label: string
//   href: string
// }

// export type BottomNavProps = {
//   active: BottomNavItem["id"]
//   items: BottomNavItem[]
// }
export type BottomNavItem = {
  id: "home" | "groups" | "create" | "profile" | "chat" | "payments" | "loans"
  label: string
  href: string
  icon: string // store the icon name as a string
}

export type BottomNavProps = {
  active: BottomNavItem["id"]
  items: BottomNavItem[]
}
