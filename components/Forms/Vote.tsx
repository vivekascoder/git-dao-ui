import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Text,
  Textarea,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { ContractInterface } from "ethers";
import { useFormik } from "formik";
import { useContractWrite } from "wagmi";

import CONFIG from "@/config";

import RadioCard from "../RadioCard";

interface IVoteForm {
  dao: string;
  proposalId: string;
}

const VoteForm: React.FC<IVoteForm> = (props) => {
  const options = ["against", "for", "abstain"];

  const toast = useToast();
  // Formik to handle the form.
  const formik = useFormik<{ message: string; voteType: string }>({
    initialValues: {
      message: "",
      voteType: options[1],
    },
    validate(values) {
      const errors: { [key: string]: string } = {};
      if (values.message.length < 3) {
        errors.message = "Message should be atleast 3 char long.";
      }
      return errors;
    },
    onSubmit(values) {
      console.log(values);
      write();
    },
  });
  // Wagmi hook to cast a vote.
  const { data, isLoading, isSuccess, write, error } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: props.dao,
    contractInterface: CONFIG.INTERFACES.DAO.abi as ContractInterface,
    functionName: "castVoteWithReason",
    args: [
      props.proposalId,
      options.indexOf(formik.values.voteType),
      formik.values.message,
    ],

    onError: (error) => {
      console.log(error.message);
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

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "voteType",
    defaultValue: options[1],
    onChange: (v: string) => {
      formik.setFieldValue("voteType", v);
    },
  });
  const group = getRootProps();

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box experimental_spaceY={3}>
          <FormControl mt="4">
            <FormLabel htmlFor="message">
              🦄 Description for your vote.
            </FormLabel>
            <Textarea
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
            <FormHelperText>
              {formik.errors.message ? "" + formik.errors.message : ""}
            </FormHelperText>
          </FormControl>
          <FormControl mt={3} mb={6}>
            <Text mb={1}>🗃 Vote Type:</Text>
            <HStack {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
          </FormControl>
          <Box>
            <Button type="submit" colorScheme={"blue"}>
              🗳 Vote
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default VoteForm;
