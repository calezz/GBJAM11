import LevelCamera from "../instances/LevelCamera";


export default function Display(){
  const style = {
    //global movements
    transform: `translate(${0}px,${0}px)`,
  };
    return (
    <div id="display">
   <div style={style}> <LevelCamera config={{
    name: "floortest",
    src: "placeholder",
    spriteSheet: "main_char",
  }}/>
    </div>
   
  </div>)
  
}