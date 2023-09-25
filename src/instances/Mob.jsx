import { useGameContext } from "../store/GameContext";
import { memo } from "react";
import SpriteReader from "../helpers/SpriteReader";
const Mob = memo(({name})=> {
  const position= useGameContext((state)=>state[name].position)
  const playerEntity= useGameContext((state)=>state[name])
  const playerOrientation= [1,1]
  
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
export default Mob;
//   <SpriteReader zIndex={style.zIndex} />