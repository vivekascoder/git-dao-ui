import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import PageLayout from "../layouts";
import Quote from "../components/Quote";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Application, SPEObject } from "@splinetool/runtime";

/**
 *  Responsible for skeleton of the site.
 */
export default function Home(): React.ReactNode {
  const model = useRef<undefined | SPEObject>();
  const [originalX, setOriginalX] = useState<number>(0);
  const [originalY, setOriginalY] = useState<number>(0);
  const [originalZ, setOriginalZ] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const height = window.pageYOffset;
      if (model.current) {
        model.current!.rotation.z = originalZ + (0.3 * height) / 1000;
      }
    });
    window.addEventListener("mousemove", (ev: MouseEvent) => {
      console.log(model.current);
      if (!model.current) return;
      console.log({ y: ev.clientY, yy: ev.y });
      model.current!.rotation.x = originalY + (0.5 * ev.clientY) / 1000;
      model.current!.rotation.y = originalX + (0.5 * ev.clientX) / 1000;
    });
  }, [originalX, originalY, originalZ]);

  function onLoad(splineApp: Application) {
    model.current = splineApp.findObjectByName("ghost");

    if (model.current) {
      // Zoom out a bit
      model.current!.scale.x -= 0.2;
      model.current!.scale.y -= 0.2;
      model.current!.scale.z -= 0.2;

      const x = model.current!.rotation.x - 0.5 / 2;
      const y = model.current!.rotation.y - 0.5 / 2;
      const z = model.current!.rotation.z;

      setOriginalX(x);
      setOriginalY(y);
      setOriginalZ(z);
    }
  }
  return (
    <PageLayout>
      <Box mt={"4rem"} position={"relative"}>
        <Box height={"40rem"} position={"absolute"} inset={0} zIndex={-20}>
          <Spline scene={"/rocket.spline"} onLoad={onLoad} />
        </Box>
        <Heading
          fontSize={"2.4rem"}
          fontWeight={"extrabold"}
          textAlign="center"
        >
          🌈 Git DAO
        </Heading>
        <Text
          fontSize={"1.2rem"}
          fontWeight={"extrabold"}
          textAlign="center"
          mt={"6"}
        >
          Launch DAO for your github repositories in minute with a few clicks
          and build economy around it and start supporting and growing your open
          source projects.
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          mt={8}
          experimental_spaceX={4}
        >
          <Link href={"/magic"}>
            <Button colorScheme="blue">🎩 Experience Magic</Button>
          </Link>
          <Link href={"/dao"}>
            <Button colorScheme="purple">⚖️ See DAOs</Button>
          </Link>
        </Flex>
        <Box mt={20}>
          <Quote />
        </Box>
      </Box>
    </PageLayout>
  );
}
