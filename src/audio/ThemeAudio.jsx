import { useEffect } from "react"

export default function ThemeAudio(){

const playlist=["maintheme.mp3","GBJam11_Tune_1.mp3","GBJam11_Tune_2.mp3","GBJam11_Tune_3.mp3","Retro_mod.mp3","Retro_pain.mp3"]
 const audio = new Audio("maintheme.mp3")
 
 useEffect(()=>{
    let i=0
    window.addEventListener("keydown",()=> audio.play());
    audio.addEventListener("ended",function(){
        i++
        audio.src=playlist[i%playlist.length]
        audio.play()
    })
    
 },[])
 return(<>
       
       </> 
    )
}