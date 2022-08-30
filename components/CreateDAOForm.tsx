import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
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
  const [tokenSupply, setTokenSupply] = useState<string>(
    CONFIG.DEFAULT_VALUES.SUPPLY
  );
  const [minDelay, setMinDelay] = useState<string>(
    CONFIG.DEFAULT_VALUES.MIN_DELAY
  );
  const [quoromPercentage, setQuoromPercentage] = useState<string>(
    CONFIG.DEFAULT_VALUES.QUORAM_PERCENTAGE
  );
  const [votingPeriod, setVotingPeriod] = useState<string>(
    CONFIG.DEFAULT_VALUES.VOTING_PERIOD
  );
  const [votingDelay, setVotingDelay] = useState<string>(
    CONFIG.DEFAULT_VALUES.VOTING_DELAY
  );

  const tokenSupplyWithDecimals = BigNumber.from(tokenSupply || "0").mul(
    BigNumber.from(ethers.utils.parseEther("1"))
  );
  const { data, isLoading, isSuccess, write, error } = useContractWrite({
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
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    },
    onSuccess(data) {
      toast({
        title: "Transaction Sent",
        description: "Hash: " + data.hash,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });

  const toast = useToast();

  // TODO: Use formik
  const handleSubmit = () => {
    write();
    console.log(">>> Yayy!");
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
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          🚀 Create
        </Button>
      </Box>
    </FormControl>
  );
}
