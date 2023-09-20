import './App.css'
import Display from './display/Display'
import DevMenu from './helpers/DevMenu'
import { useGameContext } from './store/GameContext'
function App() {

  return (<>
    <Display/>

      <DevMenu/>
    
  </>
  )
}

export default App
