
import GameLogicProvider from "../instances/GameLogic";
import GameInstance from "../instances/GameInstance";
import config from "../scripts";
export default function Display(){

  return(<div id="display">{config.x}</div>)


   /* return (
    <div id="display">
   <GameLogicProvider><GameInstance/></GameLogicProvider>
  </div>)*/
  
}