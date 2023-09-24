import Entity from "./Entity";
import React, { useState } from "react";
import { memo, useEffect } from "react";
import { useGameContext } from "../store/GameContext";
import PlayerEntity from "./PlayerEntity";
import Mob from "./Mob"
 // console.log("LEVEL")
const Level =  memo( (children) => {
  const entities = useGameContext((state)=>state.entities)
  const fetched = useGameContext((state)=>state.fetched)
  const makeMob = useGameContext((state)=>state.makeMob)
  const mob2= useGameContext((state)=>state.mob2)
  useEffect(()=>{
      console.log("fetched:"+ fetched)
  },[fetched])
 useEffect(()=>{
      
    console.log("HIII")
 },[])
  return(  <div>
    {fetched && entities.map(entity=><Entity entity={entity} position={entity.position} key={entity.position}/>)}
    {fetched &&<>
      <Mob/> <PlayerEntity/>
    </>}
  </div>)
})
export default Level;
