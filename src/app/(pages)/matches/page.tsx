import MatchesWrapper from "@/components/wrappers/MatchesWrapper";
import { Match } from "@/lib/interfaces";
import { redirect } from "next/navigation";
import { Suspense } from "react";
// import React from "react";

export default async function Matches() {
  redirect("/matches/all");
}
