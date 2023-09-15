import { memo } from "react"
const RenderTest = memo(()=>{
    console.log("render")
    return (<p>HELLO{console.log("render2")}</p>)
})

export default RenderTest