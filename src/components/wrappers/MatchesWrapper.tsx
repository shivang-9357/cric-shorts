"use client";
import React from "react";
import { getMatchScore, getMatchStatus, getMatchWinner } from "@/utils/common";
import { Center, Stack, Text } from "@chakra-ui/react";
import MatchCard from "../cards/MatchCard";
import { useAppContext } from "@/context/AppContext";

const MatchesWrapper = ({ matches }: { matches: any[] }) => {
  const { activeTab } = useAppContext();

  return (
    <Stack h={"100%"} p={"20px"} pt={"100px"} overflow={"auto"}>
      {!matches.length ? (
        <Center>
          <Text>No Live Matches</Text>
        </Center>
      ) : (
        matches.map((match) => {
          const { matchNumber, venue, teamA, teamB, date, time } = match;
          const matchStatus = getMatchStatus(date, time);
          const matchScore = getMatchScore(teamA.code, teamB.code, date, time);
          const matchWinner = getMatchWinner(teamA.code, teamB.code, venue);
          return (
            <MatchCard
              key={matchNumber}
              matchNumber={matchNumber}
              venue={venue}
              teamA={teamA}
              teamB={teamB}
              date={date}
              time={time}
              matchStatus={matchStatus}
              matchWinner={matchWinner}
              matchScore={matchScore}
            />
          );
        })
      )}
    </Stack>
  );
};

export default MatchesWrapper;
