import { memo } from "react"
import Entity from "./Entity"
const Entities = memo((prop)=>{
    console.log("ENTITIES")
    const entities = useGameContext((state)=>state.entities)
    console.log("RENEDERS")
    return (<>
    {entities.map(entity=><Entity position={entity.position} key={entity.position}/>)}
    </>
    )
})
export default Entities