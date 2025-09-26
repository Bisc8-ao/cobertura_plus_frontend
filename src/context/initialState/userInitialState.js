const userStorage = localStorage.getItem("user");
const user = JSON.parse(userStorage) || {};

const InitialStaste = {
    user_id: user?.id || null,
    user_name: user?.name || null,
    user_email: user?.email || null,
    user_photo: user?.photo || null,
    user_phone: user?.phone || null,
    user_role: user?.role || null,
    user_dateOfBirth: user.dateOfBirth
};

export {InitialStaste}
