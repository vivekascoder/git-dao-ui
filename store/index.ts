import create from "zustand";
import { UserInfo } from "../utils/github";

export type OptionalString = string | null;
interface StoreInterface {
  user: null | UserInfo;
  accessToken: OptionalString;
  setUser: (u: UserInfo | null) => void;
  setAccessToken: (t: OptionalString) => void;
}

const useGlobalStore = create<StoreInterface>((set) => ({
  user: null,
  accessToken: null,
  setUser: (u: UserInfo | null) => set(() => ({ user: u })),

  // Set the accessToken
  setAccessToken: (t) => set({ accessToken: t }),
}));

export default useGlobalStore;
