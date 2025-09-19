import type { ActiveGroupsProps } from "./types"

export const mockActiveGroupsProps: ActiveGroupsProps = {
  title: "Your Active Groups",
  groups: [
    {
      id: "g1",
      name: "Mama Mboga Chama",
      nextPaymentDate: "Aug 28",
      nextPaymentAmountLabel: "KES 5,000",
      trustScoreAvg: 92,
    },
    {
      id: "g2",
      name: "Diaspora Builders",
      nextPaymentDate: "Sep 02",
      nextPaymentAmountLabel: "KES 10,000",
      trustScoreAvg: 88,
    },
    {
      id: "g3",
      name: "Sisters Circle",
      nextPaymentDate: "Aug 30",
      nextPaymentAmountLabel: "KES 3,000",
      trustScoreAvg: 95,
    },
  ],
}
