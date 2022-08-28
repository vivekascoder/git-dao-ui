import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import GithubRepoSearch from "../components/GithubRepoSearch";
import PageLayout from "../layouts";
import useGlobalStore from "../store";

export default function create() {
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
