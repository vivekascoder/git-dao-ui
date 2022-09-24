import { RepeatIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";

interface IENSInput {
  label: string;
  value: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  helpText: string;
  onResolveClick: MouseEventHandler<HTMLButtonElement>;
}

const ENSInput: React.FC<IENSInput> = (props) => {
  const address = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <FormControl>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <HStack>
        <Input
          type="string"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          // flexGrow={"1"}
          ref={address}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<RepeatIcon />}
          onClick={props.onResolveClick}
        />
      </HStack>
      <FormHelperText>{props.helpText}</FormHelperText>
    </FormControl>
  );
};
export default ENSInput;
