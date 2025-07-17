import MatchesWrapper from "@/components/wrappers/MatchesWrapper";
// import React from "react";
type Props = {
  params: { status: string };
};
export default async function StatusMatches({ params }: Props) {
  const status = (await params).status;
  console.log(status);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/matches?status=${status}`,
    status !== "live" && status !== "all"
      ? {
          next: { revalidate: 600 }, // also works here for fetch cache
        }
      : {
          cache: "no-store",
        }
  );
  const data = await res.json();
  const matches: any[] = data?.matches || [];
  return <MatchesWrapper matches={matches} />;
}
