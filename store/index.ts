import create from "zustand";

import { RepoType, UserInfo } from "../types";

export type OptionalString = string | null;
export interface StoreInterface {
  user: null | UserInfo;
  accessToken: OptionalString;
  selectedRepo: RepoType | null;
  setUser: (u: UserInfo | null) => void;
  setAccessToken: (t: OptionalString) => void;
  setSelectedRepo: (r: RepoType) => void;
}

const useGlobalStore = create<StoreInterface>((set) => ({
  user: null,
  accessToken: null,
  selectedRepo: null,

  setUser: (u: UserInfo | null) => set(() => ({ user: u })),
  setAccessToken: (t) => set({ accessToken: t }),
  setSelectedRepo: (r: RepoType) => set({ selectedRepo: r }),
}));

export default useGlobalStore;
