import {
  Box,
  Button,
  filter,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import useGlobalStore from "../store";
import { UserInfo } from "../utils/github";
import { useRouter } from "next/router";

export type RepoType = {
  id: number;
  nodeId: string;
  fullName: string;
  isPrivate: boolean;
};

const filterData = (data: any): RepoType[] =>
  data.map((repo: any) => ({
    id: repo.id,
    nodeId: repo.node_id,
    fullName: repo.full_name,
    isPrivate: repo.private,
  }));

const fetchUserRepositories = async (
  accessToken: string
): Promise<RepoType[]> => {
  const { data } = await axios.get(
    `https://api.github.com/user/repos?affiliation=owner`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    }
  );
  return filterData(data);
};

const searchInUserRepos = async (
  q: string,
  user: UserInfo,
  accessToken: string
): Promise<RepoType[]> => {
  console.log("searching", user);
  const queryString = "q=" + encodeURIComponent(`user:${user.username} ${q}`);
  try {
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?${queryString}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${accessToken}`,
        },
      }
    );
    console.log("Searched", data);
    return filterData(data.items);
  } catch (e) {
    return [];
  }
};

// T is a generic type for value parameter, our case this will be string
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
interface IRepoItem {
  repo: RepoType;
  onClick: (repo: RepoType) => void;
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

export default function GithubRepoSearch() {
  const [repos, setRepos] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const debounceSearchTerm = useDebounce<string>(searchTerm, 1000);

  // Global state stuff.
  const user = useGlobalStore((s) => s.user);
  const accessToken = useGlobalStore((s) => s.accessToken);
  const setSelectedRepo = useGlobalStore((s) => s.setSelectedRepo);

  useEffect(() => {
    if (debounceSearchTerm && user) {
      setSearching(true);
      (async () => {
        const data = await searchInUserRepos(
          debounceSearchTerm,
          user,
          accessToken as string
        );
        setSearching(false);
        setRepos(data);
      })();
    }
  }, [debounceSearchTerm]);

  useEffect(() => {
    async function doo() {
      const data = await fetchUserRepositories(accessToken as string);
      console.log(data);
      setRepos(data);
    }
    if (accessToken) {
      doo();
    }
  }, [accessToken]);
  const router = useRouter();

  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="search"
          placeholder="Repository name"
          onChange={(e) => {
            setSearchTerm(e.target.value);
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
