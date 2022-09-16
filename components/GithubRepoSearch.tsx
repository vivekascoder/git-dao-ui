import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useFetchUserRepositories from "@/hooks/useFetchUserRepositories";

import useGlobalStore from "../store";
import { IRepoItem, RepoType } from "../types";

export default function GithubRepoSearch() {
  const [repos, setRepos] = useState<RepoType[]>([]);

  const setSelectedRepo = useGlobalStore((s) => s.setSelectedRepo);

  const { data } = useFetchUserRepositories();

  useEffect(() => {
    if (data) {
      setRepos(data as RepoType[]);
    }
  }, [data]);

  const router = useRouter();

  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Repository name"
          onChange={(e) => {
            if (e.target.value) {
              const repo = (data as RepoType[]).filter((repo) =>
                repo.fullName.toLowerCase().includes(e.target.value)
              );
              setRepos(repo);
            } else {
              setRepos(data as RepoType[]);
            }
          }}
        />
      </InputGroup>

      {/* List of repos */}
      <Box
        maxHeight="20rem"
        overflowY={"scroll"}
        // backgroundColor={"#1a294b"}
        shadow={"sm"}
        p={3}
        borderBottomRadius={3}
      >
        {repos.map((repo: RepoType, id: number) => (
          <RepoItem
            repo={repo}
            key={id}
            onClick={(repo: RepoType) => {
              setSelectedRepo(repo);
              router.push("/create");
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

const RepoItem: React.FunctionComponent<IRepoItem> = (props) => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"space-between"}
      py={3}
    >
      <Text fontWeight={"semibold"} fontSize="1.2rem">
        {props.repo.fullName}
      </Text>
      <Button
        colorScheme={"blue"}
        onClick={() => {
          props.onClick(props.repo);
        }}
      >
        Create
      </Button>
    </Box>
  );
};
