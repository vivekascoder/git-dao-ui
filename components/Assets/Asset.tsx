import { Box } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
import { Application, SPEObject } from "@splinetool/runtime";
import { useEffect, useRef, useState } from "react";

/**
 *  Responsible for skeleton of the site.
 */
export default function Asset() {
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
      if (!model.current) return;
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
    <Box position={"relative"}>
      <Box height={"40rem"} position={"absolute"} inset={0} zIndex={-20}>
        <Spline scene={"/rocket.splinecode"} onLoad={onLoad} />
      </Box>
    </Box>
  );
}
