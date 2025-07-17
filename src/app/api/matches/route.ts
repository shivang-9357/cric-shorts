// app/api/scrape/route.ts

import { NextRequest, NextResponse } from "next/server";
import dummy_matches from "@/config/dummy_schedule.json";
import { dummySchedule } from "@/lib/dummy_schedule";
import { getMatchStatus } from "@/utils/common";

// Define the type of the data you'll return

interface Team {
  code: string;
  name: string;
  logo: string;
}

interface Match {
  teamA: Team;
  teamB: Team;
  time: string;
  venue: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status") || "all";

  try {
    const matches: Match[] =
      status === "all"
        ? dummySchedule.filter(
            (match) => getMatchStatus(match.date, match.time) !== "completed"
          )
        : dummySchedule.filter(
            (match) => getMatchStatus(match.date, match.time) === status
          );
    if (status === "completed") {
      matches.reverse();
    }
    return NextResponse.json({ matches }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch IPL data" },
      { status: 500 }
    );
  }
}
