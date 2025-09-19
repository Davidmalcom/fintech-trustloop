import type { LoanType, FAQ } from "./types"

export const loanTypes: LoanType[] = [
  {
    id: "emergency",
    name: "Emergency Loan",
    description: "Quick access to funds for urgent needs like medical bills or school fees",
    minAmount: 5000,
    maxAmount: 100000,
    interestRate: 12,
    maxTerm: 12,
    requirements: ["Active chama member for 3+ months", "Good contribution history", "1 guarantor"],
    features: ["Quick approval (24-48 hours)", "Flexible repayment", "No collateral required"],
    processingTime: "24-48 hours",
    collateralRequired: false,
  },
  {
    id: "business",
    name: "Business Development Loan",
    description: "Capital for starting or expanding your business ventures",
    minAmount: 20000,
    maxAmount: 500000,
    interestRate: 15,
    maxTerm: 24,
    requirements: ["Active member for 6+ months", "Business plan", "2 guarantors", "Proof of income"],
    features: ["Competitive rates", "Business mentorship", "Flexible terms"],
    processingTime: "5-7 days",
    collateralRequired: true,
  },
  {
    id: "education",
    name: "Education Loan",
    description: "Support for school fees, training, and educational expenses",
    minAmount: 10000,
    maxAmount: 300000,
    interestRate: 10,
    maxTerm: 18,
    requirements: ["Active member for 3+ months", "School admission letter", "1 guarantor"],
    features: ["Low interest rates", "Grace period available", "Direct school payment"],
    processingTime: "3-5 days",
    collateralRequired: false,
  },
  {
    id: "asset",
    name: "Asset Purchase Loan",
    description: "Financing for purchasing assets like land, equipment, or vehicles",
    minAmount: 50000,
    maxAmount: 1000000,
    interestRate: 18,
    maxTerm: 36,
    requirements: ["Active member for 12+ months", "Asset valuation", "3 guarantors", "Down payment 20%"],
    features: ["Long repayment terms", "Asset-backed security", "Competitive rates"],
    processingTime: "7-14 days",
    collateralRequired: true,
  },
]

export const loanFAQs: FAQ[] = [
  {
    id: "faq1",
    question: "Who is eligible to apply for a loan?",
    answer:
      "All active chama members who have been contributing regularly for at least 3 months are eligible. Specific requirements vary by loan type.",
    category: "eligibility",
  },
  {
    id: "faq2",
    question: "How much can I borrow?",
    answer:
      "Loan amounts depend on your contribution history, income, and loan type. Generally, you can borrow up to 3x your total contributions or monthly income, whichever is lower.",
    category: "eligibility",
  },
  {
    id: "faq3",
    question: "What documents do I need to apply?",
    answer:
      "Basic requirements include: National ID, KRA PIN, bank statements (3 months), proof of income, and guarantor details. Additional documents may be required based on loan type.",
    category: "application",
  },
  {
    id: "faq4",
    question: "How long does loan approval take?",
    answer:
      "Processing times vary by loan type: Emergency loans (24-48 hours), Education loans (3-5 days), Business loans (5-7 days), Asset loans (7-14 days).",
    category: "application",
  },
  {
    id: "faq5",
    question: "What happens if I miss a payment?",
    answer:
      "We understand emergencies happen. Contact us immediately if you anticipate missing a payment. Late fees may apply, and persistent defaults may affect your credit standing within the chama.",
    category: "repayment",
  },
  {
    id: "faq6",
    question: "Can I repay my loan early?",
    answer:
      "Yes! Early repayment is encouraged and there are no prepayment penalties. You'll save on interest costs and improve your credit standing for future loans.",
    category: "repayment",
  },
  {
    id: "faq7",
    question: "What are the interest rates?",
    answer:
      "Interest rates range from 10-18% annually depending on the loan type and your risk profile. These rates are competitive compared to traditional banks and MFIs.",
    category: "general",
  },
  {
    id: "faq8",
    question: "Do I need collateral?",
    answer:
      "Not all loans require collateral. Emergency and Education loans typically don't require collateral, while Business and Asset loans may require security depending on the amount.",
    category: "general",
  },
]
