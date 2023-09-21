import './App.css'
import Display from './display/Display'
import DevMenu from './helpers/DevMenu'
import GameLoop from './helpers/GameLoop'

function App (){
  return (<>
    <GameLoop/>
    <Display/>

      <DevMenu/>
    
  </>
  )
}

export default App
