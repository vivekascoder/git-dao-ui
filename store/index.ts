import create from "zustand";

interface StoreInterface {
  username: null | string;
  accessToken: null | string;
  setUsername: (u: string | null) => void;
  setAccessToken: (t: string | null) => void;
}

const useStore = create<StoreInterface>((set) => ({
  username: null,
  accessToken: null,
  setUsername: (u) => set((state) => ({ username: u })),
  setAccessToken: (t) => set(() => ({ accessToken: t })),
}));

export default useStore;
