import { useGameContext } from "../store/GameContext";
import Level from "./Level";
import {  useEffect, memo } from "react";
const LevelCamera = memo((config) => {
  const playerPosition = useGameContext((state)=>state.playerPosition)
  const movePlayer = useGameContext((state)=>state.movePlayer)  
  
  const spriteSheet = useGameContext((state)=>state.spriteSheet)  
  const level = useGameContext((state)=>state.level)  

console.log(level)


  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
        movePlayer([-8,4])
      }
      if (e.key === "d") {
        movePlayer([-8,-4]); 
      }
      if (e.key === "a") {
        movePlayer([+8,+4]); 
      }
      if (e.key === "s") {
        movePlayer([+8,-4]);; 
      }
      if (e.key === " ") {
        movePlayer([0,+8]);; 
      }
      if (e.key === "Control") {
        movePlayer([0,-8]); 
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
  return <div style={style}>{<Level/>}</div>;
});
export default LevelCamera;
