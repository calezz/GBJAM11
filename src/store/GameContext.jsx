import { create } from "zustand";

export const useGameContext = create((set) => ({
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
        if (src.hasOwnProperty(key)) {
          const response = await fetch(`/${src[key]}.json`);
          const data = await response.json();
          dataPromises[key] = data;
        }
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
useGameContext
  .getState()
  .fetchSprites({ spriteSheet: "main_char", level: "tileshowcase"});
export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

//fetchSprites ({spriteSheet:"main_char",levelLayout:"floortest"})
