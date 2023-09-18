import { create } from "zustand";

export const useGameContext=create((set)=>({
    entities:[],
    setEntities:(value)=>set({entities:value}),
    cameraPosition:[0,0],
    moveCamera:(value)=>set((prev)=>({cameraPosition:[prev.cameraPosition[0]+value[0],prev.cameraPosition[1]+value[1]]})),
}))


export const useBearStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))