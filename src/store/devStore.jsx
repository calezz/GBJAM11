import { create } from "zustand";

const devStore = create((set)=>({
    frameRate:0,    
    setFrameRate: (value)=>set({frameRate:value}),
    clearCount:()=>set({count:0})
    
}))

export {devStore}