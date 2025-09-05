import { UseUserContext } from "../../hooks";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { state } = UseUserContext();

    if (!state?.user_email) {
        return <Navigate to={"/signin"} replace />;
    }
    return <Outlet />;
}

export { ProtectedRoute };
