import { useEffect, useRef, useState, memo } from "react";
import { useGameContext } from "../store/GameContext";

const SpriteReader = memo(({id,orientation, position }) => {
  const config = useGameContext((state) => state.config);
  const spriteSheet = useGameContext((state) => state.spriteSheet);
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [size, setSize] = useState([16, 16]);

  const [sprite, setSprite] = useState(
    spriteSheet.meta.slices.filter(
      (slice) => slice.name === `Slice ${id}`
    )[0] ??
      spriteSheet.meta.slices.filter((slice) => slice.name === `Slice ${1}`)[0]
  );

  const [opacity, setOpacity] = useState(1);
  const scale = 1;
  useEffect(() => {
    setSprite(
      spriteSheet.meta.slices.filter(
        (slice) => slice.name === `Slice ${id}`
      )[0] ??
        spriteSheet.meta.slices.filter((slice) => slice.name === `Slice ${1}`)[0]
    )
    let timeoutId;
    const incrementFrame = () => {
      setCurrentFrame((prevCurrentFrame) => (prevCurrentFrame +1)%sprite.keys.length);
      timeoutId = setTimeout(incrementFrame, 70); // Repeat after 100 milliseconds
    };
    if (sprite.keys.length> 1) {
      incrementFrame();
    }
    // Return a cleanup function to clear the timeout when the component unmounts or state changes
    return () => clearTimeout(timeoutId);
  }, [id]);

  useEffect(() => {
  //  console.log("frame"+currentFrame,sprite.name)
    const image = new Image();
    image.src = `/${config.src}.png`;

    const WIDTH = sprite.keys[currentFrame].bounds.w;
    const HEIGHT = sprite.keys[currentFrame].bounds.h;
    const OX = sprite.keys[currentFrame].bounds.x;
    const OY = sprite.keys[currentFrame].bounds.y;

    //preparing variables
    setSize([HEIGHT, WIDTH]);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sourceX = OX; //
    const sourceY = OY; //
    const sourceWidth = WIDTH; //
    const sourceHeight = HEIGHT; //
    const offsetX = 0; //not implemented
    const offsetY = 0; //not implemented
    const destinationX = 0; //where on canvas to draw
    const destinationY = 0;
    const destinationWidth = WIDTH; //
    const destinationHeight = HEIGHT; //
    ctx.imageSmoothingEnabled = false;

    //Drawing canvas
    image.onload = () => {
      ctx.clearRect(0, 0, 160, 144);
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
      //     return ()=>clearRect(0, 0, 160, 144);
    };
  }, [currentFrame]);

  //dev tool
  function handleClick() {
    console.log(position, "id:" + id);
    setOpacity(() => 0.5);
  }
  const style = {
    position: "absolute",
    opacity: opacity,
    transform:`scale(${orientation[0]},${orientation[1]})`
  };
  return (
    <>
      {id > 0 && (
        <canvas
          ref={canvasRef}
          width={size[0]}
          height={size[1]}
          style={style}
          onMouseDown={handleClick}
          onMouseUp={() => setOpacity(1)}
        />
      )}
    </>
  );
});
export default SpriteReader;
