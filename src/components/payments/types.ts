export type PaymentMethodId = 'mpesa-stk' | 'mpesa-paybill' | 'card' | 'bank'

export type RecentPayment = {
  id: string
  method: PaymentMethodId
  title: string
  amount: number
  currency: string
  time: string
}
