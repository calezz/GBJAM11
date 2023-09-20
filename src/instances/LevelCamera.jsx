import { useGameContext } from "../store/GameContext";
import Entities from "./Entitites";
import Level from "./Level";
import {  useEffect, memo, Children } from "react";
const LevelCamera = memo(({children}) => {
  const cameraPosition = useGameContext((state)=>state.cameraPosition)
  const movePlayer = useGameContext((state)=>state.movePlayer)  
  const moveCamera= useGameContext((state)=>state.moveCamera)  
  const setPlayerState= useGameContext((state)=>state.setPlayerState)  

  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
      setPlayerState(93)
       movePlayer([0,-1,0])
       moveCamera([-8,4])
      }
      if (e.key === "d") {
        movePlayer([1,0,0])
        moveCamera([-8,-4]); 
      }
      if (e.key === "a") {
        movePlayer([-1,0,0])
        moveCamera([+8,+4]); 
      }
      if (e.key === "s") {
        movePlayer([0,-1,0])
        moveCamera([+8,-4]);
      }
      if (e.key === " ") {
  //      movePlayer([0,+8]);; 
      }
      if (e.key === "Control") {
    //    movePlayer([0,-8]); 
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
  return <div style={style}>{children}</div>;
});
export default LevelCamera;
