/*
# How to use it ?

## Component / Next Page:
Use a hook to reset state of modal.

```ts
  useEffect(() => {
    resetTxModal();
  }, []);
```

Another hook to change the state of confirmation and other stuff.

```ts
  useEffect(() => {
    setTxHash(delegateTx.data?.hash || "");
    setTxConfirmed(delegateTxConfirmation.isSuccess);
  }, [delegateTx.data, delegateTxConfirmation, setTxHash, setTxConfirmed]);

Use useWaitForTransaction with useContractWrite.

```ts
  const delegateTx = useContractWrite({...});
  const delegateTxConfirmation = useWaitForTransaction({
    hash: delegateTx.data?.hash,
  });
```

That's it have fun.
*/

import { CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import useGlobalStore from "@/store";

import CONFIG from "@/config";

const TransactionModal: React.FC = () => {
  const [data, toggleTxModal] = useGlobalStore((s) => [
    s.txModal,
    s.toggleTxModal,
  ]);
  return (
    <Modal isOpen={data.isOpen} onClose={toggleTxModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Waiting Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <VStack justifyContent={"center"}>
              {data.confirmed ? (
                <CheckIcon boxSize={14} color={"green.500"} />
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
            </VStack>

            <Text mt={3}>
              {data.confirmed
                ? "Transaction confirmed."
                : "Waiting for the transaction to be confirmed. Please wait for a while."}{" "}
              Check your transaction on block explorer.
            </Text>
            {data.txHash && (
              <Link href={CONFIG.SCAN_URL + "tx/" + data.txHash} isExternal>
                {data.txHash} <ExternalLinkIcon mx="2px" />
              </Link>
            )}
          </Box>
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={toggleTxModal}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
export default TransactionModal;
