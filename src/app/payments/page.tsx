"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppBrand } from "@/components/branding/app-brand"
import { ThemeToggle } from "@/components/dashboard/theme-toggle/theme-toggle"
import { NotificationsButton } from "@/components/dashboard/notifications/notifications-button"
import { mockNotificationsProps } from "@/components/dashboard/notifications/mock"
import { BottomNav } from "@/components/dashboard/bottom-nav/bottom-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MpesaSection } from "@/components/payments/mpesa"
import { MpesaPaybillSection } from "@/components/payments/mpesa-paybill"
import { CardSection } from "@/components/payments/card"
import { BankTransferSection } from "@/components/payments/bank"
import { RecentPayments } from "@/components/payments/recent"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShieldCheck, Lock } from "lucide-react"
import { GroupSelect, type GroupOption } from "@/components/payments/group-select"
import { mockGroupsData } from "@/components/groups/mock"
import { mockBottomNavProps } from "@/components/dashboard/bottom-nav/mock"

export default function PaymentsPage() {
  const myGroups: GroupOption[] = mockGroupsData.myGroups.map((g) => ({ id: g.id, name: g.name }))
  const [groupId, setGroupId] = React.useState<string | undefined>(myGroups[0]?.id)
  const selected = myGroups.find((g) => g.id === groupId)

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-background">
      {/* Top navigation */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <AppBrand />
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <NotificationsButton {...mockNotificationsProps} />
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 pt-3">
        <div className="space-y-5">
          {/* Page title */}
          <section className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-3 text-white">
            <h1 className="text-base font-semibold">Payments</h1>
            <p className="mt-1 text-[12px] opacity-95">
              Choose a payment method and follow the steps. Your experience is secured and optimized for mobile.
            </p>
          </section>

          {/* Group selector */}
          <GroupSelect groups={myGroups} value={groupId} onChange={setGroupId} />

          {/* Methods */}
          <section aria-label="Payment Methods" className="rounded-xl border bg-card p-2">
            <div className="mb-2 px-1 text-sm font-semibold">Payment Methods</div>
            <Tabs defaultValue="mpesa-stk" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mpesa-stk">M-Pesa STK</TabsTrigger>
                <TabsTrigger value="mpesa-paybill">M-Pesa Paybill</TabsTrigger>
              </TabsList>
              <TabsContent value="mpesa-stk" className="mt-3">
                <MpesaSection targetGroup={selected} />
              </TabsContent>
              <TabsContent value="mpesa-paybill" className="mt-3">
                <MpesaPaybillSection targetGroup={selected} />
              </TabsContent>
            </Tabs>

            <div className="mt-3">
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="mt-3">
                  <CardSection targetGroup={selected} />
                </TabsContent>
                <TabsContent value="bank" className="mt-3">
                  <BankTransferSection targetGroup={selected} />
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Security & tips */}
          <section className="rounded-xl border p-2">
            <div className="mb-1 flex items-center gap-2 px-1">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <h2 className="text-sm font-semibold">Security & Tips</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="s1">
                <AccordionTrigger className="text-sm">How we protect your data</AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">
                  We minimize data collected during payments. Card details are tokenized on your device; only the token
                  and last 4 digits are sent to our servers. Use secure networks and keep your device updated.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="s2">
                <AccordionTrigger className="text-sm">Best practices</AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">
                  Verify paybill and account numbers before sending. For card payments, never share your CVV or OTP.
                  Approve M-Pesa STK prompts carefully and report suspicious activity immediately.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="s3">
                <AccordionTrigger className="text-sm">About card processing</AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">
                  Card processing is handled by a compliant provider in production. We do not store full card numbers or
                  CVV. For this demo, we simulate tokenization to illustrate the flow.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-2 flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1 text-[11px]">
              <Lock className="h-3.5 w-3.5" />
              <span>End-to-end encryption is required in production environments.</span>
            </div>
          </section>

          <RecentPayments />
        </div>
        <div className="h-6" />
      </main>

      <div className="md:hidden">
          <BottomNav {...mockBottomNavProps} />
        </div>
    </div>
  )
}
