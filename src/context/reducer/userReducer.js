import { InitialStaste } from "../initialState";

export const UserReducer = (state, action) => {
    switch (action.type) {
        case "user_active": {
            const { name, email, photo } = action.payload;
            const userStorage = { name, email, photo };

            localStorage.setItem("user", JSON.stringify(userStorage))

            return {
                ...state,
                user_name: name,
                user_email: email,
                user_photo: photo,
            };
        }
        case "user_desactive": {
            localStorage.removeItem("user")
            return {
                ...InitialStaste,
            };
        }
        default:
            return state;
    }
};
