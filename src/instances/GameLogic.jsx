import { useState, memo, useMemo } from "react";
import { createContext } from "react";
export const GameLogic = createContext()
    
const GameLogicProvider = memo(({ children }) => {
  const [context, setContext] = useState({
    cameraPosition: [0, 0],
    moveCamera: (input) => {
      setContext((prev) => ({
        ...prev,
        cameraPosition: [
          prev.cameraPosition[0] + input[0],
          prev.cameraPosition[1] + input[1],
        ],
      }))
    },
    entities:null,
    setEntities: (input) => {
      setContext((prev) => ({
        ...prev,
        entities: input,
      }))
    },
  });


  const memoizedContextValue = useMemo(() => context, [context]);
  return (
    <GameLogic.Provider value={memoizedContextValue}>
      {children}
    </GameLogic.Provider>
  );
});
export default GameLogicProvider;
