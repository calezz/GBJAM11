import { memo } from "react"
import Entity from "./Entity"
const Entities = memo((prop)=>{

    const entities = useGameContext((state)=>state.entities)

    return (<>
    {entities.map(entity=><Entity position={entity.position} key={entity.position}/>)}
    {console.log("ENTITIES")}
    </>
    )
})
export default Entities