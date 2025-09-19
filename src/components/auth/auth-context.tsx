"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User, AuthState, SignInData, SignUpData } from "./types"

interface AuthContextType extends AuthState {
  signIn: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
  signInWithProvider: (provider: string) => Promise<void>
  clearError: () => void // New method to clear errors
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })
  const router = useRouter()

  useEffect(() => {
    // Check for existing session in localStorage
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("trustloop_user")
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setState({ user, isLoading: false, error: null })
        } else {
          setState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to check authentication",
        }))
      }
    }

    checkAuth()
  }, [])

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }))
  }

  const signIn = async (data: SignInData) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call - accept any credentials for testing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        id: "test-user-1",
        email: data.email,
        name: data.email.split("@")[0] || "Test User",
        avatar: "/placeholder.svg?height=40&width=40",
        trustScore: Math.floor(Math.random() * 100),
      }

      // Save to localStorage for persistence
      localStorage.setItem("trustloop_user", JSON.stringify(user))

      setState({ user, isLoading: false, error: null })
      router.push("/dashboard") // Redirect after successful sign in
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Sign in failed",
      }))
    }
  }

  const signUp = async (data: SignUpData) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call - accept any data for testing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const user: User = {
        id: "test-user-" + Date.now(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        avatar: "/placeholder.svg?height=40&width=40",
        trustScore: 0,
      }

      // Save to localStorage for persistence
      localStorage.setItem("trustloop_user", JSON.stringify(user))

      setState({ user, isLoading: false, error: null })
      router.push("/dashboard") // Redirect after successful sign up
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Sign up failed",
      }))
    }
  }

  const signOut = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Clear all auth-related data
      localStorage.removeItem("trustloop_user")
      
      // Add delay for better UX (optional)
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      // Reset state and redirect
      setState({ user: null, isLoading: false, error: null })
      router.push("/")
      router.refresh() // Ensure client-side cache is cleared
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Sign out failed",
      }))
    }
  }

  const signInWithProvider = async (provider: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate OAuth flow - accept any provider for testing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const user: User = {
        id: "oauth-user-" + Date.now(),
        email: `user@${provider}.com`,
        name: `${provider} User`,
        avatar: "/placeholder.svg?height=40&width=40",
        trustScore: Math.floor(Math.random() * 100),
      }

      // Save to localStorage for persistence
      localStorage.setItem("trustloop_user", JSON.stringify(user))

      setState({ user, isLoading: false, error: null })
      router.push("/dashboard") // Redirect after successful provider sign in
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: `Failed to sign in with ${provider}`,
      }))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        signInWithProvider,
        clearError, // Add clearError to the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}