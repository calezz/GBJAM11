import { create } from "zustand";

export const useGameContext = create((set,get) => ({
  entities: [],
  setEntities: (value) => set({ entities: value }),
  cameraPosition: [72, 0],
  playerPosition: [72, 64],
  movePlayer: (value) =>
    set((prev) => ({
      playerPosition: [
        prev.playerPosition[0] + value[0],
        prev.playerPosition[1] + value[1],
      ],
      cameraPosition: [
        prev.cameraPosition[0] - value[0],
        prev.cameraPosition[1] - value[1],
      ],
    })),

  //rewrite using promise.all to fetch them in a batch
  spriteSheet: {},
  level: {},
  fetchSprites: async (src) => {
    try {
      const dataPromises = {};
      for (const key in src) {
        const response = await fetch(`/${src[key]}.json`);
        const data = await response.json();
        
        if(key==="level"){

          console.log(data.layers.map((layer, Z) => {
            const width = 16;
            return layer.chunks.map((chunk) => {
              const chunkX = chunk.x;
              const chunkY = chunk.y;

              return chunk.data.filter((id)=>id!==0).map((id, index) => {
                if(id!==0){
                  return ({
                    key: [
                      chunkX + (index % width) + 2 * Z,
                      chunkY + Math.floor(index / width) + 2 * Z,
                      Z,
                    ],
                    position: [
                      chunkX + (index % width) + 2 * Z,
                      chunkY + Math.floor(index / width) + 2 * Z,
                      Z,
                    ],
                    snippet: {
                      state: "static",
                      id,
                      src: get().config.src,
                      columns: data.tilesets[0].columns,
                      size: [16, 16],
                    },
                  })
                }
              });
            });
          }
          
          ))
          
        }
        dataPromises[key] = data;

      }
      set(dataPromises);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  },

  //dumb placeholeders
  //GameInstance
  config: {
    name: "tileshowcase",
    src: "tileset",
    spriteSheet: "main_char",
  },
}));

//instantly fetches needed data
useGameContext.getState().fetchSprites({ spriteSheet: "main_char", level: "tileshowcase"}); //prettier-ignore

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
/*
level.layers.map((layer, Z) => {
  const width = 16;
  return layer.chunks.map((chunk) => {
    const chunkX = chunk.x;
    const chunkY = chunk.y;
    return chunk.data.map((id, index) => {
      id !== 0 &&
        entities.push({
          key: [
            chunkX + (index % width) + 2 * Z,
            chunkY + Math.floor(index / width) + 2 * Z,
            Z,
          ],
          position: [
            chunkX + (index % width) + 2 * Z,
            chunkY + Math.floor(index / width) + 2 * Z,
            Z,
          ],
          snippet: {
            state: "static",
            id,
            src: config.src,
            columns: level.tilesets[0].columns,
            size: [16, 16],
          },
        });
    });
  });
});
*/