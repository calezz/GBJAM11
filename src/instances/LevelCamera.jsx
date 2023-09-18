import Level from "./Level";
import {  useEffect, useContext, memo } from "react";
import { GameLogic } from "./GameLogic";
const LevelCamera = memo((config) => {
  const context = useContext(GameLogic);
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
        context.moveCamera([-8,4])
      }
      if (e.key === "d") {
        context.moveCamera([-8,-4]); // Inverse the addition and subtraction
      }
      if (e.key === "a") {
        context.moveCamera([+8,+4]); // Inverse the addition and subtraction
      }
      if (e.key === "s") {
        context.moveCamera([+8,-4]);; // Inverse the addition and subtraction
      }
      if (e.key === " ") {
        context.moveCamera([0,+8]);; // Inverse the addition and subtraction
      }
      if (e.key === "Control") {
        context.moveCamera([0,-8]); // Inverse the addition and subtraction
      }
    };
    //movement controller
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, []);
  const style = {
    transform: `translate(${context.cameraPosition[0]}px,${context.cameraPosition[1]}px)`,
  };
  return <div style={style}>{<Level {...config} />}</div>;
});
export default LevelCamera;
