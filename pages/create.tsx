import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PageLayout from "../layouts";

export default function create() {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const fetchUserRepositories = async () => {
      const { data } = await axios.get(`https://api.github.com/user/repos`, {
        headers: {
          Authorization: `token ${document.cookie.replace(
            "access_token=",
            ""
          )}`,
        },
      });
      setRepos(data);
    };
    fetchUserRepositories();
  }, []);
  return (
    <PageLayout>
      <Box>Authorized</Box>
      <div></div>
    </PageLayout>
  );
}
