// pages/magic.tsx
import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import PageLayout from "../layouts";
import useGlobalStore from "../store";
import { GITHUB_AUTH_URL } from "../utils";

export default function MagicPage() {
  const accessToken = useGlobalStore((s) => s.accessToken);
  const user = useGlobalStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    // Redirect if login
    if (user) {
      router.push("/select_repo");
    }
  }, [user]);

  return (
    <PageLayout>
      <Box>Hey! Let&apos;s see the magic</Box>
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
