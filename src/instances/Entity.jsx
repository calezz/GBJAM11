import { memo, useEffect, useMemo } from "react";
import SpriteReader from "../helpers/SpriteReader";

import { useGameContext } from "../store/GameContext";
const Entity = memo(({position})=> {
  const entity= useGameContext((state)=>state.entities.filter(entity=>entity.position.every((value,index)=>value===position[index]))[0])

  const iso = [
    ((entity.position[0] )) / 2 -((entity.position[1] )) / 2,    ((entity.position[0]) ) / 4 +
      ((entity.position[1] ) ) / 4 -(entity.position[2] ) / 2,
  ];
  const style = {
    //on rework implement offset
    transform: `translate(${
      iso[0]
    }px,${iso[1]}px)`,
    position: "relative",
    opacity: `${1}`,
  };
  const zIndex=entity.position[0] * 1 +entity.position[1] * 10 +entity.position[2] * 10

  return (
    <>
      {(
        <div style={style}>
          <SpriteReader id={entity.id} defaultState={entity.id} position={position} orientation={entity.orientation} zIndex={zIndex}/>
        </div>
      )}
    </>
  );
})
export default Entity;
//<SpriteReader props={entity} zIndex={style.zIndex} />