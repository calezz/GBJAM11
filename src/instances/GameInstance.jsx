import LevelCamera from "./LevelCamera";
import {

  useCallback,
  useEffect,
  useState,
  memo,
  useMemo,

} from "react";
import { GameContext } from "./GameContext";

const GameInstance = memo(({ children }) => {
  const [context, setContext] = useState({
    // Your initial context data here
    cameraPosition: [0,0],
    playerName: "Player 1",
    moveCamera: (input) => {
        setContext((prev)=>({ ...prev, cameraPosition:[prev.cameraPosition[0]+input[0],prev.cameraPosition[1]+input[1]] }));
    },
});

  const memoizedContextValue = useMemo(() => context, [context]);
  return (
    <GameContext.Provider value={memoizedContextValue}>
      {children}
    </GameContext.Provider>
  );
});
export default GameInstance;
