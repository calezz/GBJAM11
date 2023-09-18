import { createContext } from "react";
export const LogicContext = createContext()

const LogicContextProvider=({children})=>{
    const context="hii"


    return(
        <LogicContext.Provider value={context}>
            {children}
        </LogicContext.Provider>

    )
    
}