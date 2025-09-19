"use client"

import { Plus } from 'lucide-react'
import { cn } from "@/lib/utils"

type CreateFabProps = {
  href?: string
  label?: string
  className?: string
}

export function CreateFab({ href = "/groups#create", label = "Create", className }: CreateFabProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "fixed z-50 bottom-16 left-1/2 -translate-x-1/2 translate-y-0",
        "rounded-full p-3 shadow-lg ring-1 ring-black/5",
        "bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white",
        "hover:brightness-105 active:brightness-95",
        "pb-[calc(env(safe-area-inset-bottom)/4)]",
        className
      )}
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </a>
  )
}
