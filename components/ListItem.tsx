import { Box, Text } from "@chakra-ui/react";
import { IListItem } from "../types";

const ListItem = (props: IListItem): JSX.Element => {
  return (
    <Box boxShadow={"md"} px={10} borderRadius={"md"} py={4}>
      <Text fontWeight={"bold"}>{props.title}</Text>
      <Text
        colorScheme={"blue"}
        // rightIcon={<ArrowForwardIcon />}
        size={"sm"}
        mt={2}
        display="inline-block"
        borderBottomWidth={"2px"}
        borderBottomColor={"transparent"}
        _hover={{
          borderBottomWidth: "2px",
          borderBottomStyle: "dashed",
          borderBottomColor: "gray.500",
          cursor: "pointer",
        }}
        // onClick={() => {}}
      >
        + Read More
      </Text>
    </Box>
  );
};
export default ListItem;
