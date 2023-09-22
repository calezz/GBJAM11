import { useEffect } from "react";
import { useGameContext } from "../store/GameContext";
export default function GameLoop() {
  const fetched = useGameContext((state) => state.fetched);
  const updatePlayerSpeed = useGameContext((state) => state.updatePlayerSpeed);
  const updatePlayerPosition= useGameContext((state) => state.updatePlayerPosition);

  useEffect(() => {
    if (fetched) {
      const gravity = setInterval(()=>{
        updatePlayerSpeed()
        updatePlayerPosition()
      }, 100);
      return () => {
        clearInterval(gravity);
      };
    }
  }, [fetched]);
}
