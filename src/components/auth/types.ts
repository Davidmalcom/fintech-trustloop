export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  trustScore?: number
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface SignInData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignUpData {
  name: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}
