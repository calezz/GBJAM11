import Display from '../display/Display'
import GameLoop from '../helpers/GameLoop'
import { useGameContext } from '../store/GameContext'
import WinDisplay from './Win'
export default function Game(){
    
    return(<> 
  
        <>
        <GameLoop/>
        <Display/>
        </>

        
    </>)
}