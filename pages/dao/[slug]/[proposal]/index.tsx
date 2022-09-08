// Main page for a single proposal.

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Progress,
  Text,
  Textarea,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { BigNumber, ContractInterface } from "ethers";
import { useFormik } from "formik";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBlockNumber,
  useContractRead,
  useContractWrite,
} from "wagmi";

import RadioCard from "@/components/RadioCard";

import CONFIG from "@/config";
import PageLayout from "@/layouts";
import { decodeData } from "@/utils";
import { fetchAllDAOProposals } from "@/utils/emvApi";

import { IProposal, IProposalResult, TParsedDAO } from "@/types";

const ProposalPage: NextPage<IProposal> = (props) => {
  const toast = useToast();
  const router = useRouter();
  const [proposal, setProposal] = useState<IProposalResult>();
  const [parsedDao, setParsedDao] = useState<TParsedDAO>();
  const blockNumber = useBlockNumber();

  useEffect(() => {
    setProposal(
      props.proposals.result.find(
        (p) => p.data.proposalId === router.query["proposal"]
      )
    );
    if (!router.query["slug"]) return;
    const dao: TParsedDAO = decodeData(
      router.query["slug"] as string
    ) as TParsedDAO;
    setParsedDao(dao);
  }, [proposal, router.query, props.proposals.result]);

  const options = ["against", "for", "abstain"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "voteType",
    defaultValue: options[1],
    onChange: (v: string) => {
      formik.setFieldValue("voteType", v);
    },
  });
  const group = getRootProps();

  const { address } = useAccount();

  // Wagmi Read contract hooks.
  const proposalVotes = useContractRead({
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi,
    functionName: "proposalVotes",
    args: [router.query["proposal"]],
  });
  const getWeight = useContractRead({
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi,
    functionName: "getVotes",
    args: [address, proposal?.data.startBlock],
  });
  const hasVoted = useContractRead({
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi,
    functionName: "hasVoted",
    args: [proposal?.data.proposalId, address],
  });
  const quorumTx = useContractRead({
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi,
    functionName: "quorum",
    args: [proposal?.data.startBlock],
  });
  const quorumTotalToken: BigNumber = quorumTx.data
    ? (quorumTx.data as any)
    : BigNumber.from(1);
  const againstVotes: BigNumber = proposalVotes.data
    ? proposalVotes.data[0]
    : BigNumber.from("0");
  const forVotes: BigNumber = proposalVotes.data
    ? proposalVotes.data[0]
    : BigNumber.from("0");
  // const abstainVote = proposalVotes.data
  //   ? proposalVotes.data[0].toString()
  //   : "0";

  // Formik to handle the form.
  const formik = useFormik<{ message: string; voteType: string }>({
    initialValues: {
      message: "",
      voteType: options[1],
    },
    validate(values) {
      const errors: { [key: string]: string } = {};
      if (values.message.length < 3) {
        errors.message = "Message should be atleast 3 char long.";
      }
      return errors;
    },
    onSubmit(values) {
      console.log(values);
      write();
    },
  });

  // Wagmin hook to cast a vote.
  const { data, isLoading, isSuccess, write, error } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi as ContractInterface,
    functionName: "castVoteWithReason",
    args: [
      proposal?.data.proposalId,
      options.indexOf(formik.values.voteType),
      formik.values.message,
    ],

    onError: (error) => {
      console.log(error.message);
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

  // if (!isConnected) {
  //   return (
  //     <Box>
  //       <Alert status="success">
  //         <AlertIcon />
  //         <Box>
  //           <AlertTitle>Success!</AlertTitle>
  //           <AlertDescription>
  //             Your application has been received. We will review your
  //             application and respond within the next 48 hours.
  //           </AlertDescription>
  //         </Box>
  //         <CloseButton
  //           alignSelf="flex-start"
  //           position="relative"
  //           right={-1}
  //           top={-1}
  //           // onClick={onclose}
  //         />
  //       </Alert>
  //     </Box>
  //   );
  // }

  // Render
  if (!proposal) {
    return <Box>Loading proposal...</Box>;
  }
  if (!proposalVotes.data) {
    return <Box>Loading proposal...</Box>;
  }

  return (
    <PageLayout>
      <Box mt={6}>
        <Heading size={"md"}>{"# 📜 " + proposal.data.description}</Heading>
      </Box>

      {/* Link flex headings. */}
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        mt={"2"}
      >
        <Link href={CONFIG.SCAN_URL + parsedDao?.creator}>
          <Box
            display={"inline-block"}
            borderBottomWidth={"2px"}
            borderBottomColor={"transparent"}
            _hover={{
              borderBottomWidth: "2px",
              borderBottomStyle: "dashed",
              borderBottomColor: "gray.500",
              cursor: "pointer",
            }}
          >
            <Box display={"flex"} alignItems="center" experimental_spaceX={2}>
              {/* <InfoOutlineIcon color={"gray.500"} /> */}
              <Text>
                <strong>DAO:</strong>
              </Text>
              <Text textColor={"gray.500"} size={"xs"}>
                {parsedDao?.gitUrl}
              </Text>
            </Box>
          </Box>
        </Link>

        <Link href={CONFIG.SCAN_URL + proposal.data.proposer}>
          <Box
            display={"inline-block"}
            borderBottomWidth={"2px"}
            borderBottomColor={"transparent"}
            _hover={{
              borderBottomWidth: "2px",
              borderBottomStyle: "dashed",
              borderBottomColor: "gray.500",
              cursor: "pointer",
            }}
          >
            <Box display={"flex"} alignItems="center" experimental_spaceX={2}>
              {/* <InfoOutlineIcon color={"gray.500"} /> */}
              <Text>
                <strong>Proposer:</strong>
              </Text>
              <Text textColor={"gray.500"} size={"xs"}>
                {proposal.data.proposer.slice(0, 4) +
                  "..." +
                  proposal.data.proposer.slice(
                    proposal.data.proposer.length - 4
                  )}
              </Text>
            </Box>
          </Box>
        </Link>
      </Box>

      <Box mt={4}>
        <Text>
          Voting Period:
          {proposalVotes.isLoading}
        </Text>
        <Progress
          hasStripe
          borderRadius={"sm"}
          colorScheme="yellow"
          value={
            blockNumber.data
              ? Math.floor(
                  (blockNumber.data - parseInt(proposal.data.startBlock)) /
                    (parseInt(proposal.data.endBlock) -
                      parseInt(proposal.data.startBlock))
                )
              : 0
          }
        />
      </Box>

      {/* For Votes Progress. */}
      <Box mt={4}>
        <Text>For Votes</Text>
        <Progress
          hasStripe
          borderRadius={"sm"}
          colorScheme="green"
          value={Math.floor(
            parseInt(
              forVotes.mul(BigNumber.from(100)).div(quorumTotalToken).toString()
            )
          )}
        />
      </Box>

      {/* For Agains Progress. */}
      <Box mt={4}>
        <Text>For Votes</Text>
        <Progress
          hasStripe
          borderRadius={"sm"}
          colorScheme="red"
          value={Math.floor(
            parseInt(
              againstVotes
                .mul(BigNumber.from(100))
                .div(quorumTotalToken)
                .toString()
            )
          )}
        />
      </Box>
      {!hasVoted.data ? (
        <Box
          mt={4}
          pt={4}
          // display={"flex"}
          // justifyContent="space-between"
          // alignItems={"center"}
          borderTopWidth="2px"
          borderTopStyle={"dashed"}
          borderTopColor="gray.400"
        >
          {/* <Box display={"flex"} experimental_spaceX={"3"}>
            <Text display={"inline-block"}>
              Your vote weight:{" "}
              <strong>
                {getWeight.data?.toString() || "❌ Connect wallet"}
              </strong>
            </Text>
          </Box>
          <Button colorScheme={"blue"}>🗳 Vote</Button> */}
          <form onSubmit={formik.handleSubmit}>
            <Heading size={"md"}>{"# 🗳 Vote on proposal"}</Heading>
            <Box experimental_spaceY={3}>
              <FormControl mt="4">
                <FormLabel htmlFor="message">
                  🦄 Description for your vote.
                </FormLabel>
                <Textarea
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
                <FormHelperText>
                  {formik.errors.message ? "" + formik.errors.message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl mt={3} mb={6}>
                <Text mb={1}>🗃 Vote Type:</Text>
                <HStack {...group}>
                  {options.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    );
                  })}
                </HStack>
              </FormControl>
              <Box>
                <Button type="submit" colorScheme={"blue"}>
                  🗳 Vote
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      ) : (
        ""
      )}
    </PageLayout>
  );
};

export default ProposalPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query["slug"]) {
    // FIX: Don't send array, bitch.
    return { props: { proposals: [] } };
  }
  const parsedDao = decodeData(context.query["slug"] as string) as TParsedDAO;
  const events = await fetchAllDAOProposals(parsedDao.dao);
  return {
    props: {
      proposals: events,
    },
  };
};
