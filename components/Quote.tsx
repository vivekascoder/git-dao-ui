import { Box, Text } from "@chakra-ui/react";

export default function Quote() {
  return (
    <Box padding={"4"} background="#1e293b" borderLeftWidth={3}>
      <Text fontSize={"1rem"} fontWeight="medium" textColor={"whiteAlpha.800"}>
        We're still in beta please send feedback to @0xStateMachine on twitter,
        we're happy to have you on our platform.
      </Text>
    </Box>
  );
}
