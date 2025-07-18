// app/api/scrape/route.ts

import { NextRequest, NextResponse } from "next/server";
import { dummySchedule } from "@/lib/dummy_schedule";
import { getMatchStatus } from "@/utils/common";
import { Match } from "@/lib/interfaces";

// Define the type of the data you'll return

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status") || "all";
  const page = searchParams.get("page") || 1;

  try {
    const matches: Match[] =
      status === "all"
        ? dummySchedule
            .filter(
              (match) => getMatchStatus(match.date, match.time) !== "completed"
            )
            .slice(10 * (Number(page) - 1), 10 * Number(page))
        : dummySchedule
            .filter(
              (match) => getMatchStatus(match.date, match.time) === status
            )
            .slice(10 * (Number(page) - 1), 10 * Number(page));
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
