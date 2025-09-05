import { useContext } from "react";
import { UserContext } from "../context";
function UseUserContext() {
    const [state, dispatch] = useContext(UserContext);
    return {
        state,
        dispatch,
    };
}

export { UseUserContext };
