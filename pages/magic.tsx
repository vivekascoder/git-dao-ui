// pages/magic.tsx
import { Box, Button } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import Link from "next/link";

import { getAccessToken } from "@/helpers/getAccessToken";

import CONFIG from "@/config";

import PageLayout from "../layouts";

import useGlobalStore from "../store";


export default function MagicPage() {
  return (
    <PageLayout>
      <Box>Hey! Let&apos;s see the magic</Box>

      <Link href={GITHUB_AUTH_URL}>
        <Button colorScheme="blue">Login with Github</Button>
      </Link>
      {/**
      {!user ? (
        <Link href={CONFIG.GITHUB_AUTH_URL}>
          <Button colorScheme="blue">Login with Github</Button>
        </Link>
      ) : (
        <Text>User is already logged int</Text>
      )}
      <p>Token: {accessToken}</p>
      **/}
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
