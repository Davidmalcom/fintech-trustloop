"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Plus,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Users,
} from "lucide-react"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function InvestmentsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Mock data
  const portfolioValue = 45750
  const totalGains = 8750
  const gainsPercentage = 23.6

  const investments = [
    {
      id: 1,
      name: "Tech Growth Fund",
      type: "Mutual Fund",
      amount: 15000,
      currentValue: 18500,
      gain: 3500,
      gainPercentage: 23.3,
      risk: "Medium",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Real Estate REIT",
      type: "REIT",
      amount: 12000,
      currentValue: 13800,
      gain: 1800,
      gainPercentage: 15.0,
      risk: "Low",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Emerging Markets",
      type: "ETF",
      amount: 8000,
      currentValue: 9200,
      gain: 1200,
      gainPercentage: 15.0,
      risk: "High",
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Bond Index",
      type: "Bond Fund",
      amount: 10000,
      currentValue: 10250,
      gain: 250,
      gainPercentage: 2.5,
      risk: "Low",
      color: "bg-yellow-500",
    },
  ]

  const groupInvestments = [
    {
      id: 1,
      name: "Sunrise Chama Investment Pool",
      members: 12,
      totalValue: 125000,
      myContribution: 8500,
      myShare: 6.8,
      performance: 18.5,
      status: "Active",
    },
    {
      id: 2,
      name: "Unity Investment Group",
      members: 8,
      totalValue: 85000,
      myContribution: 12000,
      myShare: 14.1,
      performance: 12.3,
      status: "Active",
    },
    {
      id: 3,
      name: "Future Builders Fund",
      members: 15,
      totalValue: 200000,
      myContribution: 5000,
      myShare: 2.5,
      performance: 25.8,
      status: "Pending",
    },
  ]

  const opportunities = [
    {
      id: 1,
      title: "Green Energy Fund",
      description: "Invest in renewable energy companies with high growth potential",
      minInvestment: 1000,
      expectedReturn: "15-25%",
      risk: "Medium",
      duration: "3-5 years",
    },
    {
      id: 2,
      title: "African Markets ETF",
      description: "Diversified exposure to growing African economies",
      minInvestment: 500,
      expectedReturn: "12-20%",
      risk: "High",
      duration: "5+ years",
    },
    {
      id: 3,
      title: "Stable Income Bonds",
      description: "Government and corporate bonds for steady returns",
      minInvestment: 2000,
      expectedReturn: "6-8%",
      risk: "Low",
      duration: "2-3 years",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <h1 className="text-lg font-semibold">Investments</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20 md:pb-4 space-y-6 max-w-7xl mx-auto w-full">
        {/* Portfolio Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{gainsPercentage}% this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gains</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${totalGains.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Since inception</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investments.length + groupInvestments.length}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {investments.length} individual, {groupInvestments.length} group
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="group">Group</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Portfolio Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Your investment distribution across different asset classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => {
                    const percentage = (investment.currentValue / portfolioValue) * 100
                    return (
                      <div key={investment.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${investment.color}`} />
                            <span className="text-sm font-medium">{investment.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
                <CardDescription>Top performing investments this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments
                    .sort((a, b) => b.gainPercentage - a.gainPercentage)
                    .slice(0, 3)
                    .map((investment) => (
                      <div key={investment.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${investment.color} flex items-center justify-center`}>
                            <BarChart3 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{investment.name}</p>
                            <p className="text-sm text-muted-foreground">{investment.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+{investment.gainPercentage}%</p>
                          <p className="text-sm text-muted-foreground">+${investment.gain.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Individual Investments</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Investment
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {investments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{investment.name}</CardTitle>
                      <Badge className={getRiskColor(investment.risk)}>{investment.risk} Risk</Badge>
                    </div>
                    <CardDescription>{investment.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Initial Investment</span>
                      <span className="font-medium">${investment.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Value</span>
                      <span className="font-medium">${investment.currentValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gain/Loss</span>
                      <div className="flex items-center space-x-1">
                        {investment.gain >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-600" />
                        )}
                        <span className={`font-medium ${investment.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {investment.gain >= 0 ? "+" : ""}${investment.gain.toLocaleString()} (
                          {investment.gainPercentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Add More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="group" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Group Investments</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Join Group
              </Button>
            </div>

            <div className="grid gap-6">
              {groupInvestments.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant={group.status === "Active" ? "default" : "secondary"}>{group.status}</Badge>
                    </div>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {group.members} members
                      </span>
                      <span>Total Value: ${group.totalValue.toLocaleString()}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">My Contribution</p>
                        <p className="font-medium">${group.myContribution.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">My Share</p>
                        <p className="font-medium">{group.myShare}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <p className="font-medium text-green-600">+{group.performance}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Est. Value</p>
                        <p className="font-medium">
                          ${Math.round((group.totalValue * group.myShare) / 100).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View Group
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Contribute More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Investment Opportunities</h2>
              <Button variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Set Preferences
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Min. Investment</span>
                        <span className="font-medium">${opportunity.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Expected Return</span>
                        <span className="font-medium text-green-600">{opportunity.expectedReturn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Level</span>
                        <Badge className={getRiskColor(opportunity.risk)}>{opportunity.risk}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="font-medium">{opportunity.duration}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Learn More
                      </Button>
                      <Button size="sm" className="flex-1">
                        Invest Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
