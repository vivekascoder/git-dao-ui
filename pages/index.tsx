import Nav from "../components/Nav";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import SexyBtn from "../components/SexyBtn";

/**
 *  Responsible for skeleton of the site.
 */
export default function Home(): React.ReactNode {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      <Nav />

      {/* Main content section */}
      <Box maxWidth={"40rem"} marginX={"auto"}>
        {/* Section for tagline */}
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
            and build economy around it and start supporting and growing your
            open source projects.
          </Text>
          <Flex justifyContent="center" alignItems="center" mt={8}>
            <SexyBtn />
          </Flex>
        </Box>
      </Box>
    </div>
  );
}
