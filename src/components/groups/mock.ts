import type { GroupsData } from "./types"

export const mockGroupsData: GroupsData = {
  currency: "KES",
  myGroups: [
    {
      id: "g1",
      name: "Mama Mboga Chama",
      nextPaymentDate: "Aug 28",
      nextPaymentAmountLabel: "KES 5,000",
      trustScoreAvg: 92,
      members: 12,
    },
    {
      id: "g2",
      name: "Diaspora Builders",
      nextPaymentDate: "Sep 02",
      nextPaymentAmountLabel: "KES 10,000",
      trustScoreAvg: 88,
      members: 18,
    },
  ],
  discover: [
    {
      id: "g3",
      name: "Sisters Circle",
      nextPaymentDate: "Aug 30",
      nextPaymentAmountLabel: "KES 3,000",
      trustScoreAvg: 95,
      members: 9,
    },
    {
      id: "g4",
      name: "Tech Savers",
      nextPaymentDate: "Sep 05",
      nextPaymentAmountLabel: "KES 2,500",
      trustScoreAvg: 85,
      members: 15,
    },
  ],
}
