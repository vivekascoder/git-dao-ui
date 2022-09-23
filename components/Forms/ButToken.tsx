import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useFormik } from "formik";

import { IBuyTokenFormikInitialValue } from "@/types";

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

export default BuyTokensForm;
