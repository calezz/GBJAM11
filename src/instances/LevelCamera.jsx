import Level from "./Level";
import { useState,useEffect } from "react";

export default function LevelCamera(){
    const [iso, setIso] = useState([88, 40]);


    useEffect(() => {
        const keyHandler = (e) => {
          if (e.key === "w") {
            setIso((prev) => [prev[0] - 8, prev[1] + 4]); // Inverse the addition and subtraction
          }
          if (e.key === "d") {
            setIso((prev) => [prev[0] - 8, prev[1] - 4]); // Inverse the addition and subtraction
          }
          if (e.key === "a") {
            setIso((prev) => [prev[0] + 8, prev[1] + 4]); // Inverse the addition and subtraction
          }
          if (e.key === "s") {
            setIso((prev) => [prev[0] + 8, prev[1] - 4]); // Inverse the addition and subtraction
          }
          if (e.key === " ") {
            setIso((prev) => [prev[0], prev[1] + 8]); // Inverse the addition and subtraction
          }
          if (e.key === "Control") {
            setIso((prev) => [prev[0], prev[1] - 8]); // Inverse the addition and subtraction
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