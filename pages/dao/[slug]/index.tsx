import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { BigNumber, ContractInterface, ethers } from "ethers";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

import Breadcrumbs from "@/components/Breadcrumbs";
import DaoTokenBalance from "@/components/DaoTokenBalance";
import ListItem from "@/components/ListItem";
import PrettyLink from "@/components/PrettyLink";
import TreasuryStats from "@/components/TreasuryStats";

import CONFIG from "@/config";
import PageLayout from "@/layouts";
import { decodeData } from "@/utils";
import { fetchAllDAOProposals } from "@/utils/emvApi";

import { IProposal, TParsedDAO } from "@/types";

const MainDaoPage: NextPage<IProposal> = (props) => {
  const [parsedDao, setParsedDao] = useState<TParsedDAO | null>();
  const router = useRouter();
  const { address } = useAccount();
  const { proposals } = props;
  const toast = useToast();

  // Fetch totalSupply;
  const supplyTx = useContractRead({
    addressOrName: parsedDao?.daoToken || "",
    contractInterface: CONFIG.INTERFACES.DAO_TOKEN.abi,
    functionName: "totalSupply",
  });
  const tokenSupply = supplyTx.data
    ?.div(BigNumber.from(ethers.utils.parseEther("1")))
    .toString();
  const symbolTx = useContractRead({
    addressOrName: parsedDao?.daoToken || "",
    contractInterface: CONFIG.INTERFACES.DAO_TOKEN.abi,
    functionName: "symbol",
  });
  const symbol = symbolTx.data ? symbolTx.data.toString() : "";
  const treasuryTx = useContractRead({
    addressOrName: parsedDao?.daoToken || "",
    contractInterface: CONFIG.INTERFACES.DAO_TOKEN.abi,
    functionName: "balanceOf",
    args: [parsedDao?.gitDao || ""],
  });
  const treasuryBalance = treasuryTx.data
    ?.div(BigNumber.from(ethers.utils.parseEther("1")))
    .toString();

  const treasuryPercent = treasuryTx.data
    ? treasuryTx.data
        .mul(BigNumber.from("100"))
        .div(supplyTx.data || 1)
        .toString()
    : 0;

  const delegateTx = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: parsedDao?.daoToken || "",
    contractInterface: CONFIG.INTERFACES.DAO_TOKEN.abi as ContractInterface,
    functionName: "delegate",
    args: [address],

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
  console.log(parsedDao);

  useEffect(() => {
    if (!router.query["slug"]) return;
    const dao: TParsedDAO = decodeData(
      router.query["slug"] as string
    ) as TParsedDAO;
    setParsedDao(dao);
  }, [router.query]);

  return (
    <PageLayout>
      <Box position={"fixed"} bottom="3" right={"4"} zIndex="50">
        {parsedDao && <DaoTokenBalance tokenAddress={parsedDao?.daoToken} />}
      </Box>
      <Box>
        <Breadcrumbs />
      </Box>
      <Box mb={6}>
        <Heading textAlign={"center"} mb={2}>
          {parsedDao?.gitUrl}
        </Heading>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <PrettyLink
            href={CONFIG.SCAN_URL + parsedDao?.dao}
            title="DAO:"
            content={
              parsedDao?.dao.slice(0, 4) +
              "..." +
              parsedDao?.dao.slice(parsedDao?.dao.length - 4)
            }
          />
          <PrettyLink
            href={CONFIG.SCAN_URL + parsedDao?.creator}
            title="Creator:"
            content={
              parsedDao?.dao.slice(0, 4) +
              "..." +
              parsedDao?.dao.slice(parsedDao?.creator.length - 4)
            }
          />
        </Box>
      </Box>
      <Box>
        <Button
          rightIcon={<ArrowForwardIcon />}
          width={"full"}
          size={"sm"}
          onClick={() => {
            router.push({
              pathname: "/dao/[slug]/create_proposal",
              query: { slug: router.query["slug"] },
            });
          }}
        >
          Create new proposal
        </Button>
      </Box>
      <TreasuryStats
        tokenSupply={tokenSupply}
        tokenSymbol={symbol}
        treasuryBalance={treasuryBalance}
        treasuryPercent={treasuryPercent}
      />

      {/* Box  */}
      <Box
        borderTopColor={"gray.200"}
        borderTopWidth={"2px"}
        borderTopStyle={"dashed"}
        mt={4}
        pt={6}
      >
        {/* Sub heading */}
        <Box>
          <Heading size={"lg"}>📜 All Proposals</Heading>
        </Box>

        {/* Proposals div */}
        <Box mt={4}>
          {proposals.result.map((proposal, id) => (
            <ListItem
              title={"## " + proposal.data.description}
              address={proposal.address}
              onClick={() => {
                router.push({
                  pathname: "/dao/[slug]/[proposal]",
                  query: {
                    slug: router.query["slug"],
                    proposal: proposal.data.proposalId,
                  },
                });
              }}
              key={id}
            />
          ))}
        </Box>
      </Box>

      <Box
        borderTopColor={"gray.200"}
        borderTopWidth={"2px"}
        borderTopStyle={"dashed"}
        mt={4}
        mb={200}
        pt={6}
      >
        <Heading size={"md"}># Delegate to yourself.</Heading>
        <Button
          colorScheme={"blue"}
          mt={4}
          onClick={() => {
            delegateTx.write();
          }}
        >
          Delegate
        </Button>
      </Box>
    </PageLayout>
  );
};
export default MainDaoPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query["slug"]) {
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
