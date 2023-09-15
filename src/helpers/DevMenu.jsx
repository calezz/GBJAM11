import SpacialSound from "./SpacialSound";
import { devStore } from "../store/devStore";

export default function DevMenu() {
  const {frameRate,setFramerate} = devStore()

  const style = {
    position: "absolute",
    left: "10",
  };

  const handleFramerateChange = (e) => {
    setFramerate(e.target.value); // Call setFramerate from the store to update the frameRate
  };
  console.log(frameRate)
  return (
    <div style={style}>
      <ul>
        <li>
          <SpacialSound />
          {/*<input placeholder="framerate" type="number" onChange={handleFramerateChange}/>*/}
        </li>
      </ul>
    </div>
  );
}
