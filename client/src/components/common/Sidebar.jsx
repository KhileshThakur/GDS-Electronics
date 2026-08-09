import {
    NavLink,
    useLocation
} from "react-router-dom";
import {
    adminNavigation
} from "../../utils/navigation";
import {
    NavigationIcon
} from "../../assets/icons/Icons";
const Sidebar = ({
    isOpen,
    onClose
}) => {
    const location = useLocation();
    return (
        <>
            {/* =================================
                Mobile Overlay
            ================================= */}
            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        lg:hidden
                    "
                    onClick={onClose}
                />
            )}
            {/* =================================
                Sidebar
            ================================= */}
            <aside
                className={`
                    w-60
                    shrink-0
                    flex
                    flex-col
                    bg-[var(--sidebar)]
                    text-white
                    border-r
                    border-white/5
                    /* =========================
                       Mobile
                    ========================== */
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    transform
                    transition-transform
                    duration-300
                    ease-in-out
                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                    /* =========================
                       Desktop
                    ========================== */
                    lg:static
                    lg:z-auto
                    lg:translate-x-0
                `}
            >
                {/* =================================
                    Sidebar Header
                ================================= */}
                <div className="
                    min-h-16
                    px-5
                    flex
                    items-center
                    border-b
                    border-white/10
                ">
                    <div>
                        <p className="
                            mb-1
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-[var(--secondary)]
                        ">
                            Store
                        </p>
                        <h2 className="
                            text-base
                            font-semibold
                            leading-tight
                            text-white
                        ">
                            Admin Panel
                        </h2>
                    </div>
                </div>
                {/* =================================
                    Navigation
                ================================= */}
                <nav className="
                    flex-1
                    px-3
                    py-5
                    overflow-y-auto
                ">
                    <div className="
                        flex
                        flex-col
                        gap-1
                    ">
                        {adminNavigation.map(
                            (item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={
                                        item.path === "/admin"
                                    }
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            onClose();
                                        }
                                    }}
                                    className={({
                                        isActive
                                    }) => `
                                        group
                                        relative
                                        min-h-11
                                        w-full
                                        px-3.5
                                        flex
                                        items-center
                                        gap-3
                                        rounded-lg
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200
                                        ${isActive
                                            ? `
                                                    bg-white/10
                                                    text-white
                                                    shadow-sm
                                                `
                                            : `
                                                    text-white/60
                                                    hover:bg-[var(--secondary)]/10
                                                    hover:text-white
                                                `
                                        }
                                    `}
                                >
                                    {/* Active accent */}
                                    <span
                                        className={`
                                            absolute
                                            left-0
                                            top-1/2
                                            -translate-y-1/2
                                            w-[3px]
                                            h-6
                                            rounded-r-full
                                            bg-[var(--secondary)]
                                            transition-all
                                            duration-200
                                            ${location.pathname ===
                                                item.path
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-60"
                                            }
                                        `}
                                    />
                                    {/* Icon */}
                                    <span className="
                                        w-5
                                        h-5
                                        shrink-0
                                        flex
                                        items-center
                                        justify-center
                                        text-current
                                    ">
                                        <NavigationIcon
                                            type={
                                                item.icon
                                            }
                                        />
                                    </span>
                                    {/* Label */}
                                    <span className="
                                        min-w-0
                                        truncate
                                    ">
                                        {item.label}
                                    </span>
                                </NavLink>
                            )
                        )}
                    </div>
                </nav>
                {/* =================================
                    Sidebar Footer
                ================================= */}
                <div className="
                    px-4
                    py-4
                    border-t
                    border-white/10
                ">
                    <div className="
                        flex
                        flex-col
                        items-center
                        gap-1
                    ">
                        <span className="
                            text-xs
                            font-semibold
                            text-white/70
                        ">
                            GDS Electronics
                        </span>
                        <span className="
                            text-[10px]
                            text-white/35
                        ">
                            Admin Dashboard
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
};
export default Sidebar;