"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Users, FileText, CreditCard, Info } from "lucide-react"
import type { FAQ } from "./types"
import { loanFAQs } from "./mock-data"

function getCategoryIcon(category: FAQ["category"]) {
  const icons = {
    eligibility: Users,
    application: FileText,
    repayment: CreditCard,
    general: Info,
  }
  return icons[category]
}

function getCategoryColor(category: FAQ["category"]) {
  const colors = {
    eligibility: "bg-emerald-100 text-emerald-800",
    application: "bg-blue-100 text-blue-800",
    repayment: "bg-amber-100 text-amber-800",
    general: "bg-purple-100 text-purple-800",
  }
  return colors[category]
}

function getCategoryLabel(category: FAQ["category"]) {
  const labels = {
    eligibility: "Eligibility",
    application: "Application",
    repayment: "Repayment",
    general: "General",
  }
  return labels[category]
}

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<FAQ["category"] | "all">("all")

  const categories: FAQ["category"][] = ["eligibility", "application", "repayment", "general"]
  const filteredFAQs =
    selectedCategory === "all" ? loanFAQs : loanFAQs.filter((faq) => faq.category === selectedCategory)

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <HelpCircle className="h-5 w-5 text-emerald-600" />
          Frequently Asked Questions
        </CardTitle>
        <p className="text-xs text-muted-foreground">Find answers to common questions about our loan products</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={`cursor-pointer text-xs ${
              selectedCategory === "all" ? "bg-emerald-600 text-white" : "bg-transparent hover:bg-muted"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All Questions
          </Badge>
          {categories.map((category) => {
            const Icon = getCategoryIcon(category)
            return (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer text-xs ${
                  selectedCategory === category ? getCategoryColor(category) : "bg-transparent hover:bg-muted"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <Icon className="mr-1 h-3 w-3" />
                {getCategoryLabel(category)}
              </Badge>
            )
          })}
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((faq, index) => {
            const Icon = getCategoryIcon(faq.category)
            return (
              <AccordionItem key={faq.id} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm hover:no-underline">
                  <div className="flex items-start gap-2">
                    <Icon className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pl-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {filteredFAQs.length === 0 && (
          <div className="py-8 text-center">
            <HelpCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No questions found for this category</p>
          </div>
        )}

        {/* Contact Support */}
        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="text-xs font-medium">Still have questions?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Contact our support team at{" "}
            <a href="tel:+254700000000" className="text-emerald-600 hover:underline">
              +254 700 000 000
            </a>{" "}
            or{" "}
            <a href="mailto:loans@trustloop.app" className="text-emerald-600 hover:underline">
              loans@trustloop.app
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
