// /dao/[contract]/proposals

import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import DaoTokenBalance from "@/components/DaoTokenBalance";
import BuyTokensForm from "@/components/Forms/ButToken";
import RewardContributorForm from "@/components/Forms/RewardContributor";

import PageLayout from "@/layouts";
import { decodeData } from "@/utils";

import { TParsedDAO } from "@/types";

const CreateProposalPage: NextPage = () => {
  const router = useRouter();
  const [parsedDao, setParsedDao] = useState<TParsedDAO>();

  useEffect(() => {
    if (!router.query["slug"]) return;
    const dao: TParsedDAO = decodeData(
      router.query["slug"] as string
    ) as TParsedDAO;
    setParsedDao(dao);
  }, [parsedDao, router.query]);

  if (!parsedDao) {
    return <Box>Loading Dao...</Box>;
  }

  return (
    <PageLayout>
      <Box position={"fixed"} bottom="3" right={"4"} zIndex="50">
        {parsedDao ? <DaoTokenBalance tokenAddress={parsedDao.daoToken} /> : ""}
      </Box>
      <Box>
        <Breadcrumbs />
      </Box>
      <Box mb={6}>
        <Heading textAlign={"center"}>Create Proposal</Heading>
      </Box>
      <Box>
        {/*  */}
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>🤑 Reward Contributor</Tab>
            <Tab>🏷 Token Sale</Tab>
            <Tab>👽 Provide Liquidity</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RewardContributorForm />
            </TabPanel>
            <TabPanel>
              {/* <Text>
                This feature is <strong>cumming</strong> soon, contact{" "}
                <strong>@0xStateMachine</strong> on twitter for more info.
              </Text> */}
              <BuyTokensForm />
            </TabPanel>
            <TabPanel>
              <Text>
                This feature is <strong>cumming</strong> soon, contact{" "}
                <strong>@0xStateMachine</strong> on twitter for more info.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PageLayout>
  );
};

export default CreateProposalPage;
