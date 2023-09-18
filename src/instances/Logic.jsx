

export default function LogicStore(){
    const [cameraPosition,setCameraPosition] = useState([0,0])
    const handleCameraPosition = useCallback(()=>{
        console.log("hiii")
        setCameraPosition((prev) => [prev[0] - 8, prev[1] + 4])
    },[])

    //cameraContext
    //playerPosition
    //otherEntities
    //other key info
 
    const context = useMemo(() => {
        return {  handleCameraPosition };
      }, [ handleCameraPosition]);
}