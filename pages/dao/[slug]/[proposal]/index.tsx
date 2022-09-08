// Main page for a single proposal.

import { Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import PageLayout from "@/layouts";
import { decodeData } from "@/utils";
import { fetchAllDAOProposals } from "@/utils/emvApi";

import { IProposal, IProposalResult, TParsedDAO } from "@/types";

const ProposalPage: NextPage<IProposal> = (props) => {
  const router = useRouter();
  const [proposal, setProposal] = useState<IProposalResult>();
  const [parsedDao, setParsedDao] = useState<TParsedDAO>();

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

  return (
    <PageLayout>
      <Heading>{router.query["proposal"]}</Heading>
      <Text>
        {(proposal ? proposal.address : "") + " DAO: " + parsedDao?.gitUrl}
      </Text>
    </PageLayout>
  );
};

export default ProposalPage;

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
