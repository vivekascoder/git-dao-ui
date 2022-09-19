import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import React from "react";

import "@rainbow-me/rainbowkit/styles.css";

import CONFIG from "@/config";

export default function Nav() {
  const router = useRouter();
  // debugger;
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
      backgroundColor={"whiteAlpha.500"}
      backdropFilter={"blur(4px)"}
    >
      <Text
        fontWeight={"bold"}
        fontSize={"1.3rem"}
        cursor={"pointer"}
        onClick={() => router.push("/")}
      >
        🌈 Git DAO
      </Text>
      <Box display={"flex"} experimental_spaceX={4}>
        <ConnectButton />
        <Button onClick={() => router.push(CONFIG.DOCS_URL)}>📚 Docs</Button>
      </Box>
    </Flex>
  );
}
