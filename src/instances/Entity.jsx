import SpriteReader from "../helpers/SpriteReader";
import { useState, useEffect } from "react";

export default function Entity(props) {
  const { position, ...rest } = props.props;
  const [iso, setIso] = useState([
    (position[0] * 16) / 2 - (position[1] * 16) / 2,
    (position[0] * 16) / 4 + (position[1] * 16) / 4 + (position[2] * 16) / 2,
  ]);

  useEffect(() => {
    if(rest.snippet.id===500){
    const keyHandler = (e) => {
      if (e.key === "w") {
        setIso((prev)=>[prev[0] + 8, prev[1] - 4]);
      }
      if (e.key === "d") {
        setIso((prev)=>[prev[0] + 8, prev[1] + 4]);
      }
      if (e.key === "a") {
        setIso((prev)=>[prev[0] - 8, prev[1] - 4]);
      }
      if (e.key === "s") {
        setIso((prev)=>[prev[0] - 8, prev[1] + 4]);
      }
    };
    //movement controller
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    }}
}, []);


  const style = {
    transform: `translate(${iso[0]}px,${iso[1]}px)`,
    zIndex: `${position[0]*100+position[1]*100+position[2]}`
  };

  return (
    <>
      {rest.snippet.id>0 && (
        <div style={style}>

          <SpriteReader props={rest} />
        </div>
      )}
    </>
  );
}
