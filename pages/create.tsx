import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";

import CreateDAOForm from "../components/CreateDAOForm";
import SelectedRepoBadge from "../components/SelectedRepoBadge";
import PageLayout from "../layouts";
import useGlobalStore from "../store";

export default function CreatePage() {
  const repo = useGlobalStore((s) => s.selectedRepo);
  const router = useRouter();
  useEffect(() => {
    if (!repo) {
      router.push("/select_repo");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <PageLayout>
      <Box>
        <Breadcrumbs />
      </Box>
      <SelectedRepoBadge repo={repo} />
      <CreateDAOForm repo={repo} />
    </PageLayout>
  );
}
