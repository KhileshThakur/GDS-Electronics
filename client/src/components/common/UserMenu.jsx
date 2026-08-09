import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useNavigate
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";
import {
    logoutUser
} from "../../features/auth/services/auth.service";
import {
    clearUser
} from "../../redux/slices/authSlice";
import {
    LogoutIcon
} from "../../assets/icons/Icons";
const UserMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        isAuthenticated
    } = useSelector(
        (state) => state.auth
    );
    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(
                clearUser()
            );
            toast.success(
                "Logged out successfully"
            );
            navigate("/login");
        }
        catch {
            toast.error(
                "Logout failed"
            );
        }
    };
    /* =====================================
       Guest
    ===================================== */
    if (!isAuthenticated) {
        return (
            <div className="
                flex
                items-center
                gap-2
                sm:gap-3
            ">
                {/* Login */}
                <button
                    type="button"
                    onClick={() =>
                        navigate("/login")
                    }
                    className="
                        h-9
                        sm:h-10
                        px-4
                        sm:px-5
                        inline-flex
                        items-center
                        justify-center
                        rounded-[var(--radius-md)]
                        border
                        border-[var(--primary)]
                        bg-transparent
                        text-[var(--primary)]
                        text-xs
                        sm:text-sm
                        font-semibold
                        whitespace-nowrap
                        hover:bg-[var(--primary)]
                        hover:text-white
                        active:scale-[0.98]
                        transition-all
                        duration-200
                    "
                >
                    Login
                </button>
                {/* Register */}
                <button
                    type="button"
                    onClick={() =>
                        navigate("/register")
                    }
                    className="
                        h-9
                        sm:h-10
                        px-4
                        sm:px-5
                        inline-flex
                        items-center
                        justify-center
                        rounded-[var(--radius-md)]
                        bg-[var(--primary)]
                        text-white
                        text-xs
                        sm:text-sm
                        font-semibold
                        whitespace-nowrap
                        hover:bg-[var(--primary-dark)]
                        active:scale-[0.98]
                        transition-all
                        duration-200
                    "
                >
                    Register
                </button>
            </div>
        );
    }
    /* =====================================
       Authenticated
    ===================================== */
    return (
        <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="
                h-[25px]
                px-2
                sm:px-2.5
                mr-[5px]
                inline-flex
                items-center
                justify-center
                gap-1
                rounded-md
                bg-[var(--sidebar)]
                text-white
                text-[10px]
                font-semibold
                leading-none
                whitespace-nowrap
                hover:bg-[var(--primary-dark)]
                active:scale-[0.97]
                transition-all
                duration-200
            "
        >
            <span>
                Logout
            </span>
            <LogoutIcon />
        </button>
    );
};
export default UserMenu;