import MatchesWrapper from "@/components/wrappers/MatchesWrapper";
import { Match } from "@/lib/interfaces";
import { Suspense } from "react";
// import React from "react";

export default async function Matches() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/matches`, {
    next: { revalidate: 600 }, // also works here for fetch cache
  });
  const data = await res.json();
  const matches: Match[] = data?.matches || [];
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MatchesWrapper matches={matches} />
    </Suspense>
  );
}
