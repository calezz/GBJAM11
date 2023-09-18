import Entity from "./Entity";
import React from "react";
import { memo, useEffect, useRef, useState } from "react";
const Level = memo((prop) => {
  const [level, setLevel] = useState(null);
  const [spriteSheet, setSpriteSheet] = useState();
  const entityRefs = []
  const config = prop.config;
  const entities = [];
  console.log("LEVL")
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
      entities.map(entity=>entity.props.props.type==="player"&&console.log(entity.props.props.position)&&(entity.props.props.position=[0,0,0]))
       //entityRefs.map((data) => {(data?.current?.getAttribute("type")==="player"&&console.log(data?.current?.getAttribute("position")))});
  }, []);



  //generate entities
  if(entities){level &&
    spriteSheet &&
    level.layers.map((layer, Z) => {
      const width = 16;
      return layer.chunks.map((chunk) => {
        const chunkX = chunk.x;
        const chunkY = chunk.y;

        return chunk.data.map((id, index) => {
          const childRef = React.createRef()
          entities.push(          
            <Entity
              key={[index, Z]}
              ref={childRef}
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
          entityRefs.push(childRef)
        });
      });
    });}

  return (
    <div >
      {entities}
      {!level && ""}
    </div>
  );
});
export default Level;
