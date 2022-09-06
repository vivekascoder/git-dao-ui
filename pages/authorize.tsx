// pages/authorize.tsx
import { Box } from "@chakra-ui/react";

import Auth from "../components/Auth";
import PageLayout from "../layouts";

export default function authorize(): React.ReactNode {
  return (
    <PageLayout>
      <Auth />
      <Box>REdirecting...</Box>
    </PageLayout>
  );
}
