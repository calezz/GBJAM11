import { useGameContext } from "../store/GameContext";
import Entities from "./Entitites";
import Level from "./Level";
import { useEffect, memo, Children, useRef, useState } from "react";
const LevelCamera = memo(({ children }) => {
  const position = useGameContext((state) => state.playerPosition);
  const movePlayer = useGameContext((state) => state.movePlayer);
  const setPlayerState = useGameContext((state) => state.setPlayerState);
  const setPlayerOrientation = useGameContext(
    (state) => state.setPlayerOrientation
  );
  const [keysPressed, setKeysPressed] = useState([]);
  const cameraPosition = [
    Math.round(position[0] / 2 - position[1] / 2 - 4.5 * 16),
    Math.round(position[0] / 4 + position[1] / 4 - position[2] / 2 - 5 * 16),
  ];
  //console.log(keysPressed)
  useEffect(() => {
    //define listeners
    const handleKeyDown = (e) => {
      // Add the pressed key to the state
      console.log(keysPressed)
      setKeysPressed((prev) => ({
        ...prev,
        [e.key]: true,
      }));
    };
    const handleKeyUp = (e) => {
      // Remove the released key from the state
      setKeysPressed((prev) => {
        const { [e.key]: anything, ...rest } = prev;
        return rest;
      });
    };
    //movement controller
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  
  
  useEffect(()=>{
    //drive movement
      const movementSpeed = 8;
      if (keysPressed["w"]) {
        movePlayer([0, -movementSpeed, 0]);
        setPlayerState([96, [1, 1], 92]);
        setPlayerOrientation([1, 1]);
      }

      if (keysPressed["a"]) {
        movePlayer([-movementSpeed, 0, 0]);
        setPlayerState([96, [-1, 1], 92]);
        setPlayerOrientation([-1, 1]);
      }
      if (keysPressed["s"]) {
        movePlayer([0, +movementSpeed, 0]);
        setPlayerState([94, [-1, 1], 92]);
        setPlayerOrientation([-1, 1]);
      }
      if (keysPressed["d"]) {
        movePlayer([movementSpeed, 0, 0]);
        setPlayerState([94, [1, 1], 92]);
        setPlayerOrientation([1, 1]);
      }
      if (keysPressed[" "]) {
        movePlayer([0, 0, +16]);
        setPlayerState([98, [1, 1], 92]);
      }
      if (keysPressed["Control"]) {
        movePlayer([0, 0, -2]);
        setPlayerState([92, [1, 1], 92]);
      }
  },[keysPressed])


  const style = {
    transform: `translate(${-cameraPosition[0]}px,${-cameraPosition[1]}px)`,
  };
  return <div style={style}>{children}</div>;
});
export default LevelCamera;
