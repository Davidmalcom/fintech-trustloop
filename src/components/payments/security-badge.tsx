'use client'

import { ShieldCheck } from 'lucide-react'

export function SecurityBadge({ className = '' }: { className?: string }) {
  return (
    <div className={['flex items-center gap-2 rounded-md border bg-card px-2 py-1 text-xs', className].join(' ')}>
      <ShieldCheck className="h-4 w-4 text-emerald-600" />
      <span>Secure: We only transmit tokens, not raw card details.</span>
    </div>
  )
}
