import { Teams } from "@/lib/dummy_schedule";
import { MatchScore, getMatchScore } from "@/utils/common";
import { Card, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MatchCardBody from "./MatchCardBody";

interface IMatchCard {
  matchNumber: string;
  venue: string;
  teamA: Teams;
  teamB: Teams;
  date: string;
  time: string;
  matchStatus: string;
  matchWinner?: string;
  matchScore: string | MatchScore;
}

const MatchCard = ({
  matchNumber,
  venue,
  teamA,
  teamB,
  date,
  time,
  matchStatus,
  matchScore,
}: IMatchCard) => {
  return (
    <Card.Root
      bg={"#242033"}
      m={"0 auto"}
      w={"50%"}
      minW={"281px"}
      p={"10px 20px"}
      key={matchNumber}
      gap={"20px"}
    >
      <Card.Header
        alignContent={"center"}
        justifyContent={"space-between"}
        gap={"5px"}
        flexDirection={"row"}
        fontSize={"0.9rem"}
      >
        <Flex gap={"5px"}>
          <Text>IPL 2025</Text>
          <Text color={"#bc3d70"}>•</Text>
          <Text>Match {matchNumber}</Text>
        </Flex>
        <Flex gap={"5px"}>
          <Text color={"#bc3d70"}>•</Text>

          <Text
            color={
              matchStatus === "upcoming"
                ? "orange"
                : matchStatus === "completed"
                ? "greenyellow"
                : "red"
            }
          >
            {matchStatus.toUpperCase()}
          </Text>
        </Flex>
      </Card.Header>
      <Card.Body
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <MatchCardBody
          date={date}
          time={time}
          matchScore={matchScore as MatchScore}
          matchStatus={matchStatus}
          teamA={teamA}
          teamB={teamB}
        />
      </Card.Body>
      <Card.Footer
        alignContent={"center"}
        justifyContent={"space-between"}
        gap={"5px"}
        flexDirection={"row"}
        fontSize={"0.9rem"}
      >
        {matchStatus !== "upcoming" ? (
          <Flex gap={"5px"}>
            <Text>{date}</Text>
            <Text color={"#bc3d70"}>•</Text>
            <Text>{time}</Text>
          </Flex>
        ) : (
          <Text>{(matchScore as MatchScore).winner}</Text>
        )}
        <Text>{venue}</Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default MatchCard;
