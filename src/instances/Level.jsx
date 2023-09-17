import Entity from "./Entity";
import { memo, useEffect, useRef, useState } from "react";
const Level = memo((prop) => {
  const [level, setLevel] = useState(null);
  const [spriteSheet, setSpriteSheet] = useState();
  const entityRef = useRef();
  const refs = [];
  const config = prop.config;

  useEffect(() => {
    fetch(`/${config.name}.json`)
      .then((response) => response.json())
      .then((data) => setLevel(data))
      .catch((error) => console.error("fetching error:", error));
    fetch(`/${config.spriteSheet}.json`)
      .then((response) => response.json())
      .then((data) => setSpriteSheet(data))
      .catch((error) => console.error("fetching error:", error));
  }, []);

  useEffect(() => {
    // console.log(refs[0]?.current.getAttribute("position"))
  }, [refs[0]?.current.getAttribute("position")]);

  return (
    <div>
      {level &&
        spriteSheet &&
        level.infinite &&
        level.layers.map((layer, Z) => {
          console.log(Z)
          const width = 16;
          const height = level.nextlayerid - 2;
          return layer.chunks.map((chunk) => {
            const chunkX= chunk.x
            const chunkY= chunk.y
            
            return chunk.data.map((id, index) => {
              
              return (
                <Entity key={[index, Z]} ref={entityRef} props={{
                  ...(id == 500
                    ? {
                        position: [
                          (index % width),
                          chunkY+Math.floor(index / width),
                          Z,
                          [-0.25, -0.25, 0],
                        ],
                        snippet: {
                          state: "idle_human_02",
                          id,
                          spriteSheet: spriteSheet,
                          src: config.spriteSheet,
                        },
                      }
                    : {
                        position: [
                          chunkX+(index % width),
                          chunkY+Math.floor(index / width),
                          Z,
                        ],
                        snippet: {
                          state: "static",
                          id,
                          src: config.src,
                          columns: level.tilesets[0].columns,
                          size: [
                            16,
                            16,
                          ],
                        },
                      }),
                }}>
                  {refs.push(entityRef)}
             
                </Entity>             );
            });
          });
        })}

      {level &&
        spriteSheet &&
        !level.infinite &&
        level.layers.map((layers, Z) => {
          const width = layers.width;
          const height = level.nextlayerid - 2;
          return layers.data.map((id, index) => {
            
            return (
              <Entity
                key={[index, Z]}
                ref={entityRef}
                props={{
                  ...(id == 500
                    ? {
                        position: [
                          index % width,
                          Math.floor(index / width),
                          height - Z,
                          [-0.25, -0.25, 0],
                        ],
                        snippet: {
                          state: "idle_human_02",
                          id,
                          spriteSheet: spriteSheet,
                          src: config.spriteSheet,
                        },
                      }
                    : {
                        position: [
                          index % width,
                          Math.floor(index / width),
                          height - Z,
                        ],
                        snippet: {
                          state: "static",
                          id,
                          src: config.src,
                          columns: level.tilesets[0].columns,
                          size: [
                            level.tilesets[0].tilewidth,
                            level.tilesets[0].tileheight,
                          ],
                        },
                      }),
                }}
              >
                {refs.push(entityRef)}
              </Entity>
            );
          });
        })}

      {!level && ""}
    </div>
  );
});
export default Level;
