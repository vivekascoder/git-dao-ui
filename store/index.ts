import create from "zustand";

import { RepoType } from "../types";

export type OptionalString = string | null;
export interface StoreInterface {
  accessToken: OptionalString;
  selectedRepo: RepoType | null;
  txModal: { isOpen: boolean; txHash: string; confirmed: boolean };
  setAccessToken: (t: OptionalString) => void;
  setSelectedRepo: (r: RepoType) => void;
  toggleTxModal: () => void;
  setTxHash: (hash: string) => void;
  setTxConfirmed: (b: boolean) => void;
  resetTxModal: () => void;
}

const useGlobalStore = create<StoreInterface>((set) => ({
  // Defaults
  user: null,
  accessToken: null,
  selectedRepo: null,
  txModal: { isOpen: false, txHash: "", confirmed: false },

  // Funcitons
  setAccessToken: (t) => set({ accessToken: t }),
  setSelectedRepo: (r: RepoType) => set({ selectedRepo: r }),
  toggleTxModal: () =>
    set((s) => ({
      txModal: { ...s.txModal, isOpen: !s.txModal.isOpen },
    })),
  setTxHash: (hash: string) =>
    set((s) => ({
      txModal: { ...s.txModal, txHash: hash },
    })),
  setTxConfirmed: (b: boolean) =>
    set((s) => ({
      txModal: { ...s.txModal, confirmed: b },
    })),
  resetTxModal: () =>
    set({ txModal: { isOpen: false, txHash: "", confirmed: false } }),
}));

export default useGlobalStore;
