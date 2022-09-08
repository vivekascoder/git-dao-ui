import { Box } from "@chakra-ui/react";

import GithubRepoSearch from "../components/GithubRepoSearch";
import PageLayout from "../layouts";
import useGlobalStore from "../store";

export default function SelectRepoPage() {
  const accessToken = useGlobalStore((s) => s.accessToken);

  return (
    <PageLayout>
      <Box>Authorized {accessToken}</Box>
      <Box>
        <GithubRepoSearch />
      </Box>
    </PageLayout>
  );
}
