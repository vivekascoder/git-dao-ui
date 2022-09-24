import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { BigNumber, ContractInterface, ethers } from "ethers";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { useContractWrite } from "wagmi";

import CONFIG from "@/config";
import { decodeData } from "@/utils";
import { resolve } from "@/utils/ens";

import ENSInput from "../ENSInput";

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
      if (values.address.endsWith(".eth")) {
        errors.address = "Please resolve ENS with the button.";
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

  const handleEnsResolve: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const address = await resolve(formik.values.address);
    formik.setFieldValue("address", address || formik.values.address);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box experimental_spaceY={4}>
        <ENSInput
          label={"🦄 Contributor's Address"}
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          helpText={
            formik.errors.address
              ? formik.errors.address
              : "Address of the contributor"
          }
          onResolveClick={handleEnsResolve}
        />

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
export default RewardContributorForm;
