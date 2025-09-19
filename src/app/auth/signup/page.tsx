"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { AnimatedLogo } from "@/components/auth/animated-logo"
import { AuthNavbar } from "@/components/auth/auth-navbar"
import { useAuth } from "@/components/auth/auth-context"
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import Image from "next/image"

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, signInWithProvider, isLoading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.agreeToTerms) {
      return
    }

    try {
      await signUp(formData)
      router.push("/dashboard")
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  const handleProviderSignUp = async (provider: string) => {
    try {
      await signInWithProvider(provider)
      router.push("/dashboard")
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  const providers = [
    {
      id: "google",
      name: "Google",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      ),
      color: "hover:bg-gray-50 border-gray-300",
    },
    {
      id: "apple",
      name: "Apple",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
            fill="currentColor"
          />
        </svg>
      ),
      color: "hover:bg-gray-50 border-gray-300",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <AuthNavbar showAuthButtons={false} />

      {/* Main Content */}
      <div className="container relative grid min-h-[calc(100vh-4rem)] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side - Illustration (Hidden on mobile) */}
        <motion.div
  className="relative hidden h-full flex-col lg:flex dark:border-r"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {/* Full background image */}
  <Image
    src="/savings.jpg"
    alt="Community building wealth with TrustLoop"
    fill
    className="object-cover"
    priority
    sizes="50vw"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Content container */}
  <div className="relative z-20 flex flex-col h-full p-10 text-white">
    {/* Logo */}
    <div className="flex items-center text-lg font-medium mb-8">
      <AnimatedLogo size="md" />
      <span className="ml-2 font-semibold">TrustLoop</span>
    </div>

    {/* Spacer to push quote to bottom */}
    <div className="flex-1" />

    {/* Quote with faint background */}
    <motion.blockquote
      className="space-y-2 bg-black/50 p-4 rounded-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <p className="text-lg text-white">
        &ldquo;Joining TrustLoop was the best financial decision we made.
        The platform's tools helped us grow our savings by 40% in the first year.&rdquo;
      </p>
      <footer className="text-sm text-gray-200">
        Michael Chen, Financial Advisor
      </footer>
    </motion.blockquote>
  </div>
</motion.div>


        {/* Right side - Form */}
        <div className="lg:p-8 p-4 w-full">
          <motion.div 
            className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex flex-col space-y-2 text-center" variants={itemVariants}>
              <AnimatedLogo size="lg" className="mx-auto" />
              <h1 className="text-2xl font-semibold tracking-tight">Join TrustLoop</h1>
              <p className="text-sm text-muted-foreground">
                Create your account to start building wealth together
              </p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div variants={itemVariants}>
                <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Demo Mode Notice - More visible */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-300 rounded-lg p-4 text-center shadow-sm">
                <p className="text-sm font-medium text-green-800 mb-1">Demo Mode Active</p>
                <p className="text-xs text-green-700">
                  Use <span className="font-semibold">any information</span> to create a test account
                </p>
              </div>
            </motion.div>

            {/* Social Sign Up */}
            <motion.div className="grid grid-cols-2 gap-2" variants={itemVariants}>
              {providers.map((provider) => (
                <Button
                  key={provider.id}
                  variant="outline"
                  className={`w-full ${provider.color} transition-all hover:shadow-md`}
                  onClick={() => handleProviderSignUp(provider.id)}
                  disabled={isLoading}
                >
                  <span className="mr-2">{provider.icon}</span>
                  {provider.name}
                </Button>
              ))}
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with email</span>
              </div>
            </motion.div>

            {/* Sign Up Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="pl-10 h-11"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 h-11"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    className="pl-10 h-11"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10 h-11"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 h-11"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-primary underline underline-offset-4">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-primary underline underline-offset-4">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full h-11 transition-all hover:shadow-md"
                  disabled={
                    isLoading || !formData.name || !formData.email || !formData.password || !formData.agreeToTerms
                  }
                  // onMouseEnter={() => {/* Add hover effect logic here */}}
                  // onMouseLeave={() => {/* Reset hover effect logic here */}}
                  // onMouseDown={() => {/* Add tap effect logic here */}}
                  // onMouseUp={() => {/* Reset tap effect logic here */}}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            <motion.p 
              className="px-8 text-center text-sm text-muted-foreground"
              variants={itemVariants}
            >
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="underline underline-offset-4 hover:text-primary font-medium"
              >
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}