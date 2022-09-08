import create from "zustand";

import { RepoType, } from "../types";

export type OptionalString = string | null;
export interface StoreInterface {
  accessToken: OptionalString;
  selectedRepo: RepoType | null;
  setAccessToken: (t: OptionalString) => void;
  setSelectedRepo: (r: RepoType) => void;
}

const useGlobalStore = create<StoreInterface>((set) => ({
  user: null,
  accessToken: null,
  selectedRepo: null,

  setAccessToken: (t) => set({ accessToken: t }),
  setSelectedRepo: (r: RepoType) => set({ selectedRepo: r }),
}));

export default useGlobalStore;
