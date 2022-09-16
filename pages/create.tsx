import { useRouter } from "next/router";
import { useEffect } from "react";

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
  }, []);
  return (
    <PageLayout>
      <SelectedRepoBadge repo={repo} />
      <CreateDAOForm repo={repo} />
    </PageLayout>
  );
}
