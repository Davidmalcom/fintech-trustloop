"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedLogo } from "@/components/auth/animated-logo"
import { AuthNavbar } from "@/components/auth/auth-navbar"
import { useAuth } from "@/components/auth/auth-context"
import { Users, Shield, TrendingUp, MessageCircle, ArrowRight, CheckCircle, Star, Zap } from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      router.push("/dashboard")
      return
    }

    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [user, router])

  // If user is authenticated, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <AnimatedLogo size="lg" />
          <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join verified groups and build lasting financial relationships",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-level security with end-to-end encryption",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: "Financial Growth",
      description: "Track your progress and achieve your financial goals",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MessageCircle,
      title: "Smart Communication",
      description: "Stay connected with AI-powered chat features",
      color: "from-orange-500 to-orange-600",
    },
  ]

  const benefits = [
    "Build your TrustScore through verified transactions",
    "Access exclusive loan opportunities",
    "Connect with like-minded savers",
    "Secure group savings and investments",
    "Real-time financial insights",
    "24/7 AI financial assistant",
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Group Leader",
      content: "TrustLoop helped our chama save over $10,000 in just 6 months!",
      rating: 5,
    },
    {
      name: "John K.",
      role: "Member",
      content: "The loan process was so smooth and transparent. Highly recommended!",
      rating: 5,
    },
    {
      name: "Mary W.",
      role: "Treasurer",
      content: "Managing group finances has never been easier. Love the insights!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Top Navigation */}
      <AuthNavbar />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <AnimatedLogo size="lg" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Your Trusted
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Financial Community
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 sm:text-xl">
              Join thousands of members building wealth together through secure group savings, smart investments, and
              trusted financial relationships.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div
            className={`mt-16 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <div className="relative mx-auto max-w-4xl">
              <img
                src="/savings.jpg?height=600&width=800&text=TrustLoop+Dashboard+Preview"
                alt="TrustLoop Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                Secure
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Trusted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose TrustLoop?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to build wealth with your community</p>
          </div>

          <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-r ${feature.color} rounded-lg shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="about" className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Start Building Your Financial Future Today
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Join a community that values trust, transparency, and mutual growth. Every interaction builds your
                reputation and unlocks new opportunities.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-start animate-in slide-in-from-left-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-green-500" />
                    <span className="ml-3 text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Join TrustLoop Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/Img1.jpg?height=500&width=600&text=Community+Building+Wealth"
                alt="Community using TrustLoop"
                className="w-full h-auto rounded-2xl shadow-xl border border-gray-200"
              />

              {/* Floating Stats */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-500">98% Success Rate</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">$2M+ Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Our Members Say</h2>
            <p className="mt-4 text-lg text-gray-600">Real stories from real people building wealth together</p>
          </div>

          <div className="grid gap-8 mt-12 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className={`transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$2M+</div>
              <div className="text-gray-300">Saved Together</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-300">Active Groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div id="contact" className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-xl text-blue-100">Join thousands of members already building wealth together</p>
          <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200 bg-transparent shadow-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
