import { Teams } from "@/lib/dummy_schedule";
import { Inning } from "@/utils/common";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface ITeamScoreView {
  team: Teams;
  matchStatus: string;
  inning: Inning;
  isSecond?: boolean;
}

const TeamScoreView = ({
  team,
  inning,
  matchStatus,
  isSecond,
}: ITeamScoreView) => {
  return (
    <Flex
      flexDirection={isSecond ? "row-reverse" : "row"}
      alignItems={"center"}
      gap={"20px"}
    >
      <Box position={"relative"} height={"70px"} width={"70px"}>
        <Image
          layout="fill"
          objectFit="contain"
          src={team.logo}
          alt={team.code}
          sizes="100vh"
        />
      </Box>
      <Stack alignItems={"center"} gap={"0px"}>
        <Heading>{team.code}</Heading>
        {matchStatus !== "upcoming" ? (
          <Text>{inning.runs + "/" + inning.wickets}</Text>
        ) : null}
      </Stack>
    </Flex>
  );
};

export default TeamScoreView;
