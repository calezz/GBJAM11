import Entity from "./Entity";
import React, { useState } from "react";
import { memo, useEffect } from "react";
import { useGameContext } from "../store/GameContext";
  console.log("LEVEL")
const Level = memo((children) => {
  //const [isLoading, setIsLoading] = useState(true);
  const entities = useGameContext((state)=>state.entities)
  //const setEntities = useGameContext((state)=>state.setEntities)  
  const [newEntities,setNewEntities]= useState([])
  useEffect(()=>{
    setNewEntities([...entities])
  },[])
  useEffect(()=>{
    render()
  },[newEntities])
  return( <div>
    {newEntities.map(entity=><Entity position={entity.position} key={entity.position}/>)}
  </div>)
})
export default Level;
