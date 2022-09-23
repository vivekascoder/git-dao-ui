import { Box, Heading, Text } from "@chakra-ui/react";

interface ITreasuryStats {
  tokenSupply: string;
  tokenSymbol: string;
  treasuryBalance: string;
  treasuryPercent: string;
}

const TreasuryStats: React.FC<ITreasuryStats> = (props) => {
  return (
    <Box display="flex" mt={4}>
      <Box flexGrow={"1"}>
        <Heading size={"md"} mb={2} mt={6}>
          # 💵 Treasury Stats
        </Heading>
        <Text>
          + Total Supply:{" "}
          <strong>{props.tokenSupply + " " + props.tokenSymbol}</strong>
        </Text>
        <Text>
          + Treasury Balance:{" "}
          <strong>{props.treasuryBalance + " " + props.tokenSymbol}</strong>
        </Text>
        <Text>
          + Percentage of total supply in treasury:{" "}
          <strong>{props.treasuryPercent + "%"}</strong>
        </Text>
      </Box>
      <div
        className="pie"
        // style={{ "--p": "60", "--c": "darkblue", "--b": "10px" }}
        // @ts-ignore
        style={{ "--p": props.treasuryPercent }}
        data-size="50"
      >
        {" "}
        {props.treasuryPercent}%
      </div>
    </Box>
  );
};
export default TreasuryStats;
