import { useGameContext } from "../store/GameContext";
import Level from "./Level";
import {  useEffect, memo } from "react";
const LevelCamera = memo((config) => {
  const playerPosition = useGameContext((state)=>state.playerPosition)
  const movePlayer = useGameContext((state)=>state.movePlayer)
  const entities = useGameContext((state)=>state.entities)
  
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
        movePlayer([-8,4])
        console.log(entities)
      }
      if (e.key === "d") {
        movePlayer([-8,-4]); // Inverse the addition and subtraction
      }
      if (e.key === "a") {
        movePlayer([+8,+4]); // Inverse the addition and subtraction
      }
      if (e.key === "s") {
        movePlayer([+8,-4]);; // Inverse the addition and subtraction
      }
      if (e.key === " ") {
        movePlayer([0,+8]);; // Inverse the addition and subtraction
      }
      if (e.key === "Control") {
        movePlayer([0,-8]); // Inverse the addition and subtraction
      }
    };
    //movement controller
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, []);
  const style = {
    transform: `translate(${playerPosition[0]}px,${playerPosition[1]}px)`,
  };
  return <div style={style}>{<Level {...config} />}</div>;
});
export default LevelCamera;
