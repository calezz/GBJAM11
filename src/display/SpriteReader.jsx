import { useEffect, useRef, useState } from "react";
import { useLogicStore } from "../store/Store";

export default function SpriteReader() {
  const [iso,setIso]=useState([0,0])

  const store = useLogicStore((state) => state.count);
  const canvasRef = useRef(null);
  const [X, Y, Z] = [16, 16, -16]; //placeholder for cartesian 4 bit
  const [isoX, isoY] = [X / 2 - Y / 2, X / 4 + Y / 4 + Z / 2]; //cartesian 4 bit to iso
  const style = {
    transform: `translate(${iso[0]}px,${iso[1]}px)`,
  };
  const [WIDTH, HEIGHT] = [16, 16]; // asset size will be input here
  const [DX, DY] = [0, 0]; // where the sprite will be drawn from relative to its own canvas

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
      window.addEventListener("keydown",keyHandler)
      return ()=>{
        window.removeEventListener("keydown",keyHandler)
      }
  },[iso])
  useEffect(() => {
    const image = new Image();
    image.src = "/placeholder2.png";
    console.log("load")
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sourceX = 0;
    const sourceY = 0;
    const sourceWidth = WIDTH;
    const sourceHeight = HEIGHT;
    const offsetX = 0;
    const offsetY = 0;
    const destinationX = DX;
    const destinationY = DY;
    const destinationWidth = WIDTH;
    const destinationHeight = HEIGHT;
    ctx.imageSmoothingEnabled = false;
    image.onload = ()=>{
      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destinationX + offsetX,
        destinationY + offsetY,
        destinationWidth,
        destinationHeight
      );
    }
    return () => ctx.clearRect(0, 0, 160, 144);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={style}
        height={`${HEIGHT}`}
        width={`${WIDTH}`}
      />
    </div>
  );
}
