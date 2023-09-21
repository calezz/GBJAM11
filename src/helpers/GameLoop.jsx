import { useEffect } from "react";
import { useGameContext } from "../store/GameContext";
export default function GameLoop(){
    const movePlayer = useGameContext((state)=>state.movePlayer)
    const playerPosition = useGameContext((state)=>state.playerPosition)
    const fetched = useGameContext((state)=>state.fetched)
  //  console.log(movePlayer,playerPosition,fetched)
    useEffect(()=>{
        
        const gravity = setInterval(()=>{
            if(fetched){
                movePlayer([0,0,0])}
        },1000000)
        return ()=> {clearInterval(gravity)}
    },[fetched])
    
}