import SpriteReader from "../helpers/SpriteReader";
import { useState, useEffect, useRef,forwardRef, useContext } from "react";
import { useGameContext} from "../store/GameContext";
const Entity = forwardRef(function(props,entityRef){  
  const iso = [
    ((props.props.position[0]-props.props.position[2]) * 16) / 2 - ((props.props.position[1]-props.props.position[2]) * 16) / 2,
    ((props.props.position[0]-props.props.position[2]) * 16) / 4 + ((props.props.position[1]-props.props.position[2]) * 16) / 4 - (props.props.position[2] * 16) / 2,
  ]
  const style = { //on rework implement offset 
    transform: `translate(${iso[0]+(props.props.snippet.state!=="static"&&0) }px,${iso[1]+(props.props.snippet.state!=="static"&&-2)}px)`,
    position: 'relative',
    zIndex:props.props.position[0]*100+props.props.position[1]*1000+props.props.position[2]*1+ (props.props.snippet.state!=="static"&&0  ) ,
    opacity:`${1}`
  };

  //console.log("Entity",props.props.position)

  return (
    <>
      {props.props.snippet.id>0 && (
        <div style={style} ref={entityRef} >
          <SpriteReader props={props.props} zIndex={style.zIndex} />
        </div>
      )}
    </>
  );
})
export default Entity