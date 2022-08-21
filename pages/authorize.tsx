// pages/authorize.tsx
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Auth from "../components/Auth";
import PageLayout from "../layouts";
import { fetchTokenInfo } from "../utils";

export default function authorize(): React.ReactNode {
  return (
    <PageLayout>
      <Auth />
      <Box>REdirecting...</Box>
    </PageLayout>
  );
}
