import { render } from "react-dom";
import Entity from "./Entity";
import { useEffect, useRef, useState } from "react";
export default function Level() {
  const [level, setLevel] = useState(null);
  const [character, setCharacter] = useState();
  const [iso, setIso] = useState([88, 40]);
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
    const keyHandler = (e) => {
      if (e.key === "w") {
        setIso((prev) => [prev[0] - 8, prev[1] + 4]); // Inverse the addition and subtraction
      }
      if (e.key === "d") {
        setIso((prev) => [prev[0] - 8, prev[1] - 4]); // Inverse the addition and subtraction
      }
      if (e.key === "a") {
        setIso((prev) => [prev[0] + 8, prev[1] + 4]); // Inverse the addition and subtraction
      }
      if (e.key === "s") {
        setIso((prev) => [prev[0] + 8, prev[1] - 4]); // Inverse the addition and subtraction
      }
      if (e.key === " ") {
        setIso((prev) => [prev[0], prev[1] + 8]); // Inverse the addition and subtraction
      }
      if (e.key === "Control") {
        setIso((prev) => [prev[0], prev[1] - 8]); // Inverse the addition and subtraction
      }
    };
    //movement controller
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, []);

  const style = {
    transform: `translate(${iso[0]}px,${iso[1]}px)`,
  };
  useEffect(() => {
    // console.log(refs[0]?.current.getAttribute("position"))
  }, [refs[0]?.current.getAttribute("position")]);

  console.log("roo");

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
              </Entity>
            );
          });
        })}

      {!level && ""}
    </div>
  );
}
