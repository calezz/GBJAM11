import { useGameContext } from "../store/GameContext";
import Entities from "./Entitites";
import Level from "./Level";
import { useEffect, memo, Children } from "react";
const LevelCamera = memo(({ children }) => {
  const position = useGameContext((state) => state.playerPosition);
  const pE= useGameContext((state) => state.playerEntity);
  const movePlayer = useGameContext((state) => state.movePlayer);
  const setPlayerState = useGameContext((state) => state.setPlayerState);
  const playerEntity = useGameContext((state) => state.playerEntity);
  const cameraPosition = [
     (position[0] / 2 - position[1] / 2 - 4.5*16),
     (position[0] / 4 + position[1] / 4 - position[2] / 2 - 5*16),
  ];
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
        movePlayer([0, -16, 0]);
        setPlayerState([96,[1,1],92]);
      }

      if (e.key === "d") {
        movePlayer([16, 0, 0]);
        setPlayerState([94,[1,1],92]);
      }
      if (e.key === "a") {
        movePlayer([-16, 0, 0]);
        setPlayerState([96,[-1,1],92]);
        console.log(pE)
      }
      if (e.key === "s") {
        movePlayer([0, +16, 0]);
        setPlayerState([94,[-1,1],92]);
      }
      if (e.key === " ") {
        movePlayer([0, 0, +16]);
        setPlayerState([98,[-1,1],92]);
      }
      if (e.key === "Control") {
        movePlayer([0, 0, -2]);

    
        setPlayerState([92,[1,1],92]);
        
      }
    };
    //movement controller
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, []);
  const style = {
    transform: `translate(${-cameraPosition[0]}px,${-cameraPosition[1]}px)`,
  };
  return <div style={style}>{children}</div>;
});
export default LevelCamera;
