import SpriteReader from "../helpers/SpriteReader";
import { useState, useEffect} from "react";

export default function Entity(){
const [iso,setIso]=useState([0,0])

function keyHandler(e){
    if (e.key === "w") {
      setIso([iso[0]+8,iso[1]-4]) 
    }
    if (e.key === "d") {
        setIso([iso[0]+8,iso[1]+4]) 
      }
      if (e.key === "a") {
        setIso([iso[0]-8,iso[1]-4]) 
      }
      if (e.key === "s") {
        setIso([iso[0]-8,iso[1]+4]) 
      }
  }

  useEffect(()=>{
    //movement controller 
      window.addEventListener("keydown",keyHandler)
      return ()=>{
        window.removeEventListener("keydown",keyHandler)
      }
  },[iso])
const style = {
    transform: `translate(${iso[0]}px,${iso[1]}px)`,
  };

    return(  
        <div style={style}>
            <SpriteReader tilename="placeholder2"/>
        </div>
    )
}