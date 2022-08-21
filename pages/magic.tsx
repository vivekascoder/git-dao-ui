// pages/magic.tsx
import { Box, Button } from "@chakra-ui/react";
import PageLayout from "../layouts";
import Link from "next/link";
import { GITHUB_AUTH_URL } from "../utils";

export default function magic() {
  return (
    <PageLayout>
      <Box>Hey! Let's see the magic</Box>
      <Link href={GITHUB_AUTH_URL}>
        <Button colorScheme="blue">Login with Github</Button>
      </Link>
    </PageLayout>
  );
}
