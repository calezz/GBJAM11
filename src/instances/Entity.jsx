import SpriteReader from "../helpers/SpriteReader";
import { useState, useEffect, useRef,forwardRef } from "react";

const Entity = forwardRef(function(props,entityRef){
//  const entityRef = useRef(null);
  const [iso, setIso] = useState([
    (props.props.position[0] * 16) / 2 - (props.props.position[1] * 16) / 2,
    (props.props.position[0] * 16) / 4 + (props.props.position[1] * 16) / 4 + (props.props.position[2] * 16) / 2,
  ]);


props.props.snippet.state!=="static"&&console.log(props.props.snippet.state)
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