
import Entity from "./Entity";
import { memo, useEffect, useRef, useState } from "react";
const Level = memo(()=> {
  const [level, setLevel] = useState(null);
  const [character, setCharacter] = useState();

  const entityRef = useRef();
  const refs = [];
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



  useEffect(() => {
    // console.log(refs[0]?.current.getAttribute("position"))
  }, [refs[0]?.current.getAttribute("position")]);


  //create a level
  return (
    <div >
      {level &&
        character &&
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
                          (index % width) - 0.25,
                          Math.floor(index / width) - 0.25,
                          height - Z,
                        ],
                        snippet: {
                          state: "idle_human_02",
                          id,
                          character: character,
                          src: "main_char",
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
                {console.log("MAP RENDER")}
              </Entity>
            );
          });
        })}

      {!level && ""}
    </div>
  );
}
)
export default Level