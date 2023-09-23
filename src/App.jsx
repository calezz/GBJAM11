import { useEffect } from 'react'
import './App.css'

import Game from './instances/Game'
import { useGameContext } from './store/GameContext'
function App (){
  const fetch = useGameContext((state)=>state.fetchSprites)
  const fetched = useGameContext((state)=>state.fetched)
  
  useEffect(()=>{
    
    fetch();
  },[])

return (<>
  
 <div id="display">    
 <img src="/titlescreen.png"/> 
    </div>
   {fetched&&<Game/>}
  </>
  )
}

export default App
