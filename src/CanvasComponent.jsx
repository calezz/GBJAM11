import { useEffect, useRef } from "react";

export default function CanvasComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = "./src/assets/placeholder2.png";
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sourceX = 0;
    const sourceY = 0;
    const sourceWidth = 16;
    const sourceHeight = 16;
    const offsetX = 0;
    const offsetY = 0;
    const destinationX = 0;
    const destinationY = 0;
    const destinationWidth = 16;
    const destinationHeight = 16;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#91db69";
    ctx.fillRect(0, 0, 160, 144);
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
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destinationX + offsetX,
      destinationY+8 + offsetY,
      destinationWidth,
      destinationHeight
    );
    return () => ctx.clearRect(0, 0, 160, 144);
  });

  return (
    <>
      <canvas ref={canvasRef} height="144" width="160" />
    </>
  );
}
