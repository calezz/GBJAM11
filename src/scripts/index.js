import { useLogicStore } from "../store/Store";


function incre(){
    const incrementCount = useLogicStore((state)=>state.incrementCount)
    incrementCount
}



