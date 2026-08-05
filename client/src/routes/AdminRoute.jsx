import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

const AdminRoute = () => {
    const {
        initialized,
        isAuthenticated,
        user
    } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Loader />;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AdminRoute;