//TODO add a replacemnt config for while its being
//can improve speed by using a store for json data
import { useEffect, useRef, useState} from "react";

export default function SpriteReader(props) {
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [size, setSize] = useState([16, 16]);
  const [opacity,setOpacity]=useState(1)
  
  useEffect(() => {
 //  console.log("reset")
    setCurrentFrame(-1) //reset on state change
    let timeoutId;
    const incrementFrame = () => {
      setCurrentFrame((prevCurrentFrame) => prevCurrentFrame + 1);
      timeoutId = setTimeout(incrementFrame, 70); // Repeat after 100 milliseconds
    };
  
    if (props.props.snippet.state !== "static") {
      incrementFrame();
    }
  
    // Return a cleanup function to clear the timeout when the component unmounts or state changes
    return () => clearTimeout(timeoutId);
  }, [props.props.snippet.state]);
  useEffect(() => {
    
 //  console.log(currentFrame,props.props.snippet.state)
    const image = new Image();
    let WIDTH, HEIGHT, OX, OY, DX, DY, scale;
    let displayFrame = 0;
    
    if (props.props.snippet.id === 500) {
      const frametags = props.props.snippet.spriteSheet.meta.frameTags.find(
        (obj) => obj.name === props.props.snippet.state
      );

      // Check animation
      const frameCount = frametags.to - frametags.from + 1;
      displayFrame = frametags.from + (currentFrame % frameCount);

      //resets the animation if near completion //wrap in if statement to make repeatable
      currentFrame % frameCount === (frameCount - 1) &&
        ((props.props.snippet.state = "idle_human_02")&&setCurrentFrame(0))

      const config = props.props.snippet.spriteSheet;

      image.src = `/${props.props.snippet.src}.png`;
      const frameData =
        config.frames[`${props.props.snippet.src} ${displayFrame}.aseprite`];
      if (frameData) {
        WIDTH = frameData.frame.w;
        HEIGHT = frameData.frame.h;
        OX = frameData.frame.x;
        OY = frameData.frame.y;
        DX = 0;
        DY = 0;
        scale = 1;
      }
    } else if (props.props.snippet.id)
      try {
        //draw tiles
        const config = props.props.snippet;
        image.src = `/${config.src}.png`;
        [WIDTH, HEIGHT] = [config.size[0], config.size[1]];
        [OX, OY] = [
          ((config.id - 1) % config.columns) * WIDTH,
          Math.floor((config.id - 1) / config.columns) * HEIGHT,
        ];
        [DX, DY] = [0, 0];
        scale = 1;
      } catch {
        console.error("Check if you are funneling right ids in here.", error);
      }
      
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
    const destinationX = DX;
    const destinationY = DY;
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

  function handleClick(){
  
    console.log(props.props.position,"id:"+props.props.snippet.id)
    setOpacity(()=>.5)
    
  }
  const style = {
    position: "absolute",
    zIndex: props.zIndex,
    opacity:opacity,
  };
  return (
    <>
      {props.props.snippet.id > 0 && (
        <canvas
          id={props.props.snippet.id}
          ref={canvasRef}
          width={size[0]}
          height={size[1]}
          style={style}
          onMouseDown={handleClick}
          onMouseUp={()=>setOpacity(1)}
        />
      )}
    </>
  );
}
