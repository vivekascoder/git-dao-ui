import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { ContractInterface, ethers } from "ethers";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useContract } from "wagmi";
import CONFIG from "../config";
import { BigNumber } from "ethers";

export interface IInputControl {
  name: string;
  label: string;
}

export default function CreateDAOForm() {
  const [daoTokenName, setDAOTokenName] = useState<string>("");
  const [daoTokenSymbol, setDAOTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [minDelay, setMinDelay] = useState<string>("");
  const [quoromPercentage, setQuoromPercentage] = useState<string>("");
  const [votingPeriod, setVotingPeriod] = useState<string>("");
  const [votingDelay, setVotingDelay] = useState<string>("");

  const tokenSupplyWithDecimals = BigNumber.from(tokenSupply).mul(
    BigNumber.from(ethers.utils.parseEther("1"))
  );
  const { data, isLoading, isSuccess, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: CONFIG.CONTRACTS.DAO_FACTORY,
    contractInterface: CONFIG.INTERFACES.DAO_FACTORY.abi as ContractInterface,
    functionName: "createDAO",
    args: [
      daoTokenName,
      daoTokenSymbol,
      tokenSupplyWithDecimals,
      minDelay,
      quoromPercentage,
      votingPeriod,
      votingDelay,
    ],
  });
  // TODO: Use formik
  const handleSubmit = () => {
    write();
  };

  return (
    <FormControl
      as="form"
      p={4}
      my={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="1px 1px 3px rgba(0,0,0,0.3)"
      onSubmit={handleSubmit}
    >
      <Box>
        <Heading textAlign={"center"} mb={4}>
          Create ⚖️ DAO
        </Heading>
      </Box>
      <Box display={"flex"}>
        <Box mb={4} width="full" mr={3}>
          <FormLabel htmlFor={"name"}>DAO Token name</FormLabel>
          <Input
            name="daoToken"
            type={"text"}
            value={daoTokenName}
            onChange={(e) => setDAOTokenName(e.target.value)}
            placeholder={"Super DAO token"}
          />
        </Box>
        <Box mb={4} width="full">
          <FormLabel htmlFor={"name"}>DAO Token symbol</FormLabel>
          <Input
            name="daoTokenSymbol"
            type={"text"}
            value={daoTokenSymbol}
            onChange={(e) => setDAOTokenSymbol(e.target.value)}
            placeholder={"SDT"}
          />
        </Box>
      </Box>
      <Box mb={4}>
        <FormLabel htmlFor={"name"}>DAO Token Supply</FormLabel>
        <Input
          name="daoTokenSupply"
          type={"text"}
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
        />
      </Box>
      <Box display={"flex"}>
        <Box mb={4} mr={3} width="full">
          <FormLabel htmlFor={"name"}>Min Delay</FormLabel>
          <Input
            name="minDelay"
            type={"text"}
            value={minDelay}
            onChange={(e) => setMinDelay(e.target.value)}
          />
        </Box>
        <Box mb={4} width="full">
          <FormLabel htmlFor={"name"}>Quorum Percentage</FormLabel>
          <Input
            name="quoromPercentage"
            type={"text"}
            value={quoromPercentage}
            onChange={(e) => setQuoromPercentage(e.target.value)}
          />
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box mb={4} mr={3} width="full">
          <FormLabel htmlFor={"name"}>Voting Period</FormLabel>
          <Input
            name="votingPeriod"
            type={"text"}
            value={votingPeriod}
            onChange={(e) => setVotingPeriod(e.target.value)}
          />
        </Box>
        <Box mb={4} width="full">
          <FormLabel htmlFor={"name"}>Voting Delay</FormLabel>
          <Input
            name="votingDelay"
            type={"text"}
            value={votingDelay}
            onChange={(e) => setVotingDelay(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Button
          colorScheme={"blue"}
          disabled={!write}
          onClick={() => write?.()}
        >
          🚀 Create
        </Button>
      </Box>
      <p>{JSON.stringify(data, null, 2)}</p>
    </FormControl>
  );
}
