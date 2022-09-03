// /pages/daos.tsx
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import PageLayout from "../../layouts";
import Moralis from "moralis";
import CONFIG from "../../config";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";

/**
 * # Goal ?
 * + List all the DAOs created from the contract.
 */
export interface IListItem {
  title: string;
  address: string;
  children?: React.ReactNode;
}
export const ListItem = (props: IListItem): JSX.Element => {
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
      <Text fontWeight={"medium"}>{props.title}</Text>
      <Button
        colorScheme={"blue"}
        rightIcon={<ArrowForwardIcon />}
        borderRadius={"1000px"}
        size={"sm"}
        px={4}
        onClick={() => {
          router.push({
            pathname: "/dao/[contract]",
            query: { contract: props.address },
          });
        }}
      >
        Visit
      </Button>
    </Box>
  );
};

interface PageProps {
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
      data: {
        creator: string;
        dao: string;
        daoTimelock: string;
        daoToken: string;
      };
    }[];
  };
}
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
          <ListItem key={index} title={d.data.dao} address={d.data.dao} />
        ))}
      </Box>
    </PageLayout>
  );
};
export default daos;

const ABI = {
  anonymous: false,
  inputs: [
    {
      indexed: false,
      internalType: "address",
      name: "daoToken",
      type: "address",
    },
    {
      indexed: false,
      internalType: "address",
      name: "daoTimelock",
      type: "address",
    },
    {
      indexed: false,
      internalType: "address",
      name: "dao",
      type: "address",
    },
    {
      indexed: false,
      internalType: "address",
      name: "creator",
      type: "address",
    },
  ],
  name: "DAOCreated",
  type: "event",
};
const options = {
  chain: "0x13881",
  address: "0xC8A7Ef44347f13683F624D1ef9736DE3e84D8e41",
  topic: "0x4db6ee38117e611315b34948f609eed3356f7c79be1c2e94a2a636a7e9599cf7",
  limit: 3,
  abi: ABI,
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
