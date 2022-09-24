// Main page for a single proposal.

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BigNumber, ContractInterface, ethers } from "ethers";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBlockNumber,
  useContractRead,
  useContractWrite,
} from "wagmi";

import Breadcrumbs from "@/components/Breadcrumbs";
import DaoTokenBalance from "@/components/DaoTokenBalance";
import VoteForm from "@/components/Forms/Vote";
import PrettyLink from "@/components/PrettyLink";

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

  const { address } = useAccount();

  // Wagmi Read contract hooks.
  const proposalVotes = useContractRead({
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi,
    functionName: "proposalVotes",
    args: [router.query["proposal"]],
  });

  // Get Weight Tranasction
  // const getWeight = useContractRead({
  //   addressOrName: parsedDao?.dao || "",
  //   contractInterface: CONFIG.INTERFACES.DAO.abi,
  //   functionName: "getVotes",
  //   args: [address, proposal?.data.startBlock],
  // });

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
  const proposalStateTx = useContractRead({
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi,
    functionName: "state",
    args: [proposal?.data.proposalId],
  });
  const proposalState =
    CONFIG.PROPOSAL_STATE[
      proposalStateTx.data ? (proposalStateTx.data as unknown as number) : 0
    ];

  const quorumTotalToken: BigNumber = quorumTx.data
    ? (quorumTx.data as any)
    : BigNumber.from(1);
  const againstVotes: BigNumber = proposalVotes.data
    ? proposalVotes.data[0]
    : BigNumber.from("0");
  const forVotes: BigNumber = proposalVotes.data
    ? proposalVotes.data[1]
    : BigNumber.from("0");

  /**
   * WAGMI WRITE CONTRACT HOOKS
   */

  const queueTx = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi as ContractInterface,
    functionName: "queue",
    args: [
      proposal?.data.targets,
      proposal?.data.values,
      proposal?.data.calldatas,
      ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(proposal?.data.description || "")
      ),
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
        title: "Queue transaction sent.",
        description: "Hash: " + data.hash,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });

  const executeTx = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi as ContractInterface,
    functionName: "execute",
    args: [
      proposal?.data.targets,
      proposal?.data.values,
      proposal?.data.calldatas,
      ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(proposal?.data.description || "")
      ),
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
        title: "Queue transaction sent.",
        description: "Hash: " + data.hash,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });

  // Render
  if (!proposal) {
    return <Box>Loading proposal...</Box>;
  }
  if (!proposalVotes.data) {
    return <Box>Loading proposal...</Box>;
  }

  return (
    <PageLayout>
      <Box position={"fixed"} bottom="3" right={"4"} zIndex="50">
        <DaoTokenBalance tokenAddress={parsedDao?.daoToken} />
      </Box>
      <Box mb={4}>
        <Breadcrumbs />
      </Box>

      <Box my={8}>
        <Alert
          status={CONFIG.PROPOSAL_ALERT_INFO[proposalState][0]}
          variant="top-accent"
        >
          <AlertIcon />
          {CONFIG.PROPOSAL_ALERT_INFO[proposalState][1]}
        </Alert>
      </Box>
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
        <PrettyLink
          href={CONFIG.SCAN_URL + "address/" + parsedDao?.creator}
          title="DAO:"
          content={parsedDao ? parsedDao.gitUrl : ""}
        />
        <PrettyLink
          href={CONFIG.SCAN_URL + "address/" + proposal.data.proposer}
          title="Proposer:"
          content={
            proposal.data.proposer.slice(0, 4) +
            "..." +
            proposal.data.proposer.slice(proposal.data.proposer.length - 4)
          }
        />
      </Box>

      <Box
        mt={14}
        pt={4}
        borderTopWidth="2px"
        borderTopStyle={"dashed"}
        borderTopColor="gray.400"
      >
        <Heading size={"md"} mt={6}>
          {"# Proposal vote stats."}
        </Heading>
        <Box mt={4}>
          <Text>
            <strong> Voting Period:</strong>
          </Text>
          <Progress
            hasStripe
            borderRadius={"sm"}
            colorScheme="yellow"
            value={
              blockNumber.data
                ? Math.floor(
                    ((blockNumber.data - parseInt(proposal.data.startBlock)) /
                      (parseInt(proposal.data.endBlock) -
                        parseInt(proposal.data.startBlock))) *
                      100
                  )
                : 0
            }
          />
        </Box>

        {/* For Votes Progress. */}
        <Box mt={4}>
          <Text>
            <strong>For Votes:</strong>{" "}
            {proposalVotes.data[1].div(ethers.utils.parseEther("1")) +
              "/" +
              quorumTotalToken.div(ethers.utils.parseEther("1"))}
          </Text>
          <Progress
            hasStripe
            borderRadius={"sm"}
            colorScheme="green"
            value={parseFloat(
              forVotes.mul(BigNumber.from(100)).div(quorumTotalToken).toString()
            )}
          />
        </Box>

        {/* For Against Progress. */}
        <Box mt={4}>
          <Text>
            <strong>Agains Votes</strong>:{" "}
            {proposalVotes.data[0].div(ethers.utils.parseEther("1")) +
              "/" +
              quorumTotalToken.div(ethers.utils.parseEther("1"))}
          </Text>
          <Progress
            hasStripe
            borderRadius={"sm"}
            colorScheme="red"
            value={parseFloat(
              againstVotes
                .mul(BigNumber.from(100))
                .div(quorumTotalToken)
                .toString()
            )}
          />
        </Box>
      </Box>

      <Box
        mt={14}
        pt={4}
        borderTopWidth="2px"
        borderTopStyle={"dashed"}
        borderTopColor="gray.400"
      >
        <Heading size={"md"} mb={4}>
          {"# 🗳 Vote on proposal"}
        </Heading>

        {!hasVoted.data ? (
          <VoteForm
            proposalId={proposal.data.proposalId}
            dao={parsedDao?.dao || ""}
          />
        ) : (
          <Box>
            <Text>You&apos;ve already voted so you can&apos;t vote again.</Text>
          </Box>
        )}
      </Box>

      <Box
        mt={14}
        pt={4}
        borderTopWidth="2px"
        borderTopStyle={"dashed"}
        borderTopColor="gray.400"
      >
        <Heading size={"md"} mb={4}>
          {"# ⛓ Queue the proposal"}
        </Heading>
        <Text mb={4}>
          When you queue the proposal the proposal can be executed anytime after
          the <strong>MIN_DELAY</strong> which you&apos;ve specified during
          creating the DAO which represents the min. time the proposal needs to
          wait after getting into queue to be executed.
        </Text>

        {proposalState === "Queued" ||
        proposalState === "Executed" ||
        proposalState === "Canceled" ||
        proposalState === "Defeated" ||
        proposalState === "Expired" ||
        proposalState === "Pending" ? (
          <Text>
            <strong>The proposal is already {proposalState}.</strong>
          </Text>
        ) : (
          <Button
            colorScheme={"blue"}
            onClick={() => {
              queueTx.write();
            }}
          >
            🦆 Queue
          </Button>
        )}
      </Box>
      <Box
        mt={14}
        pt={4}
        borderTopWidth="2px"
        borderTopStyle={"dashed"}
        borderTopColor="gray.400"
        mb={200}
      >
        <Heading size={"md"} mb={4}>
          {"# 🚀 Execute the proposal"}
        </Heading>
        <Text mb={4}>
          Once you&apos;ve waited for the MIN_DELAY then you can execute the
          proposal by click on the following button and it will execute the
          proposal for you.
        </Text>
        {proposalState === "Executed" ||
        proposalState === "Canceled" ||
        proposalState === "Defeated" ||
        proposalState === "Expired" ||
        proposalState === "Pending" ? (
          <Text>
            <strong>The proposal is already {proposalState}.</strong>
          </Text>
        ) : (
          <Button
            colorScheme={"green"}
            onClick={() => {
              executeTx.write();
            }}
          >
            ✅ Execute
          </Button>
        )}
      </Box>
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
