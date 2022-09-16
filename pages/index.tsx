import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

import Asset from "@/components/Assets/Asset";

import Quote from "../components/Quote";
import PageLayout from "../layouts";

/**
 *  Responsible for skeleton of the site.
 */
export default function Home(): React.ReactNode {
  return (
    <PageLayout>
      <Box mt={"4rem"} position={"relative"}>
        <Asset />
        <Heading
          fontSize={"2.4rem"}
          fontWeight={"extrabold"}
          textAlign="center"
        >
          🌈 Git DAO
        </Heading>
        <Text
          fontSize={"1.2rem"}
          fontWeight={"extrabold"}
          textAlign="center"
          mt={"6"}
        >
          Launch DAO for your github repositories in minute with a few clicks
          and build economy around it and start supporting and growing your open
          source projects.
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          mt={8}
          experimental_spaceX={4}
        >
          <Link href={"/magic"}>
            <Button colorScheme="blue">🎩 Experience Magic</Button>
          </Link>
          <Link href={"/dao"}>
            <Button colorScheme="purple">⚖️ See DAOs</Button>
          </Link>
        </Flex>
        <Box mt={20}>
          <Quote />
        </Box>
      </Box>
    </PageLayout>
  );
}
