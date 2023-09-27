
import GameInstance from "../instances/GameInstance";
import WinDisplay from "../instances/Win";
import { useGameContext } from '../store/GameContext'
export default function Display(){
  const won = useGameContext((state)=>state.won)
  return(
  <>
  
    {!won&&<div id="display">
    
    <GameInstance/>
    <img src={`/bg${Math.floor(Math.random()*2)+1}.png`}/>
    </div>}


 
  </>
      )
}