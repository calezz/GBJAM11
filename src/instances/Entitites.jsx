import Entity from "./Entity"
export default function Entities(){
    const entities = useGameContext((state)=>state.entities)

    return (<>
    {entities.map(entity=><Entity props={entity} key={entity.key}/>)}
    </>
    )
}