import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

export interface IInputControl {
  name: string;
  label: string;
}
// const InputControl = ({ name, label }: IInputControl) => {
//   const { input, meta } = useField(name);
//   return (
//     <Control name={name} my={4}>
//       <FormLabel htmlFor={name}>{label}</FormLabel>
//       <Input
//         {...input}
//         isInvalid={meta.error && meta.touched}
//         id={name}
//         placeholder={label}
//       />
//       <Error name={name} />
//     </Control>
//   );
// };

export default function CreateDAOForm() {
  const [daoTokenName, setDAOTokenName] = useState<string>("");
  const [daoTokenSymbol, setDAOTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<number>(0);
  const [minDelay, setMinDelay] = useState<number>(0);
  const [quoromPercentage, setQuoromPercentage] = useState<number>(0);
  const [votingPeriod, setVotingPeriod] = useState<number>(0);
  const [votingDelay, setVotingDelay] = useState<number>(0);

  // TODO: Use formik
  const handleSubmit = () => {};

  return (
    <FormControl
      as="form"
      p={4}
      my={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="1px 1px 3px rgba(0,0,0,0.3)"
      onSubmit={handleSubmit}
    >
      <Box>
        <Heading textAlign={"center"} mb={4}>
          Create ⚖️ DAO
        </Heading>
      </Box>
      <Box display={"flex"}>
        <Box mb={4} width="full" mr={3}>
          <FormLabel htmlFor={"name"}>DAO Token name</FormLabel>
          <Input
            name="daoToken"
            type={"text"}
            value={daoTokenName}
            onChange={(e) => setDAOTokenName(e.target.value)}
          />
        </Box>
        <Box mb={4} width="full">
          <FormLabel htmlFor={"name"}>DAO Token symbol</FormLabel>
          <Input
            name="daoTokenSymbol"
            type={"text"}
            value={daoTokenSymbol}
            onChange={(e) => setDAOTokenSymbol(e.target.value)}
          />
        </Box>
      </Box>
      <Box mb={4}>
        <FormLabel htmlFor={"name"}>DAO Token Supply</FormLabel>
        <Input
          name="daoTokenSupply"
          type={"number"}
          value={tokenSupply}
          onChange={(e) => setTokenSupply(parseInt(e.target.value))}
        />
      </Box>
      <Box display={"flex"}>
        <Box mb={4} mr={3} width="full">
          <FormLabel htmlFor={"name"}>Min Delay</FormLabel>
          <Input
            name="minDelay"
            type={"number"}
            value={minDelay}
            onChange={(e) => setMinDelay(parseInt(e.target.value))}
          />
        </Box>
        <Box mb={4} width="full">
          <FormLabel htmlFor={"name"}>Quorum Percentage</FormLabel>
          <Input
            name="quoromPercentage"
            type={"number"}
            value={quoromPercentage}
            onChange={(e) => setQuoromPercentage(parseInt(e.target.value))}
          />
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box mb={4} mr={3} width="full">
          <FormLabel htmlFor={"name"}>Voting Period</FormLabel>
          <Input
            name="votingPeriod"
            type={"number"}
            value={votingPeriod}
            onChange={(e) => setMinDelay(parseInt(e.target.value))}
          />
        </Box>
        <Box mb={4} width="full">
          <FormLabel htmlFor={"name"}>Voting Delay</FormLabel>
          <Input
            name="votingDelay"
            type={"number"}
            value={votingDelay}
            onChange={(e) => setVotingDelay(parseInt(e.target.value))}
          />
        </Box>
      </Box>
      <Box>
        <Button colorScheme={"blue"}>🚀 Create</Button>
      </Box>
    </FormControl>
  );
}
