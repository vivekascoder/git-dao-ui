// /pages/daos.tsx
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import Breadcrumbs from "@/components/Breadcrumbs";

import { fetchAllCreatedDAOS } from "@/utils/emvApi";

import PageLayout from "../../layouts";
import { DAOPageProps, IListItem, TDAO } from "../../types";
import { encodeData } from "../../utils";

const ListFlexBox = (props: IListItem): JSX.Element => {
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
        onClick={props.onClick}
      >
        Visit
      </Button>
    </Box>
  );
};

const DaoIndexPage: NextPage<DAOPageProps> = (props) => {
  const router = useRouter();
  const redirectToDaoPage = (daoObject: TDAO) => {
    router.push({
      pathname: "/dao/[slug]",
      query: {
        slug: encodeData({
          dao: daoObject.dinfo[2],
          daoToken: daoObject.dinfo[0],
          daoTimelock: daoObject.dinfo[1],
          gitDao: daoObject.gitDaoCreator[0],
          gitUrl: daoObject.gitUrl,
          gitId: daoObject.gitId,
          creator: daoObject.gitDaoCreator[1],
        }),
      },
    });
  };
  return (
    <PageLayout>
      <Box py={3}>
        <Breadcrumbs />
      </Box>
      <Box>
        <Heading textAlign={"center"} mb={6}>
          Created DAOs
        </Heading>
      </Box>

      <Box experimental_spaceY={3}>
        {props.daos.result.map((d, index) => (
          <ListFlexBox
            key={index}
            title={d.data.gitUrl}
            address={d.data.dinfo[2]}
            onClick={() => {
              redirectToDaoPage(d.data);
            }}
          />
        ))}
      </Box>
    </PageLayout>
  );
};
export default DaoIndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchAllCreatedDAOS();
  return {
    props: {
      daos: data,
    },
  };
};
