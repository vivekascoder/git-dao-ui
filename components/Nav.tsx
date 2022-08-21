// components/Nav.tsz

import React from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Nav() {
  return (
    <Flex justifyContent={"space-between"} p={"4"} alignItems={"center"}>
      <Text fontWeight={"bold"} fontSize={"1.3rem"}>
        🌈 Git DAO
      </Text>
      <ConnectButton />
    </Flex>
  );
}
