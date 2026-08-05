import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/constants";
import Loader from "../components/common/Loader";

const GuestRoute = () => {
    const {
        initialized,
        isAuthenticated,
        user
    } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Loader />;
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to={user?.role === ROLES.ADMIN
                    ? "/admin"
                    : "/"}
                replace
            />
        );
    }
    return <Outlet />;
};

export default GuestRoute;