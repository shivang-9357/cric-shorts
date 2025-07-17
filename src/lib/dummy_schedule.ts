import { teams, venues } from "@/utils/constants";

export type Teams = {
  code: string;
  name: string;
  logo: string;
};

export const dummySchedule = [
  ...[...Array(160)].map((_, i) => {
    const teamA = teams[i % teams.length];
    const teamB = teams[(i + 3) % teams.length]; // avoid mirror matchups

    const matchDate = new Date(2025, 4, 23 + i);
    if (matchDate.getMonth() > 7 || matchDate.getDate() > 31) {
      matchDate.setMonth(7);
      matchDate.setDate(i - 100);
    }

    const dateStr = matchDate.toISOString().split("T")[0];

    return {
      matchNumber: i + 1,
      date: dateStr,
      time: i % 2 === 0 ? "19:30 IST" : "15:30 IST",
      teamA: {
        code: teamA.code,
        name: teamA.name,
        logo: teamA.logo,
      },
      teamB: {
        code: teamB.code,
        name: teamB.name,
        logo: teamB.logo,
      },
      venue: venues[i % venues.length],
    };
  }),
];
