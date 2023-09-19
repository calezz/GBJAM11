import Entity from "./Entity";
import React from "react";
import { memo, useEffect, useState } from "react";
import { useGameContext } from "../store/GameContext";

const Level = memo((prop) => {
  //const [isLoading, setIsLoading] = useState(true);
  const entities = useGameContext((state)=>state.entities)
  const level = useGameContext((state)=>state.entities)
  
  return <div>{console.log(level)}</div>;
});
export default Level;
