import { memo, useEffect, useMemo } from "react";
import SpriteReader from "../helpers/SpriteReader";

import { useGameContext } from "../store/GameContext";
const Entity = memo(({uid})=> {
 // console.log(uid)
  //const position = [0,0,0]
  const entity= useGameContext((state)=>state.entities.filter(entity=>entity.uid.every((value,index)=>value===uid[index]))[0])
  console.log("renderENTITY")
  useEffect(()=>{console.log("ENTITYMOUNT")

  return ()=>console.log("ENTITY DISMOUNT ")
},[])

  //const entity = {...entities.filter(entity=>entity.position.every((value,index)=>value===position[index]))[0]}
  //console.log(entities)
  //console.log([...entity])
  const iso = [
    ((entity.position[0] - entity.position[2]) * 16) / 2 -
      ((entity.position[1] - entity.position[2]) * 16) / 2,
    ((entity.position[0] - entity.position[2]) * 16) / 4 +
      ((entity.position[1] - entity.position[2]) * 16) / 4 -
      (entity.position[2] * 16) / 2,
  ];
  const style = {
    //on rework implement offset
    transform: `translate(${
      iso[0] + (entity.snippet.state !== "static" && 0)
    }px,${iso[1] + (entity.snippet.state !== "static" && -2)}px)`,
    position: "relative",
    zIndex:
      entity.position[0] * 100 +
      entity.position[1] * 1000 +
      entity.position[2] * 1 +
      (entity.snippet.state !== "static" && 0),
    opacity: `${1}`,
  };



  return (
    <>
      {(
        <div style={style}>
          <SpriteReader props={entity} zIndex={style.zIndex} />
        </div>
      )}
    </>
  );
})
export default Entity;
