import { useEffect } from "react";
import { useGameContext } from "../store/GameContext";
export default function GameLoop() {
  const fetched = useGameContext((state) => state.fetched);
  const updatePlayerSpeed = useGameContext((state) => state.updatePlayerSpeed);
  const updatePlayerPosition= useGameContext((state) => state.updatePlayerPosition);
  const movePlayer= useGameContext((state) => state.movePlayer);

  useEffect(() => {
    if (fetched) {
      const gravity = setInterval(()=>{
        updatePlayerSpeed()
        updatePlayerPosition()
        movePlayer([0,0,-.1])
      }, 20);
      return () => {
        clearInterval(gravity);
      };
    }
  }, [fetched]);
}
