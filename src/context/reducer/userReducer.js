import { InitialStaste } from "../initialState";

export const UserReducer = (state, action) => {
    switch (action.type) {
        case "user_active": {
            const { name, email, photo, role, id, phone, dateOfBirth } =
                action.payload;
            const userStorage = { name, email, photo, role, id, phone, };

            localStorage.setItem("user", JSON.stringify(userStorage));

            return {
                ...state,
                user_name: name,
                user_email: email,
                user_photo: photo,
                user_role: role,
                user_phone: phone,
                user_id: id,
                user_dateOfBirth: dateOfBirth,
            };
        }
        case "user_desactive": {
            localStorage.removeItem("user");
            return {
                ...InitialStaste,
            };
        }
        default:
            return state;
    }
};
