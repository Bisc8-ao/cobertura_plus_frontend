import { InitialStaste } from "../initialState";

export const UserReducer = (state, action) => {
    switch (action.type) {
        case "user_active": {
            const { firstName, lastName, email, photo, token } = action.payload;

            if (token) {
                localStorage.setItem("accessToken", token);
            }

            return {
                ...state,
                user_firstName: firstName,
                user_lastName: lastName,
                user_email: email,
                user_photo: photo,
                user_token: token || "",
            };
        }

        case "user_desactive": {
            localStorage.removeItem("accessToken");
            return {
                ...InitialStaste,
            };
        }

        default:
            return state;
    }
};

