import { useEffect } from 'react'
import './App.css'

import Game from './instances/Game'
import { useGameContext } from './store/GameContext'
import ThemeAudio from './audio/ThemeAudio'
import WinDisplay from './instances/Win'
function App (){
  const fetch = useGameContext((state)=>state.fetchSprites)
  const fetched = useGameContext((state)=>state.fetched)
  const won = useGameContext((state)=>state.won)

  useEffect(()=>{
    if(!fetched){
      fetch()
    }
  },[fetched])
  const style={
    position:"absolute"
  }
return (<>

  <ThemeAudio/>
 <div id="display">    
 <img src="/titlescreen.png" style={style}/>
 {won&&<WinDisplay></WinDisplay>} 
    </div>
   {!won&&fetched&&<Game/>}
  </>
  )
}

export default App
