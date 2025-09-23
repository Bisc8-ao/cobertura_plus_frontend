const userStorage = localStorage.getItem("user");
const user = JSON.parse(userStorage) || {};

const InitialStaste = {
    user_id: null,
    user_name: user?.name || null,
    user_email: user?.email || null,
    user_photo: user?.photo || null,
};

export {InitialStaste}
