import LevelCamera from "../instances/LevelCamera";
import { useGameContext } from "../store/GameContext";
import Level from "./Level";
export default function GameInstance(){
  const config = useGameContext((state)=>state.config)
    return(<>
    <div>
        <LevelCamera
          config={config}
        ><Level/></LevelCamera>
      </div>
    </>)
}