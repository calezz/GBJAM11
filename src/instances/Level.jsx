import Entity from "./Entity";
import React from "react";
import { memo, useEffect, useState } from "react";
import { useGameContext } from "../store/GameContext";

const Level = memo((prop) => {
  const [isLoading, setIsLoading] = useState(true);
  const entities = useGameContext((state)=>state.entities)
  const setEntities = useGameContext((state)=>(state.setEntities))
  const config = prop.config;
  useEffect(() => {
    async function fetcher() {
      const [levelResponse, spriteSheetResponse] = await Promise.all([
        fetch(`/${config.name}.json`),
        fetch(`/${config.spriteSheet}.json`),
      ]);

      const [level, spriteSheet] = await Promise.all([
        levelResponse.json(),
        spriteSheetResponse.json(),
      ]);

      const entities = [];
      level &&
        spriteSheet &&
        level.layers.map((layer, Z) => {
          const width = 16;
          return layer.chunks.map((chunk) => {
            const chunkX = chunk.x;
            const chunkY = chunk.y;
            return chunk.data.map((id, index) => {
              id !== 0 &&
                entities.push(
                  <Entity
                    key={[index, Z]}
                    props={{
                      ...(id == 500
                        ? {
                            position: [
                              index % width,
                              chunkY + Math.floor(index / width),
                              Z,
                            ],
                            type: "player",
                            snippet: {
                              state: "idle_human_02",
                              id,
                              spriteSheet: spriteSheet,
                              src: config.spriteSheet,
                            },
                          }
                        : {
                            position: [
                              chunkX + (index % width),
                              chunkY + Math.floor(index / width),
                              Z,
                            ],
                            type: "tile",
                            snippet: {
                              state: "static",
                              id,
                              src: config.src,
                              columns: level.tilesets[0].columns,
                              size: [16, 16],
                            },
                          }),
                    }}
                  ></Entity>
                );
            });
          });
        });
      setIsLoading(false);
      setEntities(entities)
    }
    fetcher();
  }, []);

  return <div>{!isLoading &&entities}</div>;
});
export default Level;
