import { InitialStaste } from "../initialState";

export const UserReducer = (state, action) => {
    switch (action.type) {
        case "user_active": {
            const { name, email, photo } = action.payload;
            // console.log(action.payload);
            return {
                ...state,
                user_name: name,
                user_email: email,
                user_photo: photo,
            };
        }
        case "user_desactive": {
            return {
                ...InitialStaste,
            };
        }
        default:
            return state;
    }
};
