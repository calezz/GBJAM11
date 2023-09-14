import SpriteReader from "../helpers/SpriteReader";
import { useState, useEffect } from "react";

export default function Entity(props) {
  const { position, ...rest } = props.props;
  const [iso, setIso] = useState([
    (position[0] * 16) / 2 - (position[1] * 16) / 2,
    (position[0] * 16) / 4 + (position[1] * 16) / 4 + (position[2] * 16) / 2,
  ]);

  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }



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
