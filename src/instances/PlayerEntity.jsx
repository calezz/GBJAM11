import { useGameContext } from "../store/GameContext";
import { memo } from "react";
import SpriteReader from "../helpers/SpriteReader";
const PlayerEntity = memo(()=> {
 // const state= useGameContext((state)=>state.playerState)
  const position= useGameContext((state)=>state.playerPosition)
  const playerEntity= useGameContext((state)=>state.playerEntity)
  const iso = [
    ((position[0] - position[2]) * 16) / 2 -
      ((position[1] - position[2]) * 16) / 2,
    ((position[0] - position[2]) * 16) / 4 +
      ((position[1] - position[2]) * 16) / 4 -
      (position[2] * 16) / 2,
  ];
  const style = {
    //on rework implement offset
    transform: `translate(${
      iso[0] 
    }px,${iso[1]-2}px)`,
    position: "relative",
    zIndex:
      position[0] * 100 +
      position[1] * 1000 +
      position[2] * 1 ,
    opacity: `${1}`,
  };

  return (
    <>
      {(
        <div style={style}>
          <SpriteReader id={playerEntity.id} orientation={playerEntity.orientation} position={position} zIndex={style.zIndex} />
        </div>
      )}
    </>
  );
})
export default PlayerEntity;
//   <SpriteReader zIndex={style.zIndex} />