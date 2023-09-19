import { useGameContext } from "../store/GameContext";

export default function Background(){
    const fetch =  useGameContext((state)=>state.fetchSprites)
    const spriteSheet =  useGameContext((state)=>state.spriteSheet)
    const levelLayout =  useGameContext((state)=>state.levelLayout)


    console.log(spriteSheet,levelLayout)
}