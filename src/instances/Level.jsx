import Entity from "./Entity";
import { useEffect, useState } from "react";
export default function Level() {
  const [level, setLevel] = useState(null);
    const [iso,setIso] = useState([0,0])
  const config = { name: "test_room02" };

  useEffect(() => {
    fetch(`/${config.name}.json`)
      .then((response) => response.json())
      .then((data) => setLevel(data))
      .catch((error) => console.error("fetching error:", error));
  }, []);
  const src = "placeholder";


  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }
  const keyHandler = throttle((e) => {
    if (e.key === 'w') {
      setIso([iso[0] + 8, iso[1] - 4]);
    }
    if (e.key === 'd') {
      setIso([iso[0] + 8, iso[1] + 4]);
    }
    if (e.key === 'a') {
      setIso([iso[0] - 8, iso[1] - 4]);
    }
    if (e.key === 's') {
        setIso([iso[0] - 8, iso[1] + 4]);
    }
}, 100);

useEffect(() => {
    //movement controller
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
}, [keyHandler]);
  const style = {
      transform: `translate(${iso[0]}px,${iso[1]}px)`,      
  };

  //create a level
  return (
    <div style={style}>
        {console.log(style)}
      {level &&
        level.layers.map((layers, Z) => {
          const width = layers.width;
          const height = level.nextlayerid - 2;
          return layers.data.map((id, index) => {
            return (
              <Entity
                key={[index, Z]}
                props={{
                  position: [index % width, Math.floor(index / width),height- Z],
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
