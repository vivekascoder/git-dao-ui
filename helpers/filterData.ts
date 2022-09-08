import { RawRepo, RepoType } from "@/types";

export const filterData = (data: RawRepo[]): RepoType[] =>
  data.map((repo: RawRepo) => ({
    id: repo.id,
    nodeId: repo.node_id,
    fullName: repo.full_name,
    isPrivate: repo.private,
  }));