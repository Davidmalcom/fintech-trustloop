"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { FileText, User, Wallet, Shield, ArrowLeft } from "lucide-react"
import { loanTypes } from "./mock-data"

type FormData = {
  loanTypeId: string
  amount: string
  term: string
  purpose: string
  monthlyIncome: string
  employmentStatus: string
  guarantor1Name: string
  guarantor1Phone: string
  guarantor2Name: string
  guarantor2Phone: string
  guarantor3Name: string
  guarantor3Phone: string
  agreeToTerms: boolean
}

export function LoanApplicationForm({
  selectedLoanTypeId,
  onBack,
  onSubmit,
}: {
  selectedLoanTypeId?: string
  onBack: () => void
  onSubmit: (data: FormData) => void
}) {
  const [formData, setFormData] = React.useState<FormData>({
    loanTypeId: selectedLoanTypeId || loanTypes[0].id,
    amount: "",
    term: "",
    purpose: "",
    monthlyIncome: "",
    employmentStatus: "",
    guarantor1Name: "",
    guarantor1Phone: "",
    guarantor2Name: "",
    guarantor2Phone: "",
    guarantor3Name: "",
    guarantor3Phone: "",
    agreeToTerms: false,
  })

  const selectedLoanType = loanTypes.find((lt) => lt.id === formData.loanTypeId) || loanTypes[0]
  const requiredGuarantors =
    selectedLoanType.requirements.find((req) => req.includes("guarantor"))?.match(/\d+/)?.[0] || "1"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    const requiredFields = [
      formData.amount,
      formData.term,
      formData.purpose,
      formData.monthlyIncome,
      formData.employmentStatus,
      formData.guarantor1Name,
      formData.guarantor1Phone,
    ]

    if (Number.parseInt(requiredGuarantors) >= 2) {
      requiredFields.push(formData.guarantor2Name, formData.guarantor2Phone)
    }
    if (Number.parseInt(requiredGuarantors) >= 3) {
      requiredFields.push(formData.guarantor3Name, formData.guarantor3Phone)
    }

    return requiredFields.every((field) => field.trim() !== "") && formData.agreeToTerms
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5 text-emerald-600" />
              Loan Application
            </CardTitle>
            <p className="text-xs text-muted-foreground">Complete the form below to apply for your loan</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Loan Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-medium">Loan Details</h3>
            </div>

            <div className="space-y-3">
              <div>
                <Label>Loan Type</Label>
                <Select value={formData.loanTypeId} onValueChange={(value) => updateFormData("loanTypeId", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map((lt) => (
                      <SelectItem key={lt.id} value={lt.id}>
                        {lt.name} ({lt.interestRate}% p.a.)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Loan Amount (KES)</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => updateFormData("amount", e.target.value)}
                    placeholder="50000"
                    min={selectedLoanType.minAmount}
                    max={selectedLoanType.maxAmount}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Range: KES {selectedLoanType.minAmount.toLocaleString()} -{" "}
                    {selectedLoanType.maxAmount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label>Loan Term (Months)</Label>
                  <Select value={formData.term} onValueChange={(value) => updateFormData("term", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: selectedLoanType.maxTerm }, (_, i) => i + 1)
                        .filter((month) => month % 3 === 0 || month <= 6)
                        .map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {month} month{month > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Purpose of Loan</Label>
                <Textarea
                  value={formData.purpose}
                  onChange={(e) => updateFormData("purpose", e.target.value)}
                  placeholder="Describe how you plan to use this loan..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-medium">Personal Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Monthly Income (KES)</Label>
                <Input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => updateFormData("monthlyIncome", e.target.value)}
                  placeholder="50000"
                />
              </div>

              <div>
                <Label>Employment Status</Label>
                <Select
                  value={formData.employmentStatus}
                  onValueChange={(value) => updateFormData("employmentStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self_employed">Self Employed</SelectItem>
                    <SelectItem value="business_owner">Business Owner</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Guarantors Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-medium">Guarantors</h3>
              <Badge variant="outline" className="text-xs">
                {requiredGuarantors} required
              </Badge>
            </div>

            {/* Guarantor 1 */}
            <div className="rounded-lg border p-3 space-y-3">
              <p className="text-xs font-medium">Guarantor 1 (Required)</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={formData.guarantor1Name}
                    onChange={(e) => updateFormData("guarantor1Name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={formData.guarantor1Phone}
                    onChange={(e) => updateFormData("guarantor1Phone", e.target.value)}
                    placeholder="254712345678"
                  />
                </div>
              </div>
            </div>

            {/* Guarantor 2 */}
            {Number.parseInt(requiredGuarantors) >= 2 && (
              <div className="rounded-lg border p-3 space-y-3">
                <p className="text-xs font-medium">Guarantor 2 (Required)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={formData.guarantor2Name}
                      onChange={(e) => updateFormData("guarantor2Name", e.target.value)}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={formData.guarantor2Phone}
                      onChange={(e) => updateFormData("guarantor2Phone", e.target.value)}
                      placeholder="254723456789"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Guarantor 3 */}
            {Number.parseInt(requiredGuarantors) >= 3 && (
              <div className="rounded-lg border p-3 space-y-3">
                <p className="text-xs font-medium">Guarantor 3 (Required)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={formData.guarantor3Name}
                      onChange={(e) => updateFormData("guarantor3Name", e.target.value)}
                      placeholder="Mary Johnson"
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={formData.guarantor3Phone}
                      onChange={(e) => updateFormData("guarantor3Phone", e.target.value)}
                      placeholder="254734567890"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-xs leading-relaxed">
                I agree to the loan terms and conditions, including the interest rate of {selectedLoanType.interestRate}
                % per annum. I understand that this loan is subject to approval and I will be notified of the decision
                within {selectedLoanType.processingTime}.
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid()}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
          >
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
