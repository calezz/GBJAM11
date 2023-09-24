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
  const mobs= useGameContext((state)=>state.mobs)
  useEffect(()=>{
    console.log(mobs)
      console.log("fetched:"+ fetched)
  },[fetched])
 useEffect(()=>{
      
    console.log("HIII")
 },[])
  return(  <div>
    {fetched && entities.map(entity=><Entity entity={entity} position={entity.position} key={entity.position}/>)}
    {fetched && mobs.map(mob=><Mob key={mob} name={mob}/>)}
    {fetched &&<>
      <PlayerEntity/>
    </>}
  </div>)
})
export default Level;
