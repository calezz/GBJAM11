import { useEffect } from "react";
import { useGameContext } from "../store/GameContext";
export default function GameLoop() {
  const fetched = useGameContext((state) => state.fetched);
  //const playerSpeed = useGameContext((state) => state.playerSpeed);
  const updatePlayerSpeed = useGameContext((state) => state.updatePlayerSpeed);
  const updatePlayerPosition= useGameContext((state) => state.updatePlayerPosition);
  const movePlayer= useGameContext((state) => state.movePlayer);
  const setMob1 = useGameContext((state)=>state.setMob)
  //const playerSpeedZ= useGameContext((state) => state.playerSpeedZ);
    
  useEffect(() => {
    if (fetched) {
      const gravity = setInterval(()=>{
        updatePlayerSpeed()
        updatePlayerPosition()
        movePlayer([0,0,-2])
        setMob1("mob2")
        //setMob1("mob")
        
      }, 20);
      return () => {
        clearInterval(gravity);
      };
    }
  }, [fetched]);
}
