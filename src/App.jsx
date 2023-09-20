import './App.css'
import Display from './display/Display'
import DevMenu from './helpers/DevMenu'
import GameInitializer from './helpers/GameInitializer'
function App (){
  return (<>
   <GameInitializer />
    <Display/>

      <DevMenu/>
    
  </>
  )
}

export default App
