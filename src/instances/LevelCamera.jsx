import { useGameContext } from "../store/GameContext";
import Entities from "./Entitites";
import Level from "./Level";
import {  useEffect, memo } from "react";
const LevelCamera = memo((config) => {
  const playerPosition = useGameContext((state)=>state.playerPosition)
  const movePlayer = useGameContext((state)=>state.movePlayer)  
  const setEntities = useGameContext((state)=>state.setEntities)  
  const entities = useGameContext((state)=>state.entities)
  const spriteSheet = useGameContext((state)=>state.spriteSheet)  
  const level = useGameContext((state)=>state.level)  




  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
        setEntities()

        //movePlayer([-8,4])
      }
      if (e.key === "d") {
        console.log(entities)
     //   movePlayer([-8,-4]); 
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
  return <div style={style}>{<Level><Entities/></Level>}</div>;
});
export default LevelCamera;
