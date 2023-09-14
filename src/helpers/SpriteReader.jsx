//TODO add a replacemnt config for while its being
//can improve speed by using a store for json data
import { useEffect, useRef, useState,useLayoutEffect } from "react";

export default function SpriteReader(props) {

  const canvasRef = useRef(null);
  const [metadata, setMetadata] = useState(null);
  const [frame, setFrame]=useState(null)
  const [isLoading, setIsLoading] = useState(true); //not implemented yet
  const [size,setSize]=useState([16,16])
  const [state,setState]=useState("idle")
  //Might need to migrate this later
  // const [X, Y, Z] = [16, 16, -16]; //placeholder for cartesian 4 bit
  //const [isoX, isoY] = [X / 2 - Y / 2, X / 4 + Y / 4 + Z / 2]; //cartesian 4 bit to iso

 /* useEffect(() => {
    if(props.tilename){fetch(`/${props.tilename}.json`)
      .then((response) => response.json())

      .then((data) => setMetadata(data))
      .catch((error) => console.error("fetching error:", error))
      .finally(setIsLoading(false));}
  }, []);*/

  useEffect(() => {

    if(props.props.snippet.id){
      console.log("HELLO")
      const config =props.props.snippet
      const image = new Image();
      image.src = `/${config.src}.png`;
      let WIDTH, HEIGHT,OX,OY,DX,DY,scale
      [WIDTH, HEIGHT] = [config.size[0], config.size[1]];   
      [OX, OY] = [(((config.id-1)%config.columns))*WIDTH, (Math.floor((config.id-1)/config.columns))*HEIGHT]; 
      [DX, DY] = [0, 0]; 
      scale = 1;

      setSize([HEIGHT,WIDTH])
      
      const canvas = canvasRef.current;
      console.log(canvas)
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
      }
    }
   /* else if (metadata) {
      console.error("HMM")
      const image = new Image();
      image.src = `/${props.tilename}.png`;
      const config = metadata
      let WIDTH, HEIGHT,OX,OY,DX,DY,scale
      if(config?.meta?.app==="https://www.aseprite.org/"){
        //number of frames //current frame
     // console.log(config.frameTags.find(entry=>entry.name==="idle"))
     [WIDTH, HEIGHT] = [config.frames[`${props.tilename} 0.aseprite`].frame.w, config.frames[`${props.tilename} 0.aseprite`].frame.h]; // asset size will be input here
      [OX, OY] = [config.frames[`${props.tilename} 0.aseprite`].frame.x, config.frames[`${props.tilename} 0.aseprite`].frame.y]; // where the sprite will be read from
      [DX, DY] = [0, 0]; // where the sprite will be drawn from relative to its own canvas
      scale = config.meta.scale; //scale - dont see why i would ever need this but its here just in case
    }
    else{
      console.error("HMM")
      [WIDTH, HEIGHT] = [config.size[0], config.size[1]]; // asset size will be input here
      [OX, OY] = [config.drawOrigin[0], config.drawOrigin[1]]; // where the sprite will be read from
      [DX, DY] = [0, 0]; // where the sprite will be drawn from relative to its own canvas
      scale = config.scale; //scale - dont see why i would ever need this but its here just in case
    }
      console.log(HEIGHT,WIDTH)
    setSize([HEIGHT,WIDTH])
      
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
      }
    }*/}, []);
  return (
    <>
      {(metadata ||props.props.snippet.id>0) && (
        <canvas
          id ={props.props.snippet.id}
          ref={canvasRef}
          width={size[0]}
          height={size[1]}
        ></canvas>
      )}
    </>
  );
}
