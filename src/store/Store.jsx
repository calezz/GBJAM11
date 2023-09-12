import { create } from "zustand";

const useLogicStore = create((set)=>({
    count:0,
    incrementCount: ()=>set((state)=>({count:state.count+1})),
    clearCount:()=>set({count:0})
}))

export {useLogicStore}