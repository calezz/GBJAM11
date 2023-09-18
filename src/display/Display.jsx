import LevelCamera from "../instances/LevelCamera";
import Level from "../instances/Level";
import GameInstance from "../instances/GameInstance";

export default function Display(){
    return (
    <div id="display">
   <GameInstance><div>
        {" "}
        <LevelCamera
          config={{
            name: "floortest",
            src: "placeholder",
            spriteSheet: "main_char",
          }}
        />
      </div></GameInstance>
  </div>)
  
}