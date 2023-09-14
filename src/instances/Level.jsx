import Entity from "./Entity";
import { useEffect, useState } from "react";
export default function Level() {
  const [level, setLevel] = useState(null);
  const [character, setCharacter] = useState();
  const [iso, setIso] = useState([88, 40]);
  const config = {
    name: "test_room02",
    src: "placeholder",
    character: "main_char",
  };

  useEffect(() => {
    fetch(`/${config.name}.json`)
      .then((response) => response.json())
      .then((data) => setLevel(data))
      .catch((error) => console.error("fetching error:", error));
    fetch(`/${config.character}.json`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error("fetching error:", error));
  }, []);



  const style = {
    transform: `translate(${iso[0]}px,${iso[1]}px)`,
  };

  //create a level
  return (
    <div style={style}>
      {level &&
        character &&
        level.layers.map((layers, Z) => {
          const width = layers.width;
          const height = level.nextlayerid - 2;
          return layers.data.map((id, index) => {
            return (
              <Entity
                key={[index, Z]}
                props={{
                    ...(id == 500
                      ? { positionInitial: [
                        (index % width)-.25,
                        (Math.floor(index / width)-.25),
                        height - Z,
                      ],snippet:{ id, character: character, src: "main_char" }}
                      : {
                        positionInitial: [
                          index % width,
                          Math.floor(index / width),
                          height - Z,
                        ],
                          snippet:{id,
                          src: config.src,
                          columns: level.tilesets[0].columns,
                          size: [
                            level.tilesets[0].tilewidth,
                            level.tilesets[0].tileheight,
                          ],}
                        }),
                  
                }}
              >
                {/*console.log([index % 5, Math.floor(index / 5), height - Z], {
                  id,
                  src,
                  "columns": [level.tilesets[0].columns,level.tilesets[0].columns],
                  "tilesize": [level.tilesets[0].tilewidth,level.tilesets[0].tileheight],

                })*/}
              </Entity>
            );
          });
        })}

      {!level && ""}
    </div>
  );
}
