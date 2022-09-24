import axios from "axios";

/**
 *
 * To fetch token balance form QuickNode API.
 */
export const fetchBalance = async (address: string): Promise<string> => {
  /*
  curl https://stylish-methodical-isle.discover.quiknode.pro/HERE_GOES_SECRET/ \
  -X POST \
  -H "Content-Type: application/json" \
  -H "x-qn-api-version: 1" \
  --data '{
    "id":67,
    "jsonrpc":"2.0",
    "method":"qn_getWalletTokenBalance",
    "params":{
      "wallet": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
    }
  }'
  */
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_QUICKNODE_MAINNET || "",
    {
      Headers: {
        "Content-Type": "application/json",
      },
      id: 67,
      jsonrpc: "2.0",
      method: "qn_getWalletTokenBalance",
      params: {
        wallet: address,
      },
    }
  );
  return data;
};
