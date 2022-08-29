import { Box } from "@chakra-ui/react";
import CreateDAOForm from "../components/CreateDAOForm";
import PageLayout from "../layouts";

export default function create() {
  return (
    <PageLayout>
      <Box>Hey! Howdy mate.</Box>
      <CreateDAOForm />
    </PageLayout>
  );
}
