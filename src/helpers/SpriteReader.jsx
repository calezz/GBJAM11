//TODO add a replacemnt config for while its being

import { useEffect, useRef, useState } from "react";

export default function SpriteReader(props) {
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);
  
  //Might need to migrate this later
  // const [X, Y, Z] = [16, 16, -16]; //placeholder for cartesian 4 bit
  //const [isoX, isoY] = [X / 2 - Y / 2, X / 4 + Y / 4 + Z / 2]; //cartesian 4 bit to iso

  let WIDTH = 16;
  let HEIGHT = 16;

  useEffect(() => {
    fetch(`/src/assets/${props.tilename}.json`)
      .then((response) => response.json())
      .then((data) => setMetadata(data))
      .catch((error) => console.error("fetching error:", error))
      .finally(setIsLoading(false));
  }, []);

  useEffect(() => {
    if (metadata) {
      const image = new Image();
      const config = metadata;
      [WIDTH, HEIGHT] = [config.size[0], config.size[1]]; // asset size will be input here
      const [OX, OY] = [config.drawOrigin[0], config.drawOrigin[1]]; // where the sprite will be read from
      const [DX, DY] = [0, 0]; // where the sprite will be drawn from relative to its own canvas
      const scale = config.scale; //scale - dont see why i would ever need this but its here just in case

      image.src = `/${props.tilename}.png`;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const sourceX = OX; //
      const sourceY = OY; //
      const sourceWidth = WIDTH; //
      const sourceHeight = HEIGHT; //
      const offsetX = 0; //not implemented
      const offsetY = 0; //not implemented
      const destinationX = DX;
      const destinationY = DY;
      const destinationWidth = WIDTH; //
      const destinationHeight = HEIGHT; //
      ctx.imageSmoothingEnabled = false;
      image.onload = () => {
        ctx.drawImage(
          image,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          destinationX + offsetX,
          destinationY + offsetY,
          destinationWidth * scale,
          destinationHeight * scale
        );

        return () => ctx.clearRect(0, 0, 160, 144);
      };
    }
  }, [metadata]);

  return (
    <>
      {metadata && (
        <canvas
          ref={canvasRef}
          width={`${WIDTH}`}
          height={`${HEIGHT}`}
        />
      )}
    </>
  );
}
