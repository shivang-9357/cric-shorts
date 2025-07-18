"use client";
import { NAVBAR_OPTIONS } from "@/utils/constants";
import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { status } = useParams();
  //   const [activeTab, setActiveTab] = useState(NAVBAR_OPTIONS[0]);
  return (
    <Flex w={"100%"} justifyContent={"center"}>
      <Flex
        borderRadius={"20px"}
        m={"20px auto"}
        width={"fit-content"}
        bg={"#181424"}
        position={"fixed"}
        zIndex={1}
      >
        {NAVBAR_OPTIONS.map((item) => {
          return (
            <Link key={item} href={`/matches/${item.toLowerCase()}`}>
              <Button
                cursor={"pointer"}
                borderRadius={"20px"}
                justifyContent={"center"}
                w={{ base: "80px", lg: "150px", sm: "120px" }}
                bg={item.toLowerCase() === status ? "#bc3d70" : "transparent"}
                padding={"10px 20px"}
                color={"white"}
                fontSize={{ base: "0.7rem", sm: "0.9rem" }}
              >
                <Text>{item}</Text>
              </Button>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Navbar;
