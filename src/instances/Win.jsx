import { useEffect, useRef } from "react"

export default function WinDisplay(){
    const ref = useRef(null)

    useEffect(()=>{
        const ctx= ref.current.getContext("2d")
        ctx.font = "italic small-caps bold 35px arial"
        ctx.fillStyle='#9ff4e5'
        ctx.fillText("you won",5,80)
    },[])
    const style = {
        position: "absolute",
        scale:"1",
      };
    return (<canvas width={160} height={144} style={style} ref={ref}></canvas>)
}