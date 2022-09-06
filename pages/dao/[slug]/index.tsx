import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

import ListItem from "@/components/ListItem";

import CONFIG from "@/config";
import PageLayout from "@/layouts";
import { fetchAllDAOProposals } from "@/utils/emvApi";

import { decodeData } from "../../../utils";

import { IDaoPageProps, TParsedDAO } from "@/types";
// import ListItem from "../../../components/ListItem";
// import ListItem from "../../../components/ListItem";

const MainDaoPage: NextPage<IDaoPageProps> = (props) => {
  const [parsedDao, setParsedDao] = useState<TParsedDAO | null>();
  // const [totalSupply, setTotalSupply] = useState<string>("");
  const router = useRouter();
  const { proposals } = props;

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
  const symbol = symbolTx.data;
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
    ?.mul(BigNumber.from("100"))
    .div(supplyTx.data)
    .toString();

  useEffect(() => {
    // TODO: If there is issue with the slug (compromised), show error.
    if (!router.query["slug"]) return;
    const dao: TParsedDAO = decodeData(
      router.query["slug"] as string
    ) as TParsedDAO;
    setParsedDao(dao);
    console.log(dao);
  }, [router.query]);

  return (
    <PageLayout>
      <Box mb={6}>
        <Heading textAlign={"center"} mb={2}>
          {parsedDao?.gitUrl}
        </Heading>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
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
                  {parsedDao?.dao.slice(0, 4) +
                    "..." +
                    parsedDao?.dao.slice(parsedDao?.creator.length - 4)}
                </Text>
              </Box>
            </Box>
          </Link>

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
                  <strong>Creator:</strong>
                </Text>
                <Text textColor={"gray.500"} size={"xs"}>
                  {parsedDao?.creator.slice(0, 4) +
                    "..." +
                    parsedDao?.creator.slice(parsedDao?.creator.length - 4)}
                </Text>
              </Box>
            </Box>
          </Link>
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
      <Box display="flex" mt={4}>
        <Box flexGrow={"1"}>
          <Heading size={"md"} mb={2} mt={6}>
            # 💵 Treasury Stats
          </Heading>
          <Text>
            + Total Supply: <strong>{tokenSupply + " " + symbol}</strong>
          </Text>
          <Text>
            + Treasury Balance:{" "}
            <strong>{treasuryBalance + " " + symbol}</strong>
          </Text>
          <Text>
            + Percentage of total supply in treasury:{" "}
            <strong>{treasuryPercent + "%"}</strong>
          </Text>
        </Box>
        <div
          className="pie"
          // style={{ "--p": "60", "--c": "darkblue", "--b": "10px" }}
          // @ts-ignore
          style={{ "--p": treasuryPercent }}
          data-size="50"
        >
          {" "}
          {treasuryPercent}%
        </div>
      </Box>

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
                console.log("Click");
              }}
              key={id}
            />
          ))}
        </Box>
      </Box>
    </PageLayout>
  );
};
export default MainDaoPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("> Server side props.");
  if (!context.query["slug"]) {
    console.log(">>> Aint got nothin");
    return { props: { proposals: [] } };
  }
  const parsedDao = decodeData(context.query["slug"] as string) as TParsedDAO;
  // console.log("Dao", parsedDao.dao);
  const events = await fetchAllDAOProposals(parsedDao.dao);
  // console.log(JSON.stringify(events, null, 2));
  return {
    props: {
      proposals: events,
    },
  };
};
