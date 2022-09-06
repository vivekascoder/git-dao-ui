import { Box } from "@chakra-ui/react";
import { useState } from "react";

import GithubRepoSearch from "../components/GithubRepoSearch";
import PageLayout from "../layouts";
import useGlobalStore from "../store";

export default function SelectRepoPage() {
  const [repos, setRepos] = useState([]);
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
