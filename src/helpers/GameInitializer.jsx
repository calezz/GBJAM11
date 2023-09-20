import React, { useEffect } from "react";
import { useGameContext } from "../store/GameContext";

const GameInitializer = () => {
  const fetchSprites = useGameContext((state) => state.fetchSprites);
  const setFetched = useGameContext((state) => state.setFetched);

  useEffect(() => {
    // Fetch sprites when this component mounts
    fetchSprites({ spriteSheet: "tileset_main", level: "tileshowcase" })
      .then(() => {
        setFetched(true)
      })
      .catch((error) => {
        console.error("Error fetching sprites:", error);
      });
  }, [fetchSprites]);

  return null; // This component doesn't render anything visible
};

export default GameInitializer;
