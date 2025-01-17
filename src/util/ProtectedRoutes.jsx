import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context";

function ProtectedRoutes() {
    const { user } = useStoreContext();

    return (
        user.uid ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;