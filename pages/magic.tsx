// pages/magic.tsx
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import Link from "next/link";

import useGetAuthenticatedUser from "@/hooks/useGetAuthenticatedUser";

import Breadcrumbs from "@/components/Breadcrumbs";

import CONFIG from "@/config";
import { getAccessToken } from "@/helpers/getAccessToken";

import PageLayout from "../layouts";

export default function MagicPage() {
  const { data: user } = useGetAuthenticatedUser();
  return (
    <PageLayout>
      <Box>
        <Breadcrumbs />
      </Box>
      <Text fontSize={"3xl"} fontWeight={"black"} align="center">
        # Login with github to see 🎩 magic
      </Text>
      <Text align="center" px="4rem" color={"gray.600"}>
        Login with Github and see the magic to selecting repo and creating DAO
        for them. We offer a simple widget to select repo and create DAO for it.
      </Text>
      {!user ? (
        <HStack justifyContent={"center"} mt={4}>
          <Link href={CONFIG.GITHUB_AUTH_URL}>
            <Button colorScheme="blue">🎩 Login with Github</Button>
          </Link>
        </HStack>
      ) : (
        <Text fontSize={"3xl"}>User is already logged int</Text>
      )}
    </PageLayout>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { req } = context;
  const accessToken = getAccessToken(req as NextApiRequest);

  if (accessToken) {
    return {
      props: {},
      redirect: {
        destination: "/select_repo",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
