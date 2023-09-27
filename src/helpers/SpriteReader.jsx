import { useEffect, useRef, useState, memo } from "react";
import { useGameContext } from "../store/GameContext";

const SpriteReader = memo(({id,orientation,defaultState, position,zIndex }) => {
  const config = useGameContext((state) => state.config);
  const spriteSheet = useGameContext((state) => state.spriteSheet);
  const setPlayerState= useGameContext((state) => state.setPlayerState);
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [size, setSize] = useState([16, 16]);
  const [opacity, setOpacity] = useState(1);
  
  const scale = 1;
  const sprite = spriteSheet.meta.slices.filter((slice) => slice.name === `Slice ${id}`)[0] ??spriteSheet.meta.slices.filter((slice) => slice.name === `Slice ${1}`)[0]
 // if(id===116){console.log("SLIMEY" ,id,orientation,defaultState, position,zIndex)}
  useEffect(() => {
    setCurrentFrame(0)
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

    //reset animations
    if(defaultState===92){
      if(sprite.keys.length>1&&(currentFrame===sprite.keys.length-1)){    
        setCurrentFrame(0)
        setPlayerState([defaultState,orientation]);
      }
    }

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
   // if(id===116||92){console.log("SLIMEY" ,id,orientation,defaultState, position,zIndex)}
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
    console.log(position.map(position=>position/16), "id:" + id, "zindex:",zIndex);
    setOpacity(() => 0.5);
  }
  const style = {
    position: "absolute",
    opacity: opacity,
    transform:`scale(${orientation[0]},${orientation[1]})`,
    zIndex:zIndex,
  };
  return (
    <>
      {id > 0 && (
        <canvas
          ref={canvasRef}
          width={size[0]}
          height={size[1]}
          style={style}
        onClick={handleClick}
        />
      )}
    </>
  );
});
export default SpriteReader;
