// /dao/[contract]/proposals

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { NextPage } from "next";
import PageLayout from "../../../layouts";
import { useFormik } from "formik";

export const RewardContributorForm = (): JSX.Element => {
  const formik = useFormik<{ address: string; amount: string }>({
    initialValues: {
      address: "",
      amount: "0",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form>
      <Box experimental_spaceY={4}>
        <FormControl>
          <FormLabel>🦄 Contributor's Address</FormLabel>
          <Input type="email" />
          <FormHelperText>Address of the contributor</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>🎁 Amount</FormLabel>
          <Input type="email" />
          <FormHelperText>Amount of tokens to reward.</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>📝 Proposal Description</FormLabel>
          <Textarea />
          <FormHelperText>
            Write short description about your proposal.
          </FormHelperText>
        </FormControl>

        <Button colorScheme={"blue"}>✅ Propose</Button>
      </Box>
    </form>
  );
};

const create_proposal: NextPage = () => {
  return (
    <PageLayout>
      <Box mb={6}>
        <Heading textAlign={"center"}>Create Proposal</Heading>
      </Box>
      <Box>
        {/*  */}
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>🤑 Reward Contributor</Tab>
            <Tab>🏷 Token Sale</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RewardContributorForm />
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
export default create_proposal;
