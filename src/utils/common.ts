/**
 * Returns winner based upon string operations
 */
export function getMatchWinner(
  teamA: string,
  teamB: string,
  venue: string
): string {
  const getScore = (team: string, venue: string) => {
    const input = team + venue + team[0];
    return input
      .toUpperCase()
      .split("")
      .reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 1), 0);
  };

  const teamAScore = getScore(teamA, venue);
  const teamBScore = getScore(teamB, venue);

  return teamAScore >= teamBScore ? teamA : teamB;
}

/**
 * Returns "upcoming", "live", or "completed" based on current time
 */
export function getMatchStatus(
  date: string,
  time: string
): "upcoming" | "live" | "completed" {
  // Parse input date and time into a JS Date object
  const [hourStr, minuteStr] = time.replace(" IST", "").split(":");
  const matchDateTime = new Date(
    `${date}T${hourStr.padStart(2, "0")}:${minuteStr}:00+05:30`
  );

  const now = new Date();

  const matchDurationMinutes = 210; // ~3.5 hours for a T20 match
  const matchEndTime = new Date(
    matchDateTime.getTime() + matchDurationMinutes * 60000
  );

  if (now < matchDateTime) return "upcoming";
  if (now >= matchDateTime && now <= matchEndTime) return "live";
  return "completed";
}

export type Inning = {
  team: string;
  runs: number;
  wickets: number;
  overs: string;
};

export type MatchScore = {
  toss: string;
  score: {
    inning1: Inning;
    inning2: Inning;
  };
  description: string;
  winner?: string;
};

export function getMatchScore(
  teamA: string,
  teamB: string,
  date: string,
  time: string
): string | MatchScore {
  const now = new Date();
  const [hourStr, minuteStr] = time.replace(" IST", "").split(":");
  const matchStart = new Date(`${date}T${hourStr}:${minuteStr}:00+05:30`);
  const elapsedMs = now.getTime() - matchStart.getTime();
  const elapsedMin = elapsedMs / 60000;

  // if match hasn't started
  if (elapsedMin < 0) {
    const hours = Math.ceil(Math.abs(elapsedMin) / 60);
    return `Match starts in ${hours} hour(s)`;
  }

  // Helper hash to get deterministic values from strings
  const getHash = (str: string) =>
    str.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);

  const totalHash = getHash(teamA + teamB + date + time);

  // Decide toss
  const toss = totalHash % 2 === 0 ? teamA : teamB;
  const battingFirst = toss;
  const battingSecond = battingFirst === teamA ? teamB : teamA;

  // Inning 1 simulation (fixed 20 overs always)
  const inning1Runs = 140 + (totalHash % 61); // 140–200 runs
  const inning1Wickets = totalHash % 10; // 0–9 wickets
  const inning1Overs = "20.0";

  // Inning 2 simulation
  let inning2Runs = 0;
  let inning2Wickets = 0;
  let inning2Overs = "0.0";
  let description = "";

  // Match state
  if (elapsedMin < 90) {
    // 1st innings in progress
    const progress = Math.min(1, elapsedMin / 90);
    const overs = +(progress * 20).toFixed(1);
    const runs = Math.floor(inning1Runs * progress);
    const wickets = Math.floor(inning1Wickets * progress);
    return {
      toss,
      score: {
        inning1: {
          team: battingFirst,
          runs,
          wickets,
          overs: overs.toFixed(1),
        },
        inning2: {
          team: battingSecond,
          runs: 0,
          wickets: 0,
          overs: "0.0",
        },
      },
      description: `${battingFirst} batting`,
    };
  } else if (elapsedMin < 180) {
    // 2nd innings in progress
    const progress = Math.min(1, (elapsedMin - 90) / 90);
    inning2Runs = Math.floor(inning1Runs * progress - ((totalHash % 16) - 8));
    inning2Runs = Math.max(0, inning2Runs);
    inning2Wickets = Math.floor((totalHash % 9) * progress);
    const overs = +(progress * 20).toFixed(1);
    inning2Overs = overs.toFixed(1);

    const runsLeft = inning1Runs - inning2Runs + 1;
    const ballsLeft = 120 - Math.floor(progress * 120);

    description = `${battingSecond} need ${runsLeft} run${
      runsLeft > 1 ? "s" : ""
    } in ${ballsLeft} ball${ballsLeft > 1 ? "s" : ""} `;

    return {
      toss,
      score: {
        inning1: {
          team: battingFirst,
          runs: inning1Runs,
          wickets: inning1Wickets,
          overs: inning1Overs,
        },
        inning2: {
          team: battingSecond,
          runs: inning2Runs,
          wickets: inning2Wickets,
          overs: inning2Overs,
        },
      },
      description,
    };
  } else {
    // Match is over
    inning2Runs = inning1Runs - 5 + (totalHash % 21);
    inning2Wickets = totalHash % 10;
    inning2Overs = "20.0";

    const winner = inning2Runs > inning1Runs ? battingSecond : battingFirst;

    const description =
      inning2Runs > inning1Runs
        ? `${battingSecond} won by ${10 - inning2Wickets} wickets`
        : `${battingFirst} won by ${inning1Runs - inning2Runs} runs`;

    return {
      toss,
      score: {
        inning1: {
          team: battingFirst,
          runs: inning1Runs,
          wickets: inning1Wickets,
          overs: inning1Overs,
        },
        inning2: {
          team: battingSecond,
          runs: inning2Runs,
          wickets: inning2Wickets,
          overs: inning2Overs,
        },
      },
      winner,
      description,
    };
  }
}
