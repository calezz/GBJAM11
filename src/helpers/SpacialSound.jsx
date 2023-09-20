import { useEffect, useRef, useState } from "react";

export default function SpacialSound() {
  const [channel1, setChannel1] = useState();
  const [channel2, setChannel2] = useState();
  const [channel3, setChannel3] = useState();
  const [channel4, setChannel4] = useState();
const audio = useRef(null)






  return (
    <>
        <p>directional audio</p>
      <br />
      <input type="range" />
      <br />
      <input type="range" />
      <br />

      {}
    </>
  );
}
