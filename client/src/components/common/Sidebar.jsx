import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";


import { adminNavigation } from "../../utils/navigation";
import { NavigationIcon } from "../../assets/icons/Icons";
import Logo from "./Logo";

import { logoutUser } from "../../features/auth/services/auth.service";
import { clearUser } from "../../redux/slices/authSlice";
import ViewToggle from "./ViewToggle";

const Sidebar = ({
    isOpen,
    onClose
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logoutUser();

            dispatch(clearUser());

            toast.success("Logged out successfully");

            onClose?.();

            navigate("/", {
                replace: true
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to logout"
            );
        }
    };
    return (
        <>

            {/* MOBILE OVERLAY */}
            {isOpen && (
                <div
                    className="
                        fixed
                        inset-x-0
                        top-12
                        bottom-0
                        z-40

                        bg-black/50
                        backdrop-blur-[2px]

                        lg:hidden
                    "
                    onClick={onClose}
                />
            )}


            {/* SIDEBAR */}
            <aside
                className={`
                    shrink-0
                    w-60

                    flex
                    flex-col

                    bg-[var(--sidebar)]
                    text-white

                    border-r
                    border-white/5

                    fixed

                    top-12
                    bottom-0
                    left-0

                    z-50

                    transform
                    transition-transform
                    duration-300
                    ease-out

                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

                    lg:static
                    lg:h-full
                    lg:z-auto
                    lg:translate-x-0
                `}
            >

                {/* DESKTOP TOGGLE */}
                <div className="
                    hidden
                    lg:flex

                    shrink-0

                    h-14

                    items-center
                    justify-center

                    border-b
                    border-white/10
                ">
                    <ViewToggle />
                </div>


                {/* BRAND */}
                <div className="
                    shrink-0

                    px-5
                    py-5

                    flex
                    items-center
                    gap-3

                    border-b
                    border-white/10
                ">

                    <div className="
                        h-11
                        w-11
                        shrink-0

                        flex
                        items-center
                        justify-center

                        overflow-hidden
                    ">
                        <Logo size={40} />
                    </div>


                    <div className="min-w-0">

                        <p className="
                            truncate

                            text-[15px]
                            font-bold
                            leading-tight

                            text-white
                        ">
                            GDS Electronics
                        </p>

                        <div className="
                            mt-1

                            flex
                            items-center
                            gap-1.5
                        ">

                            <span className="
                                h-1.5
                                w-1.5
                                shrink-0

                                rounded-full

                                bg-[var(--secondary)]"
                            />

                            <span className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]

                                text-white/40
                            ">
                                Admin Panel
                            </span>

                        </div>

                    </div>

                </div>


                {/* NAVIGATION */}
                <nav className="
                    flex-1
                    min-h-0

                    px-3
                    py-5

                    overflow-y-auto
                    overflow-x-hidden

                    scrollbar-thin
                    scrollbar-track-transparent
                    scrollbar-thumb-white/10
                ">

                    <div className="
                        px-3
                        mb-3

                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]

                        text-white/30
                    ">
                        Management
                    </div>


                    <div className="
                        flex
                        flex-col
                        gap-1
                    ">

                        {adminNavigation.map((item) => (

                            <NavLink
                                key={item.path}

                                to={item.path}

                                end={
                                    item.path === "/admin"
                                }

                                onClick={onClose}

                                className={({ isActive }) => `
                                    group
                                    relative

                                    min-h-11
                                    w-full

                                    px-3

                                    flex
                                    items-center
                                    gap-3

                                    rounded-xl

                                    text-sm
                                    font-medium

                                    transition-colors
                                    duration-200

                                    ${isActive
                                        ? `
                                                bg-white/10
                                                text-white
                                            `
                                        : `
                                                text-white/60
                                                hover:bg-white/5
                                                hover:text-white
                                            `
                                    }
                                `}
                            >

                                {({ isActive }) => (
                                    <>

                                        {/* ACTIVE INDICATOR */}
                                        <span
                                            className={`
                                                absolute

                                                left-0
                                                top-1/2

                                                h-6
                                                w-[3px]

                                                -translate-y-1/2

                                                rounded-r-full

                                                bg-[var(--secondary)]

                                                ${isActive
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                }
                                            `}
                                        />


                                        {/* ICON */}
                                        <span
                                            className={`
                                                flex
                                                h-5
                                                w-5
                                                shrink-0

                                                items-center
                                                justify-center

                                                ${isActive
                                                    ? "text-[var(--secondary)]"
                                                    : "text-current"
                                                }
                                            `}
                                        >
                                            <NavigationIcon
                                                type={item.icon}
                                            />
                                        </span>


                                        {/* LABEL */}
                                        <span className="
                                            min-w-0
                                            truncate
                                        ">
                                            {item.label}
                                        </span>

                                    </>
                                )}

                            </NavLink>

                        ))}

                    </div>

                </nav>

                {/* LOGOUT */}
                <div className="
    shrink-0
    px-3
    pb-3
">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
            group
            relative

            min-h-11
            w-full
            px-3

            flex
            items-center
            gap-3

            rounded-xl

            text-sm
            font-medium

            text-red-300

            hover:bg-red-500/10
            hover:text-red-200

            transition-colors
            duration-200
        "
                    >
                        <span className="
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center
        ">
                            <NavigationIcon type="logout" />
                        </span>

                        <span>
                            Logout
                        </span>
                    </button>
                </div>
                {/* FOOTER */}
                <div className="
                    shrink-0

                    px-5
                    py-4

                    border-t
                    border-white/10
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                    ">

                        <div>

                            <p className="
                                text-xs
                                font-semibold
                                text-white/70
                            ">
                                GDS Electronics
                            </p>

                            <p className="
                                mt-0.5

                                text-[10px]
                                text-white/35
                            ">
                                Administration
                            </p>

                        </div>


                        <span className="
                            h-2
                            w-2

                            rounded-full

                            bg-emerald-400
                        " />

                    </div>

                </div>

            </aside>

        </>
    );
};

export default Sidebar;