import ThemeAudio from '../audio/ThemeAudio'
import Display from '../display/Display'
import GameLoop from '../helpers/GameLoop'
export default function Game(){
    return(<> 
    <GameLoop/>
    <Display/>
    <ThemeAudio></ThemeAudio>
    </>)
}