import MatchesWrapper from "@/components/wrappers/MatchesWrapper";
import { Match } from "@/lib/interfaces";
import { PageProps } from "../../../../../.next/types/app/page";
// import React from "react";

export default async function StatusMatches({ params }: PageProps) {
  const status = (await params).status;
  console.log(status);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/matches?status=${status}`,
    status !== "live" && status !== "all"
      ? {
          next: { revalidate: 1 }, // also works here for fetch cache
        }
      : {
          cache: "no-store",
        }
  );
  const data = await res.json();
  const matches: Match[] = data?.matches || [];
  return <MatchesWrapper matches={matches} />;
}
