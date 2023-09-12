import { useEffect, useState,useRef } from "react";


export default function DragAndScroll(props) {
  const [zoom, setZoom] = useState(1);
  const [toggle,setToggle] = useState(true)
  const [dragging, setDragging] = useState(false);
  const [positionX, setPostionX] = useState(16);
  const [positionY, setPostionY] = useState(16);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const ref=useRef()

  function handleMouseWheel(event) {
    event.preventDefault()
    if (event.deltaY > 0) {
      setZoom((prevzoom) => prevzoom *0.9);
    } else {
      setZoom((prevzoom) => prevzoom *1.1);
    }
  }

  function handleMouseDown(event) {
    event.preventDefault()
    setDragging(true);
    const rect = ref.current.getBoundingClientRect();
    const targetCenterX = Math.round(rect.left + rect.width / 2);
    const targetCenterY = Math.round(rect.top + rect.height / 2);
    setOffsetX(targetCenterX - event.pageX);
    setOffsetY(targetCenterY - event.pageY);
  }
  function handleMouseUp() {
    setDragging(false);
  }

  function dragPosListener(event) {
    setPostionX(event.x + offsetX);
    setPostionY(event.y + offsetY);
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", dragPosListener);
      return () => window.removeEventListener("mousemove", dragPosListener);
    }
  }, [dragging]);

  const scaleStyle = {
    display: "inline-block",
    transition: "transform 0.3s ease",
    willChange: "transform",
    position: "absolute",
    left: positionX,
    top: positionY,
    transform: `scale(${zoom}) translate(-${50 / zoom}%,-${50 / zoom}%) `,
    overflow: "visible",
    margin: "0",
    padding: "0",
  };
  return (
    <>
<div
        draggable="false"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleMouseWheel}
        style={scaleStyle}
        className="outline"
        ref={ref}
      >   
        {props.children}  
      </div>
      
    </>
  );
}
