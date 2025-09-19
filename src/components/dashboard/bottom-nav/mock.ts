import type { BottomNavProps } from "./types"
// import { Home, Users, CreditCard, MessageSquare, User } from "lucide-react"

// export const mockBottomNavProps: BottomNavProps = {
//   active: "dashboard",
//   items: [
//     {
//       id: "dashboard",
//       label: "Home",
//       href: "/dashboard",
//       icon: Home,
//     },
//     {
//       id: "groups",
//       label: "Groups",
//       href: "/groups",
//       icon: Users,
//     },
//     {
//       id: "payments",
//       label: "Pay",
//       href: "/payments",
//       icon: CreditCard,
//     },
//     {
//       id: "chat",
//       label: "Chat",
//       href: "/chat",
//       icon: MessageSquare,
//     },
//     {
//       id: "profile",
//       label: "Profile",
//       href: "/profile",
//       icon: User,
//     },
//   ],
// }
export const mockBottomNavProps: BottomNavProps = {
  active: "home",
  items: [
    { id: "home", label: "Home", href: "/dashboard", icon: "home" },
    { id: "groups", label: "Groups", href: "/groups", icon: "users" },
    { id: "payments", label: "Pay", href: "/payments", icon: "credit-card" },
    { id: "chat", label: "Chat", href: "/chat", icon: "message-square" },
    { id: "profile", label: "Profile", href: "/settings", icon: "user" },
  ],
}


export const bottomNavData = mockBottomNavProps
