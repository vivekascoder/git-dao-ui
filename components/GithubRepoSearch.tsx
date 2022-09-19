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
    console.log("Data >>> ", data);
    if (data) {
      setRepos(data as RepoType[]);
    }
  }, [data]);

  const router = useRouter();

  return (
    <Box p="6">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          background={"white"}
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
        maxHeight="30rem"
        overflowY={"scroll"}
        // backgroundColor={"#1a294b"}
        borderBottomRadius={3}
        borderBottomWidth={"1px"}
        borderLeftWidth={"1px"}
        borderRightWidth={"1px"}
        mt={-2}
        pt={2}
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
      p="4"
      _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
    >
      <Text fontWeight={"semibold"} fontSize="1rem">
        {props.repo.fullName}
      </Text>
      <Button
        colorScheme={"blue"}
        onClick={() => {
          props.onClick(props.repo);
        }}
        size={"sm"}
      >
        Create
      </Button>
    </Box>
  );
};
