import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import PageLayout from "../../../layouts";

export default function DaoForContract(): React.ReactNode {
  const { query } = useRouter();
  return (
    <PageLayout>
      <Heading>{query["contract"]}</Heading>
    </PageLayout>
  );
}
