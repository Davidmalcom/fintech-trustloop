import type { RecentPayment } from './types'

export const PAYBILL = {
  number: '123456',
  account: 'TRUSTLOOP-001',
}

export const BANK_DETAILS = {
  bank: 'TrustLoop Partner Bank',
  accountName: 'TrustLoop Holdings',
  accountNumber: '010123456789',
  branch: 'Nairobi CBD',
  swift: 'TLBKKE01',
}

export const recentPaymentsMock: RecentPayment[] = [
  { id: 'p1', method: 'mpesa-stk', title: 'Mama Mboga Chama', amount: 5000, currency: 'KES', time: '2h ago' },
  { id: 'p2', method: 'card', title: 'Diaspora Builders', amount: 10000, currency: 'KES', time: '1d ago' },
  { id: 'p3', method: 'bank', title: 'Wallet Top-up', amount: 15000, currency: 'KES', time: '3d ago' },
]
