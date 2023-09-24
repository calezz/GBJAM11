import { useEffect } from "react"

export default function ThemeAudio(){
 const audio = new Audio("maintheme.mp3")
 useEffect(()=>{
    audio.play()
 },[])
 return(<>
       
       </> 
    )
}