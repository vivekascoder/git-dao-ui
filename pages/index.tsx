import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import PageLayout from "../layouts";
import Quote from "../components/Quote";
import Link from "next/link";
/**
 *  Responsible for skeleton of the site.
 */
export default function Home(): React.ReactNode {
  return (
    <PageLayout>
      <Box mt={"4rem"}>
        <Heading
          fontSize={"2.4rem"}
          fontWeight={"extrabold"}
          textAlign="center"
        >
          🌈 Git DAO
        </Heading>
        <Text
          fontSize={"1.2rem"}
          fontWeight={"medium"}
          textAlign="center"
          mt={"6"}
        >
          Launch DAO for your github repositories in minute with a few clicks
          and build economy around it and start supporting and growing your open
          source projects.
        </Text>
        <Flex justifyContent="center" alignItems="center" mt={8}>
          <Link href={"/magic"}>
            <Button colorScheme="blue">🎩 Experience Magic</Button>
          </Link>
        </Flex>
      </Box>
      <Box mt={20}>
        <Quote />
      </Box>
    </PageLayout>
  );
}
