import Level from "../instances/Level";

export default function Display(){
  const style = {
    //global movements
    transform: `translate(${0}px,${0}px)`,
  };
    return (
    <div id="display">
   <div style={style}> <Level/>
    </div>
   
  </div>)
  
}