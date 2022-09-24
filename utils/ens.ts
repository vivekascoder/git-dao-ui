import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_QUICKNODE_MAINNET
);

export const resolve = async (ens: string): Promise<string | null> => {
  return provider.resolveName(ens);
};
