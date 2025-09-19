"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/components/auth/auth-context"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Pages that should not show in the sidebar
  const noSidebarPages = ["/","/home", "/auth/signin", "/auth/signup", "/auth/forgot-password"]
  const shouldShowSidebar = !noSidebarPages.includes(pathname)

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        {shouldShowSidebar ? (
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        ) : (
          children
        )}
      </AuthProvider>
    </ThemeProvider>
  )
}
