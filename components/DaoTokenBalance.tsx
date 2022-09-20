import { Stack, Text } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";

interface IDaoTokenBalanceProps {
  tokenAddress?: string;
}

const DaoTokenBalance: React.FC<IDaoTokenBalanceProps> = ({ tokenAddress }) => {
  const { address } = useAccount();
  // const token = useToken({ address: tokenAddress });
  const balance = useBalance({ addressOrName: address, token: tokenAddress });
  // console.log(address, token.data, balance.data);

  return balance.data ? (
    <Stack
      background={"white"}
      direction="row"
      spacing={4}
      alignItems={"center"}
      justifyContent="start"
      shadow={"lg"}
      py={2}
      pl={3}
      pr={5}
      borderRadius={"full"}
    >
      <Text>
        🤑: {balance.data.formatted} <strong>${balance.data.symbol}</strong>
      </Text>
    </Stack>
  ) : (
    <Stack></Stack>
  );
};

export default DaoTokenBalance;
