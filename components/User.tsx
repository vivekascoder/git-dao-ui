import { Avatar, AvatarBadge, Box, Stack, Text } from "@chakra-ui/react";

import { UserInfo } from "@/types";

const User: React.FC<{ user: UserInfo | null }> = (props) => {
  if (!props.user) {
    return <div></div>;
  }
  return (
    <Stack
      direction="row"
      spacing={4}
      alignItems={"center"}
      justifyContent="start"
      shadow={"lg"}
      py={2}
      pl={3}
      pr={5}
      borderRadius={"full"}
    >
      <Avatar src={props.user.avatar} size={"md"}>
        <AvatarBadge boxSize="5" bg="green.500" />
      </Avatar>
      <Box>
        <Text fontSize={"1.2rem"} fontWeight="bold" mb={-1}>
          {props.user.name}
        </Text>
        <Text fontWeight={"medium"}>@{props.user.username}</Text>
      </Box>
    </Stack>
  );
};

export default User;
