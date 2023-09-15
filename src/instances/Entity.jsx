import SpriteReader from "../helpers/SpriteReader";
import { useState, useEffect, useRef,forwardRef } from "react";

const Entity = forwardRef(function(props,entityRef){
//  const entityRef = useRef(null);
  const [iso, setIso] = useState([
    (props.props.position[0] * 16) / 2 - (props.props.position[1] * 16) / 2,
    (props.props.position[0] * 16) / 4 + (props.props.position[1] * 16) / 4 + (props.props.position[2] * 16) / 2,
  ]);
  useEffect(() => {   
    if(props.props.snippet.id===500){
    const keyHandler = (e) => {
      if (e.key === "w") {
        setIso((prev)=>[prev[0] + 8, prev[1] - 4]);
        props.props.position = [props.props.position[0], props.props.position[1]-1,props.props.position[2]]
        props.props.snippet.state="walking_human"
      }
      if (e.key === "d") {
        setIso((prev)=>[prev[0] + 8, prev[1] + 4]);
        props.props.position = [props.props.position[0] +1, props.props.position[1],props.props.position[2]]
        props.props.snippet.state="walking_human"
      }
      if (e.key === "a") {
        setIso((prev)=>[prev[0] - 8, prev[1] - 4]);
        props.props.position = [props.props.position[0] -1, props.props.position[1],props.props.position[2]]
        props.props.snippet.state="walking_back_human"
      }
      if (e.key === "s") {
        setIso((prev)=>[prev[0] - 8, prev[1] + 4]);
        props.props.position = [props.props.position[0], props.props.position[1] +1,props.props.position[2]]
        props.props.snippet.state="walking_back_human"
      }
      if (e.key === " ") {
        setIso((prev)=>[prev[0], prev[1] -8]);
        props.props.position = [props.props.position[0] , props.props.position[1],props.props.position[2]+1]
        props.props.snippet.state="jumping_human_front"
        
      }
      if (e.key === "Control") {
        setIso((prev)=>[prev[0] , prev[1] +8]);
        props.props.position = [props.props.position[0] , props.props.position[1],props.props.position[2]-1]
        props.props.snippet.state="jumping_human_back"
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
    zIndex:props.props.position[0]*100+props.props.position[1]*10000+props.props.position[2] ,
    opacity:`${1}`
  };
  return (
    <>
      {props.props.snippet.id>0 && (
        <div style={style} ref={entityRef} position={props.props.position} type={"character"}>
          {props.props.snippet.state!=="static"&&console.log(props.props.snippet.state)}
          <SpriteReader props={props.props} zIndex={style.zIndex} />
        </div>
      )}
    </>
  );
})
export default Entity