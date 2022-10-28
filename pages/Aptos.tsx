import { Box, Progress, Text } from "@chakra-ui/react";
import React from "react";

interface IProgressInfo {
  title: string;
  progress: number;
  progressColor: string;

  // To show x / y
  x: number;
  y: number;
}

const ProgressInfo: React.FC<IProgressInfo> = (props) => {
  return (
    <Box>
      <Text>
        <strong>{props.title}</strong> {props.x + "/" + props.y}
      </Text>
      <Progress
        hasStripe
        borderRadius={"sm"}
        colorScheme={props.progressColor}
        value={props.progress}
      />
    </Box>
  );
};

export default ProgressInfo;
