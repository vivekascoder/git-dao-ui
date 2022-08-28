// components/Nav.tsz

import React from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Nav() {
  return (
    <Flex
      justifyContent={"space-between"}
      py={"4"}
      px={[20, 10]}
      alignItems={"center"}
    >
      <Link href={"/"}>
        <Text fontWeight={"bold"} fontSize={"1.3rem"} cursor={"pointer"}>
          🌈 Git DAO
        </Text>
      </Link>
      <ConnectButton />
    </Flex>
  );
}
