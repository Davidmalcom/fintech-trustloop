"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from 'lucide-react'
import type { SettingsMenuProps } from "./types"
import { mockSettingsMenuProps } from "./mock"

export function SettingsMenu(props: SettingsMenuProps = mockSettingsMenuProps) {
  const { options = mockSettingsMenuProps.options! } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open settings">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options?.map((opt) => (
          <DropdownMenuItem
            key={opt.id}
            onClick={opt.onClick}
            asChild={!!opt.href}
          >
            {opt.href ? <a href={opt.href}>{opt.label}</a> : <button className="w-full text-left">{opt.label}</button>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
