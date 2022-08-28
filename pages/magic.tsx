// pages/magic.tsx
import { Box, Button, Text } from "@chakra-ui/react";
import PageLayout from "../layouts";
import Link from "next/link";
import { GITHUB_AUTH_URL } from "../utils";
import useGlobalStore from "../store";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function magic() {
  const accessToken = useGlobalStore((s) => s.accessToken);
  const user = useGlobalStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    // Redirect if login
    if (user) {
      router.push("/create");
    }
  }, [user]);

  return (
    <PageLayout>
      <Box>Hey! Let's see the magic</Box>
      {!user ? (
        <Link href={GITHUB_AUTH_URL}>
          <Button colorScheme="blue">Login with Github</Button>
        </Link>
      ) : (
        <Text>User is already logged int</Text>
      )}
      <p>Token: {accessToken}</p>
    </PageLayout>
  );
}
