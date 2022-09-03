import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageLayout from "../../../layouts";

export default function DaoForContract(props): React.ReactNode {
  const router = useRouter();
  return (
    <PageLayout>
      <Heading>{router.query["contract"]}</Heading>
      <Box>
        <Button
          rightIcon={<ArrowForwardIcon />}
          width={"full"}
          size={"sm"}
          onClick={() => {
            router.push({
              pathname: "/dao/[contract]/create_proposal",
              query: { contract: router.query["contract"] },
            });
          }}
        >
          Create new proposal
        </Button>
      </Box>
      <Box>{/* List all the proposals. */}</Box>
    </PageLayout>
  );
}
