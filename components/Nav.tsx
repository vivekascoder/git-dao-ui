// components/Nav.tsz

import { Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

import "@rainbow-me/rainbowkit/styles.css";

export default function Nav() {
  return (
    <Flex
      justifyContent={"space-between"}
      py={"4"}
      px={[20, 10]}
      alignItems={"center"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="60"
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
