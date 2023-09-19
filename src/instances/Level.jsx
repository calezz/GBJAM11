import Entity from "./Entity";
import React from "react";
import { memo, useEffect, useState } from "react";
import { useGameContext } from "../store/GameContext";

const Level = memo((children) => {
  //const [isLoading, setIsLoading] = useState(true);
  const entities = useGameContext((state)=>state.entities)
  const level = useGameContext((state)=>state.entities)
  const setEntities = useGameContext((state)=>state.setEntities)  


  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "w") {
        setEntities()

        //movePlayer([-8,4])
      }
      if (e.key === "d") {
        console.log(entities)
     //   movePlayer([-8,-4]); 
      }
      if (e.key === "a") {
        movePlayer([+8,+4]); 
      }
      if (e.key === "s") {
        movePlayer([+8,-4]);; 
      }
      if (e.key === " ") {
        movePlayer([0,+8]);; 
      }
      if (e.key === "Control") {
        movePlayer([0,-8]); 
      }
    };
    //movement controller
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, []);




  return <div>
    {entities.map(entity=><Entity position={entity.position} key={entity.position}/>)}
  </div>;
});
export default Level;
