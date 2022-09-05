import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { ContractInterface, ethers } from "ethers";
import { useState } from "react";
import { useContractWrite } from "wagmi";
import CONFIG from "../config";
import { BigNumber } from "ethers";
import { useFormik } from "formik";
import {
  ISliderWithTT,
  RepoType,
  ICreateDAOForm,
  ICreateDAOFormik,
} from "../types";

function SliderWithTT(props: ISliderWithTT) {
  const [sliderValue] = [props.sliderValue];
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Slider
      id="slider"
      // defaultValue={props.default}
      min={props.min}
      max={props.max}
      name="slider"
      colorScheme="blue"
      onChange={props.onChange}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default function CreateDAOForm({ repo }: ICreateDAOForm) {
  const toast = useToast();

  // Formik
  const formik = useFormik<ICreateDAOFormik>({
    initialValues: {
      daoTokenName: "",
      daoTokenSymbol: "",
      tokenSupply: CONFIG.DEFAULT_VALUES.SUPPLY,
      minDelay: CONFIG.DEFAULT_VALUES.MIN_DELAY,
      quoromPercentage: CONFIG.DEFAULT_VALUES.QUORAM_PERCENTAGE,
      votingPeriod: CONFIG.DEFAULT_VALUES.VOTING_PERIOD,
      votingDelay: CONFIG.DEFAULT_VALUES.VOTING_DELAY,
      adminPercent: CONFIG.DEFAULT_VALUES.ADMIN_PERCENT,
    },
    validate: (values) => {
      // Using a dirty hack here `daoTokenName`
      const errors: { [key: string]: string } = {};
      // Valudate the values.
      if (!repo) {
        errors.daoTokenName = "Repo is not selected.";
      }
      if (values.quoromPercentage <= 0 || values.quoromPercentage > 20) {
        errors.daoTokenName =
          "Quorom Percentage is not correct please select a value b/w 1 & 20.";
      }
      if (
        values.daoTokenName.length < 2 &&
        values.daoTokenName.length < 2 &&
        values.daoTokenName.length < 2 &&
        values.daoTokenName.length < 2
      ) {
        errors.daoTokenName =
          "The token name and symbol should be atleast 2 char long.";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      write();
    },
  });

  const tokenSupplyWithDecimals = BigNumber.from(
    formik.values.tokenSupply || "0"
  ).mul(BigNumber.from(ethers.utils.parseEther("1")));
  const { data, isLoading, isSuccess, write, error } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: CONFIG.CONTRACTS.DAO_FACTORY,
    contractInterface: CONFIG.INTERFACES.DAO_FACTORY.abi as ContractInterface,
    functionName: "createDAO",
    args: [
      formik.values.daoTokenName,
      formik.values.daoTokenSymbol,
      tokenSupplyWithDecimals,
      formik.values.adminPercent,
      formik.values.minDelay,
      formik.values.quoromPercentage,
      formik.values.votingPeriod,
      formik.values.votingDelay,
      repo?.fullName,
      repo?.id,
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
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="1px 1px 3px rgba(0,0,0,0.3)"
        experimental_spaceY={4}
        p={4}
        my={6}
      >
        <Box>
          <Heading textAlign={"center"}>Create ⚖️ DAO</Heading>
        </Box>
        <Box display={"flex"}>
          <Box width="full" mr={3}>
            <FormLabel htmlFor={"daoTokenName"}>DAO Token name</FormLabel>
            <Input
              name="daoTokenName"
              type={"text"}
              value={formik.values.daoTokenName}
              onChange={formik.handleChange}
              placeholder={"Super DAO token"}
            />
          </Box>
          <Box width="full">
            <FormLabel htmlFor={"name"}>DAO Token symbol</FormLabel>
            <Input
              name="daoTokenSymbol"
              type={"text"}
              value={formik.values.daoTokenSymbol}
              onChange={formik.handleChange}
              placeholder={"SDT"}
            />
          </Box>
        </Box>
        <Box>
          <FormLabel htmlFor={"name"}>DAO Token Supply</FormLabel>
          <Input
            name="tokenSupply"
            type={"number"}
            value={formik.values.tokenSupply}
            onChange={formik.handleChange}
          />
        </Box>
        <Box display={"flex"}>
          <Box mr={3} width="full">
            <FormLabel htmlFor={"name"}>Min Delay</FormLabel>
            <Input
              name="minDelay"
              type={"number"}
              value={formik.values.minDelay}
              onChange={formik.handleChange}
            />
          </Box>
          <Box width="full">
            <FormLabel htmlFor={"name"}>Quorum Percentage</FormLabel>
            <Input
              name="quoromPercentage"
              type={"number"}
              value={formik.values.quoromPercentage}
              onChange={formik.handleChange}
            />
          </Box>
        </Box>
        <Box display={"flex"}>
          <Box mr={3} width="full">
            <FormLabel htmlFor={"name"}>Voting Period</FormLabel>
            <Input
              name="votingPeriod"
              type={"number"}
              value={formik.values.votingPeriod}
              onChange={formik.handleChange}
            />
          </Box>
          <Box width="full">
            <FormLabel htmlFor={"name"}>Voting Delay</FormLabel>
            <Input
              name="votingDelay"
              type={"number"}
              value={formik.values.votingDelay}
              onChange={formik.handleChange}
            />
          </Box>
        </Box>
        <Box>
          <FormLabel>
            Percent of tokens reserve for admin.{" "}
            {"(" +
              BigNumber.from(formik.values.tokenSupply)
                .mul(formik.values.adminPercent)
                .div(BigNumber.from(100))
                .toString() +
              " " +
              formik.values.daoTokenSymbol.toString() +
              ")"}
          </FormLabel>
          <SliderWithTT
            sliderValue={formik.values.adminPercent}
            onChange={(e: number) => {
              formik.setFieldValue("adminPercent", e);
            }}
            min={1}
            max={CONFIG.DEFAULT_VALUES.MAX_ADMIN_PERCENT}
          />
        </Box>

        <Box>
          {formik.errors.daoTokenName ? (
            <Alert status="error">
              <AlertIcon />
              {formik.errors.daoTokenName}
            </Alert>
          ) : (
            ""
          )}
        </Box>
        <Box>
          <Button colorScheme={"blue"} isLoading={isLoading} type="submit">
            🚀 Create
          </Button>
        </Box>
      </Box>
    </form>
  );
}
