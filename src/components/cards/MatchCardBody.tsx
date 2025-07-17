import { Teams } from "@/lib/dummy_schedule";
import { MatchScore } from "@/utils/common";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import TeamScoreView from "../common/TeamScoreView";

interface IMatchCardBody {
  teamA: Teams;
  teamB: Teams;
  matchStatus: string;
  matchScore: MatchScore;
  date: string;
  time: string;
}

const MatchCardBody = ({
  teamA,
  teamB,
  matchStatus,
  matchScore,
  date,
  time,
}: IMatchCardBody) => {
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} gap={"20px"}>
        <TeamScoreView
          inning={matchScore?.score?.inning1}
          matchStatus={matchStatus}
          team={
            matchScore.score
              ? matchScore?.score?.inning1?.team === teamA?.code
                ? teamA
                : teamB
              : teamA
          }
        />
        <Text>vs</Text>
        <TeamScoreView
          isSecond
          inning={matchScore?.score?.inning2}
          matchStatus={matchStatus}
          team={
            matchScore?.score
              ? matchScore?.score?.inning2?.team === teamA?.code
                ? teamA
                : teamB
              : teamB
          }
        />
      </Flex>
      {matchStatus === "upcoming" ? (
        <Flex gap={"5px"}>
          <Text>{date}</Text>
          <Text color={"#bc3d70"}>•</Text>
          <Text>{time}</Text>
        </Flex>
      ) : (
        <Text>{(matchScore as MatchScore).description}</Text>
      )}
    </>
  );
};
export default MatchCardBody;
