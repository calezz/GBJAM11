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
  spriteSheet: {},
  levelLayout: {},
  fetchSprites: async (src) => {
    const responseSprite = await fetch(`/${src.spriteSheet}.json`);
    const responseLevelLayout = await fetch(`/${src.levelLayout}.json`);
    set({
      spriteSheet: await responseSprite.json(),
      levelLayout: await responseLevelLayout.json(),
    });
  },
}));

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));



//fetchSprites ({spriteSheet:"main_char",levelLayout:"floortest"})
