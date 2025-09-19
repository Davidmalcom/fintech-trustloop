"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedLogo } from "@/components/auth/animated-logo"
import { Users, Shield, TrendingUp, MessageCircle, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join verified groups and build lasting financial relationships",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-level security with end-to-end encryption",
    },
    {
      icon: TrendingUp,
      title: "Financial Growth",
      description: "Track your progress and achieve your financial goals",
    },
    {
      icon: MessageCircle,
      title: "Smart Communication",
      description: "Stay connected with AI-powered chat features",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

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
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 bg-transparent"
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
                src="/placeholder.svg?height=600&width=800"
                alt="TrustLoop Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose TrustLoop?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to build wealth with your community</p>
          </div>

          <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`transform hover:scale-105 transition-all duration-300 hover:shadow-lg delay-${index * 100}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg">
                    <feature.icon className="w-6 h-6 text-blue-600" />
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
      <div className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
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
                  <div key={benefit} className="flex items-start">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-green-500" />
                    <span className="ml-3 text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200"
                  >
                    Join TrustLoop Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Community using TrustLoop"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="mt-2 text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">$2M+</div>
              <div className="mt-2 text-gray-600">Saved Together</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">500+</div>
              <div className="mt-2 text-gray-600">Active Groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-xl text-blue-100">Join thousands of members already building wealth together</p>
          <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200 bg-transparent"
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
