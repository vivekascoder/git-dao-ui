// A simple link component.

import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

interface IPrettyLink {
  href: string;
  title: string;
  content: string;
}

const PrettyLink: React.FC<IPrettyLink> = (props) => {
  return (
    <Link href={props.href}>
      <Box
        display={"inline-block"}
        borderBottomWidth={"2px"}
        borderBottomColor={"transparent"}
        _hover={{
          borderBottomWidth: "2px",
          borderBottomStyle: "dashed",
          borderBottomColor: "gray.500",
          cursor: "pointer",
        }}
      >
        <Box display={"flex"} alignItems="center" experimental_spaceX={2}>
          {/* <InfoOutlineIcon color={"gray.500"} /> */}
          <Text>
            <strong>{props.title}</strong>
          </Text>
          <Text textColor={"gray.500"} size={"xs"}>
            {props.content}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};
export default PrettyLink;
