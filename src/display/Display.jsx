
import GameInstance from "../instances/GameInstance";

export default function Display(){
  
  return(
  
  
  <div id="display">
    
    <GameInstance/>
    <img src={`/bg${Math.floor(Math.random()*2)+1}.png`}/>
      </div>)
}