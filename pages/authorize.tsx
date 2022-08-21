// pages/authorize.tsx
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageLayout from "../layouts";
import { fetchTokenInfo } from "../utils";

export default function authorize(): React.ReactNode {
  const router = useRouter();
  useEffect(() => {
    fetchTokenInfo(router.query["code"] as string);
  }, []);
  return (
    <PageLayout>
      <Box>REdirecting...</Box>
    </PageLayout>
  );
}
