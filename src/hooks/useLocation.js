import { useContext } from "react";
import { LocationContext } from "../context";

function useLocation() {
    return useContext(LocationContext);
}

export { useLocation };
