import SpriteReader from "../helpers/SpriteReader";
import { useState, useEffect } from "react";

export default function Entity(props) {
  const { positionInitial, ...rest } = props.props;
  const [pos,setPos] = useState(positionInitial)
  const [iso, setIso] = useState([
    (positionInitial[0] * 16) / 2 - (positionInitial[1] * 16) / 2,
    (positionInitial[0] * 16) / 4 + (positionInitial[1] * 16) / 4 + (positionInitial[2] * 16) / 2,
  ]);

  useEffect(() => {   
    if(rest.snippet.id===500){
    const keyHandler = (e) => {

      if (e.key === "w") {
        setIso((prev)=>[prev[0] + 8, prev[1] - 4]);
        setPos((prev)=>[prev[0], prev[1]-1,prev[2]])
        rest.snippet.state="walking_human"
      }
      if (e.key === "d") {
        setIso((prev)=>[prev[0] + 8, prev[1] + 4]);
        setPos((prev)=>[prev[0] +1, prev[1],prev[2]])
        rest.snippet.state="walking_human"
      }
      if (e.key === "a") {
        setIso((prev)=>[prev[0] - 8, prev[1] - 4]);
        setPos((prev)=>[prev[0] -1, prev[1],prev[2]])
        rest.snippet.state="walking_back_human"
      }
      if (e.key === "s") {
        setIso((prev)=>[prev[0] - 8, prev[1] + 4]);
        setPos((prev)=>[prev[0] , prev[1]+1,prev[2]])
        rest.snippet.state="walking_back_human"
      }
      if (e.key === " ") {
        setIso((prev)=>[prev[0], prev[1] -8]);
        setPos((prev)=>[prev[0] , prev[1],prev[2]+1])
        rest.snippet.state="jumping_human_front"
        
      }
      if (e.key === "Control") {
        setIso((prev)=>[prev[0] , prev[1] +8]);
        setPos((prev)=>[prev[0] , prev[1],prev[2]-1])
        rest.snippet.state="jumping_human_back"
        console.log("holding")
      }
    };
    //movement controller
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    }}
}, []);


  const style = {
    transform: `translate(${iso[0]}px,${iso[1]}px)`,
    position: 'relative',
    zIndex:pos[0]*100+pos[1]*100+pos[2] -(rest.snippet.id===500&&100) ,
  };
  return (
    <>
      {rest.snippet.id>0 && (
        <div style={style} >

          <SpriteReader props={rest} zIndex={style.zIndex} />
        </div>
      )}
    </>
  );
}
