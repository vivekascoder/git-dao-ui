// /pages/daos.tsx
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import PageLayout from "../../layouts";
import Moralis from "moralis";
import CONFIG from "../../config";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { encodeData } from "../../utils";

/**
 * # Goal ?
 * + List all the DAOs created from the contract.
 */
export type TParsedDAO = {
  dao: string;
  daoToken: string;
  daoTimelock: string;
  gitDao: string;
  gitUrl: string;
  gitId: string;
  creator: string;
};
export type TDAO = {
  dinfo: [string, string, string, boolean];
  gitDaoCreator: [string, string];
  daoTimelock: string;
  gitUrl: string;
  gitId: string;
};
export interface PageProps {
  daos: {
    total: number;
    page: number;
    page_size: number;
    result: {
      transaction_hash: string;
      address: string;
      block_timestamp: string;
      block_number: string;
      block_hash: string;
      data: TDAO;
    }[];
  };
}
interface IListItem {
  title: string;
  address: string;
  children?: React.ReactNode;
  daoObject: TDAO;
}
const ListItem = (props: IListItem): JSX.Element => {
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      boxShadow={"md"}
      px={10}
      borderRadius={"md"}
      py={4}
    >
      <Text fontWeight={"bold"}>{props.title}</Text>
      <Button
        colorScheme={"blue"}
        rightIcon={<ArrowForwardIcon />}
        borderRadius={"1000px"}
        size={"sm"}
        px={4}
        onClick={() => {
          router.push({
            pathname: "/dao/[slug]",
            query: {
              slug: encodeData({
                dao: props.daoObject.dinfo[2],
                daoToken: props.daoObject.dinfo[0],
                daoTimelock: props.daoObject.dinfo[1],
                gitDao: props.daoObject.gitDaoCreator[0],
                gitUrl: props.daoObject.gitUrl,
                gitId: props.daoObject.gitId,
                creator: props.daoObject.gitDaoCreator[1],
              }),
            },
          });
        }}
      >
        Visit
      </Button>
    </Box>
  );
};

const daos: NextPage<PageProps> = (props) => {
  return (
    <PageLayout>
      <Box>
        <Heading textAlign={"center"} mb={6}>
          Created DAOs
        </Heading>
      </Box>
      <Box experimental_spaceY={3}>
        {props.daos.result.map((d, index) => (
          <ListItem
            key={index}
            title={d.data.gitUrl}
            address={d.data.dinfo[2]}
            daoObject={d.data}
          />
        ))}
      </Box>
    </PageLayout>
  );
};
export default daos;

const options = {
  chain: CONFIG.CHAIN_ID.POLYGON_TESTNET,
  address: CONFIG.CONTRACTS.DAO_FACTORY,
  topic: CONFIG.INTERFACES.EVENTS.DAO_CREATED.ID,
  abi: CONFIG.INTERFACES.DAO_FACTORY.abi.find(
    (d: { name: string; type: string }) =>
      d.name === "DAOCreated" && d.type === "event"
  ),
};

export const getServerSideProps: GetServerSideProps = async () => {
  await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_WEB3_API_KEY });
  // const data = await Moralis.Web3API.native.getContractEvents(options);

  const events = await Moralis.EvmApi.native.getContractEvents(options);
  return {
    props: {
      daos: events.raw,
    },
  };
};
