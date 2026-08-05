import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/services/auth.service";
import { clearUser } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast";

const UserMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(clearUser());
            toast.success("Logged out successfully");
            navigate("/login");
        } catch {
            toast.error("Logout failed");
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={() => navigate("/login")}>
                    Login
                </button>
            )}
        </div>
    );
};

export default UserMenu;

