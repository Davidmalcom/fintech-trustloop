"use client"

import * as React from "react"
import { Sun, Moon, CircleDot } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import type { ThemeOption } from "./types"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [value, setValue] = React.useState<ThemeOption>((theme as ThemeOption) || "system")

  React.useEffect(() => {
    if (!theme) return
    setValue(theme as ThemeOption)
  }, [theme])

  const icon =
    value === "light" ? <Sun className="h-5 w-5" /> :
    value === "dark" ? <Moon className="h-5 w-5" /> :
    <CircleDot className="h-5 w-5" />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => {
            const next = v as ThemeOption
            setValue(next)
            setTheme(next)
          }}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
