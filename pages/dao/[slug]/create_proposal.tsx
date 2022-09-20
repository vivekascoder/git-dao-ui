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
  useToast,
} from "@chakra-ui/react";
import { BigNumber, ContractInterface, ethers } from "ethers";
import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContractWrite } from "wagmi";

import Breadcrumbs from "@/components/Breadcrumbs";
import DaoTokenBalance from "@/components/DaoTokenBalance";

import CONFIG from "@/config";
import PageLayout from "@/layouts";
import { decodeData } from "@/utils";

import { TParsedDAO } from "@/types";

export const RewardContributorForm = () => {
  const [parsedDao, setParsedDao] = useState<TParsedDAO | null>();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // TODO: If there is issue with the slug (compromised), show error.
    if (!router.query["slug"]) return;
    const dao: TParsedDAO = decodeData(
      router.query["slug"] as string
    ) as TParsedDAO;
    setParsedDao(dao);
  }, [router.query]);

  const formik = useFormik<{
    address: string;
    amount: number;
    description: string;
  }>({
    initialValues: {
      address: "",
      amount: 0,
      description: "",
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!ethers.utils.isAddress(values.address)) {
        errors.address = "Not a valid eth address.";
      }
      if (formik.values.amount <= 0) {
        errors.amount = "Amount should be more than 0";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);

      write();
    },
  });
  // Creating utils
  const e = new ethers.utils.Interface(CONFIG.INTERFACES.GIT_DAO.abi);
  const amountWD = BigNumber.from(formik.values.amount || 0).mul(
    BigNumber.from(ethers.utils.parseEther("1"))
  );

  // eslint-disable-next-line
  const { data, isLoading, isSuccess, write, error } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: parsedDao?.dao || "",
    contractInterface: CONFIG.INTERFACES.DAO.abi as ContractInterface,
    functionName: "propose",
    args: [
      [parsedDao?.gitDao],
      [0],
      [
        ethers.utils.isAddress(formik.values.address)
          ? e.encodeFunctionData("rewardIndivisual", [
              // formik.values.address,
              formik.values.address,
              amountWD.toString(),
            ])
          : "",
      ],
      formik.values.description,
    ],

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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box experimental_spaceY={4}>
        <FormControl>
          <FormLabel htmlFor="address">🦄 Contributor&apos;s Address</FormLabel>
          <Input
            type="string"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            {formik.errors.address
              ? "NOTE: " + formik.errors.address
              : "Address of the contributor"}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="amount">🎁 Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            {formik.errors.amount
              ? "NOTE: " + formik.errors.amount
              : "Amount of tokens to reward."}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">📝 Proposal Description</FormLabel>
          <Textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            Write short description about your proposal.
          </FormHelperText>
        </FormControl>

        <Button type="submit" colorScheme={"blue"}>
          ✅ Propose
        </Button>
      </Box>
    </form>
  );
};

interface IBuyTokenFormikInitialValue {
  to: string;
  tokenAmount: number;
  price: number;
  erc20: string;
}

const BuyTokensForm: React.FC = () => {
  // const toast = useToast();
  const formik = useFormik<IBuyTokenFormikInitialValue>({
    initialValues: {
      to: "",
      tokenAmount: 1,
      price: 1,
      erc20: "",
    },
    validate(values) {
      const errors: { [key: string]: string } = {};
      if (!ethers.utils.isAddress(values.erc20)) {
        errors.erc20 = "Not a valid contract address";
      }
      if (!ethers.utils.isAddress(values.to)) {
        errors.to = "To is not a valid address";
      }
      if (values.price <= 0) {
        errors.price = "Price should be more than 0";
      }
      if (values.tokenAmount <= 0) {
        errors.tokenAmount = "Token amount should be more than 0";
      }
      return errors;
    },
    onSubmit(values) {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box experimental_spaceY={4}>
        <FormControl>
          <FormLabel htmlFor="to">
            🦄 Address of person who wants to buy.
          </FormLabel>
          <Input
            type="text"
            name="to"
            value={formik.values.to}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            {formik.errors.to && "NOTE: " + formik.errors.to}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="amount">
            🎁 Amount of DAO tokens user wants to buy.
          </FormLabel>
          <Input
            type="number"
            name="tokenAmount"
            value={formik.values.tokenAmount}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            {formik.errors.tokenAmount && "NOTE: " + formik.errors.tokenAmount}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">📝 Price of 1 DAO token</FormLabel>
          <Input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            {formik.errors.tokenAmount && "NOTE: " + formik.errors.price}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">🏁 Token Address</FormLabel>
          <Input
            type="text"
            name="erc20"
            value={formik.values.erc20}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            {formik.errors.tokenAmount && "NOTE: " + formik.errors.erc20}
          </FormHelperText>
        </FormControl>

        <Button type="submit" colorScheme={"blue"}>
          ✅ Propose
        </Button>
      </Box>
    </form>
  );
};

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
