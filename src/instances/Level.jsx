import Entity from "./Entity";
import React, { useState } from "react";
import { memo, useEffect } from "react";
import { useGameContext } from "../store/GameContext";
import PlayerEntity from "./PlayerEntity";
 // console.log("LEVEL")
const Level = memo((children) => {

  const entities = useGameContext((state)=>state.entities)

 


  useEffect(()=>{
  //  console.log("mounted LEVEL")
  //  return ()=> console.log("dismounted LEVL") 
  },[])


  return( <div>
    {entities.map(entity=><Entity entity={entity} position={entity.position} key={entity.position}/>)}

  </div>)
})
export default Level;
