import { Box } from "@chakra-ui/react";
import CreateDAOForm from "../components/CreateDAOForm";
import SelectedRepoBadge from "../components/SelectedRepoBadge";
import PageLayout from "../layouts";
import useGlobalStore from "../store";

export default function create() {
  const repo = useGlobalStore((s) => s.selectedRepo);
  return (
    <PageLayout>
      <SelectedRepoBadge repo={repo} />
      <CreateDAOForm repo={repo} />
    </PageLayout>
  );
}
