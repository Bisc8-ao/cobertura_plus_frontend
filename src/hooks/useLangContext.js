import { useContext } from "react";
import { LangContext } from "../context";

function useLangContext() {
     return useContext(LangContext);

    
}

export { useLangContext };
