import React, { useReducer } from "react";
import { UserContext } from "./userContext";
import { InitialStaste } from "../initialState/initialState";
import { UserReducer } from "../reducer";

function UserProvider({ children }) {
    const value = useReducer(UserReducer, InitialStaste);
    return (
        <React.Fragment>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </React.Fragment>
    );
}

export { UserProvider };
