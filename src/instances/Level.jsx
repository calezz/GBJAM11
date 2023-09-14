import Entity from "./Entity";
import { useEffect, useState } from "react";
export default function Level() {
  const [level, setLevel] = useState(null);

  const config = { name: "test_room01" };

  useEffect(() => {
    fetch(`/${config.name}.json`)
      .then((response) => response.json())
      .then((data) => setLevel(data))
      .catch((error) => console.error("fetching error:", error));
  }, []);
  const src = "placeholder";

  //create a level
  return (
    <div>
      {level &&
        level.layers.map((layers, Z) => {
          const width = layers.width;
          const height = level.nextlayerid - 2;
          return layers.data.map((id, index) => {
            return (
              <Entity
                key={[index, Z]}
                props={{
                  position: [index % 5, Math.floor(index / 5),height- Z],
                  snippet:{
                    id,
                    src,
                    "columns": level.tilesets[0].columns,
                    "size": [level.tilesets[0].tilewidth,level.tilesets[0].tileheight],
                  }
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

      {!level && "loading"}
    </div>
  );
}
