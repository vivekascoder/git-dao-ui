import { Box } from "@chakra-ui/react";

import Breadcrumbs from "@/components/Breadcrumbs";
import GithubRepoSearch from "@/components/GithubRepoSearch";

import PageLayout from "../layouts";

export default function SelectRepoPage() {
  return (
    <PageLayout>
      {/* <Box>Authorized {accessToken}</Box> */}
      <Box>
        <Breadcrumbs />
      </Box>
      <Box>
        <GithubRepoSearch />
      </Box>
    </PageLayout>
  );
}
