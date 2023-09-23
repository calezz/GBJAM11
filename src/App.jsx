import { useEffect } from 'react'
import './App.css'

import Game from './instances/Game'
import { useGameContext } from './store/GameContext'
function App (){
  const fetched = useGameContext((state)=>state.fetched)
  return (<>
 <div id="display">    
 <img src="/public/titlescreen.png"/> 
    </div>
   {fetched&&<Game/>}
  </>
  )
}

export default App
