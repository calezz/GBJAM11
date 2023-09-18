import { useGameContext } from "../store/GameContext";
import Level from "./Level";
import {  useEffect, memo } from "react";
const LevelCamera = memo((config) => {
  const cameraPosition = useGameContext((state)=>state.cameraPosition)
  const moveCamera = useGameContext((state)=>state.moveCamera)
  const entities = useGameContext((state)=>state.entities)
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
        moveCamera([-8,4])
         console.log(entities)
      }
      if (e.key === "d") {
        moveCamera([-8,-4]); // Inverse the addition and subtraction
      }
      if (e.key === "a") {
        moveCamera([+8,+4]); // Inverse the addition and subtraction
      }
      if (e.key === "s") {
        moveCamera([+8,-4]);; // Inverse the addition and subtraction
      }
      if (e.key === " ") {
        moveCamera([0,+8]);; // Inverse the addition and subtraction
      }
      if (e.key === "Control") {
        moveCamera([0,-8]); // Inverse the addition and subtraction
      }
    };
    //movement controller
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, []);
  const style = {
    transform: `translate(${cameraPosition[0]}px,${cameraPosition[1]}px)`,
  };
  return <div style={style}>{<Level {...config} />}</div>;
});
export default LevelCamera;
