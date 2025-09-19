import type { UpcomingActivityProps } from "./types"

export const mockUpcomingActivityProps: UpcomingActivityProps = {
  nextContribution: {
    dateISO: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // in 3 days
    amount: { currency: "KES", amount: 5000 },
    label: "Mama Mboga Chama",
  },
  nextPayout: {
    dateISO: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000).toISOString(), // in 12 days
    amount: { currency: "KES", amount: 15000 },
  },
}
