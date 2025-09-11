import { UseUserContext } from "../../hooks";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { state } = UseUserContext();

    if (!state?.user_token) {
        return <Navigate to={"/signin"} replace />;
    }
    return <Outlet />;
}

export { ProtectedRoute };
