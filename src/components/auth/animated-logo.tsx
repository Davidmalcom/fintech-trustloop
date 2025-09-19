"use client"

import { useState, useEffect } from "react"
import { AppBrand } from "@/components/branding/app-brand"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AnimatedLogo({ size = "md", className = "" }: AnimatedLogoProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-12"
      } ${className}`}
    >
      <div className={`${sizeClasses[size]} animate-pulse`}>
        <AppBrand />
      </div>
    </div>
  )
}
