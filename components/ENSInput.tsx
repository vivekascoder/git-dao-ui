import { RepeatIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { forwardRef, MouseEventHandler, useState } from "react";

import { resolve } from "@/utils/ens";

interface IENSInput {
  label: string;
  name: string;
  helpText: string;
}

const ENSInput = forwardRef<HTMLInputElement, IENSInput>((props, ref) => {
  const [value, setValue] = useState<string>("");
  const handleEnsResolve: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!value.endsWith(".eth")) return;
    const address = await resolve(value);
    if (!address) return;
    setValue(address);
  };

  return (
    <FormControl>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <HStack>
        <Input
          type="string"
          name={props.name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={ref}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<RepeatIcon />}
          onClick={handleEnsResolve}
        />
      </HStack>
      <FormHelperText>{props.helpText}</FormHelperText>
    </FormControl>
  );
});

ENSInput.displayName = "ENSInput";

export default ENSInput;
