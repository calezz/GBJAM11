import { useGameContext } from "../store/GameContext";
import { memo } from "react";
import SpriteReader from "../helpers/SpriteReader";
const PlayerEntity = memo(()=> {
 // const state= useGameContext((state)=>state.playerState)
  const position= useGameContext((state)=>state.playerPosition)
  const playerEntity= useGameContext((state)=>state.playerEntity)
  const playerOrientation= useGameContext((state)=>state.playerOrientation)
  //console.log(playerEntity)
  const iso = [
    ((position[0])) / 2 -
      ((position[1]) ) / 2,
    ((position[0]) ) / 4 +
      ((position[1])) / 4 -
      (position[2] ) / 2,
  ];
  const style = {
    //on rework implement offset
    transform: `translate(${
      iso[0] 
    }px,${iso[1]-2}px)`,
    position: "relative",

    opacity: `${1}`,
  };
  const zIndex=position[0] * 1 +position[1] * 10 +position[2] * 10
  return (
    <>
      {(
        <div style={style}>
          <SpriteReader id={playerEntity.id} defaultState={playerEntity.defaultState||playerEntity.id} orientation={playerOrientation} position={position} zIndex={zIndex} />
        </div>
      )}
    </>
  );
})
export default PlayerEntity;
//   <SpriteReader zIndex={style.zIndex} />