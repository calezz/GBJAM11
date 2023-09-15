import Level from "./Level";
import { useState,useEffect } from "react";
import RenderTest from "./RenderTest";

export default function LevelCamera(){
    const [iso, setIso] = useState([88, 40]);


    useEffect(() => {
        const keyHandler = (e) => {
          if (e.key === "w") {
            setIso((iso) => [iso[0] - 8, iso[1] + 4]); // Inverse the addition and subtraction
          }
          if (e.key === "d") {
            setIso((iso) => [iso[0] - 8, iso[1] - 4]); // Inverse the addition and subtraction
          }
          if (e.key === "a") {
            setIso((iso) => [iso[0] + 8, iso[1] + 4]); // Inverse the addition and subtraction
          }
          if (e.key === "s") {
            setIso((iso) => [iso[0] + 8, iso[1] - 4]); // Inverse the addition and subtraction
          }
          if (e.key === " ") {
            setIso((iso) => [iso[0], iso[1] + 8]); // Inverse the addition and subtraction
          }
          if (e.key === "Control") {
            setIso((iso) => [iso[0], iso[1] - 8]); // Inverse the addition and subtraction
          }
        };
        //movement controller
        window.addEventListener("keyup", keyHandler);
        return () => {
          window.removeEventListener("keyup", keyHandler);
        };
      }, []);



      const style = {
        transform: `translate(${iso[0]}px,${iso[1]}px)`,
      };

      return(<div style={style}>{<Level/>}</div>)
}