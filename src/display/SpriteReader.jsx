import { useEffect, useRef } from "react";

export default function SpriteReader() {
  const canvasRef = useRef(null);
 
  const [X,Y] = [16,16] //placeholder for cartesian 4 bit
  const [isoX,isoY] = [X/2-Y/2,X/4+Y/4] //cartesian 4 bit to iso
  const style={
    transform:`translate(${isoX}px,${isoY}px)`
}
  const [WIDTH,HEIGHT] = [16,16] // asset size will be input here
  const [DX,DY] = [0,0] // where the sprite will be drawn from relative to its own canvas 
  
  //TODO ASSET POSITION
  useEffect(() => {
    const image = new Image();
    image.src = "./src/assets/placeholder2.png";
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
    return () => ctx.clearRect(0, 0, 160, 144);
  });

  return (
    <>
      <canvas ref={canvasRef} style={style} height={`${HEIGHT}`} width={`${WIDTH}`} />
    </>
  );
}
