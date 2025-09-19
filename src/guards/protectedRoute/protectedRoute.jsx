import { useUserContext } from "../../hooks";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute() {
    const { state } = useUserContext();
    // Validate JWT in storage
    const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
    const expStr = typeof window !== 'undefined' ? localStorage.getItem("auth_token_exp") : null;
    let isTokenValid = false;
    if (token) {
        try {
            if (expStr) {
                const expMs = Number(expStr);
                isTokenValid = !Number.isNaN(expMs) ? Date.now() < expMs : true;
            } else {
                const decoded = jwtDecode(token);
                const exp = decoded?.exp ? decoded.exp * 1000 : null;
                isTokenValid = exp ? Date.now() < exp : true;
            }
        } catch {
            isTokenValid = false;
        }
    }

    if (!state?.user_email || !isTokenValid) {
        return <Navigate to={"/signin"} replace />;
    }
    return <Outlet />;
}

export { ProtectedRoute };
