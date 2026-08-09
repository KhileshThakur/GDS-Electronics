import {
    NavLink,
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    useSelector
} from "react-redux";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import {
    customerNavigation
} from "../../utils/navigation";
import Container from "../ui/Container";
import {
    SearchIcon,
    NavigationIcon,
    MenuIcon
} from "../../assets/icons/Icons";
/* =========================================
   View Toggle
========================================= */
const ViewToggle = ({
    isAdminView,
    onChange
}) => (
    <div className="
        inline-flex
        items-center
        p-0.5
        sm:p-1
        rounded-full
        bg-white/10
        border
        border-white/20
        shrink-0
    ">
        <button
            type="button"
            onClick={() =>
                onChange("customer")
            }
            className={`
                h-6
                sm:h-8
                min-w-[68px]
                sm:min-w-[96px]
                px-2
                sm:px-5
                inline-flex
                items-center
                justify-center
                rounded-full
                text-[9px]
                sm:text-xs
                font-semibold
                whitespace-nowrap
                transition-all
                duration-300
                ${!isAdminView
                    ? `
                            bg-white
                            text-[var(--sidebar)]
                            shadow-sm
                        `
                    : `
                            text-white/65
                            hover:text-white
                            hover:bg-white/10
                        `
                }
            `}
        >
            Customer
        </button>
        <button
            type="button"
            onClick={() =>
                onChange("admin")
            }
            className={`
                h-6
                sm:h-8
                min-w-[68px]
                sm:min-w-[96px]
                px-2
                sm:px-5
                inline-flex
                items-center
                justify-center
                rounded-full
                text-[9px]
                sm:text-xs
                font-semibold
                whitespace-nowrap
                transition-all
                duration-300
                ${isAdminView
                    ? `
                            bg-white
                            text-[var(--sidebar)]
                            shadow-sm
                        `
                    : `
                            text-white/65
                            hover:text-white
                            hover:bg-white/10
                        `
                }
            `}
        >
            Admin
        </button>
    </div>
);
/* =========================================
   Navbar
========================================= */
const Navbar = ({
    onMenuClick
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        user,
        isAuthenticated
    } = useSelector(
        (state) => state.auth
    );
    const isAdmin =
        user?.role === "admin";
    const isAdminView =
        location.pathname.startsWith(
            "/admin"
        );
    const handleViewChange = (
        view
    ) => {
        navigate(
            view === "admin"
                ? "/admin"
                : "/"
        );
    };
    /*
        Customer:
        mobile  -> 2 columns
        desktop -> 3 columns
        Admin:
        mobile  -> 3 columns
        desktop -> 3 columns
    */
    const headerGrid = isAdminView
        ? `
            grid-cols-[auto_minmax(0,1fr)_auto]
        `
        : `
            grid-cols-[minmax(0,1fr)_auto]
            lg:grid-cols-[auto_minmax(0,1fr)_auto]
        `;
    return (
        <header className="
            sticky
            top-0
            z-50
            w-full
            bg-white
            border-b
            border-[var(--border)]
        ">
            {/* =================================
                TOP BAR
            ================================= */}
            <div className="
                h-10
grid
                bg-[var(--sidebar)]
                text-white
            ">
                <Container>
                    <div className="
                        h-full
                        flex
                        items-center
                        justify-between
                        gap-4
                    ">
                        <span className="
                            min-w-0
                            text-[11px]
                            sm:text-xs
                            font-medium
                            text-white/90
                            truncate
                        ">
                            ⚡ Free shipping above ₹999
                        </span>
                        {isAuthenticated &&
                            isAdmin && (
                                <ViewToggle
                                    isAdminView={
                                        isAdminView
                                    }
                                    onChange={
                                        handleViewChange
                                    }
                                />
                            )}
                    </div>
                </Container>
            </div>
            {/* =================================
                MAIN HEADER
            ================================= */}
            <Container>
                <div
                    className={`
                        py-3
                        sm:py-4
                        grid
                        ${headerGrid}
                        items-center
                        gap-x-3
                        sm:gap-x-5
                        lg:gap-x-8
                        gap-y-3
                    `}
                >
                    {/* =================================
                        ADMIN MOBILE HAMBURGER
                    ================================= */}
                    {isAdminView && (
                        <div className="
                            row-start-1
                            col-start-1
                            lg:hidden
                            flex
                            items-center
                            justify-start
                        ">
                            <button
                                type="button"
                                onClick={onMenuClick}
                                aria-label="Open admin menu"
                                className="
                                    w-9
                                    h-9
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-[var(--text)]
                                    hover:bg-[var(--surface-hover)]
                                    hover:text-[var(--primary)]
                                    active:scale-95
                                    transition-all
                                    duration-200
                                "
                            >
                                <MenuIcon />
                            </button>
                        </div>
                    )}
                    {/* =================================
                        LOGO
                    ================================= */}
                    <Link
                        to={
                            isAdminView
                                ? "/admin"
                                : "/"
                        }
                        className={`
                            min-w-0
                            max-w-full
                            overflow-hidden
                            row-start-1
                            flex
                            items-center
                            justify-self-start
                            ${isAdminView
                                ? `
                                        col-start-2
                                        lg:col-start-1
                                    `
                                : `
                                        col-start-1
                                        lg:col-start-1
                                    `
                            }
                        `}
                    >
                        <Logo
                            size={45}
                        />
                    </Link>
                    {/* =================================
                        USER MENU
                    ================================= */}
                    <div className={`
                        shrink-0
                        row-start-1
                        justify-self-end
                        ${isAdminView
                            ? `
                                    col-start-3
                                `
                            : `
                                    col-start-2
                                    lg:col-start-3
                                `
                        }
                    `}>
                        <UserMenu />
                    </div>
                    {/* =================================
                        SEARCH
                    ================================= */}
                    <div className={`
                        min-w-0
                        w-full
                        row-start-2
                        col-span-full
                        flex
                        items-center
                        justify-center
                        lg:row-start-1
                        lg:col-start-2
                        lg:col-span-1
                    `}>
                        <div className="
                            h-11
                            w-full
                            lg:w-1/2
                            flex
                            items-center
                            overflow-hidden
                            rounded-full
                            bg-[var(--background)]
                            border
                            border-[var(--border)]
                            transition-all
                            duration-200
                            focus-within:border-[var(--primary)]
                            focus-within:ring-2
                            focus-within:ring-[var(--primary)]/10
                        ">
                            <input
                                type="text"
                                placeholder={
                                    isAdminView
                                        ? "Search products, orders..."
                                        : "Search products..."
                                }
                                className="
                                    flex-1
                                    min-w-0
                                    h-full
                                    bg-transparent
                                    text-sm
                                    text-[var(--text)]
                                    placeholder:text-[var(--text-light)]
                                    outline-none
                                    px-[15px]
                                    py-[5px]
                                "
                            />
                            <button
                                type="button"
                                className="
                                    h-full
                                    w-12
                                    sm:w-14
                                    shrink-0
                                    inline-flex
                                    items-center
                                    justify-center
                                    bg-[var(--primary)]
                                    text-white
                                    hover:bg-[var(--primary-dark)]
                                    transition-colors
                                    duration-200
                                "
                            >
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
            {/* =================================
                CUSTOMER NAVIGATION
            ================================= */}
            {!isAdminView && (
                <div className="
                    border-t
                    border-[var(--border)]
                ">
                    <Container className="!px-0">
                        <nav className="
                            h-14
                            flex
                            items-center
                            justify-center
                            gap-1
                            sm:gap-2
                            md:gap-3
                            overflow-x-auto
                        ">
                            {customerNavigation.map(
                                (item) => (
                                    <NavLink
                                        key={
                                            item.path
                                        }
                                        to={
                                            item.path
                                        }
                                        end={
                                            item.path === "/"
                                        }
                                        className={({
                                            isActive
                                        }) => `
                                            h-14
                                            min-w-[64px]
                                            sm:min-w-[105px]
                                            px-2
                                            sm:px-4
                                            inline-flex
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-1
                                            rounded-xl
                                            text-[10px]
                                            sm:text-sm
                                            font-medium
                                            leading-none
                                            whitespace-nowrap
                                            transition-all
                                            duration-200
                                            ${isActive
                                                ? `
                                                        bg-[var(--primary-soft)]
                                                        text-[var(--primary-dark)]
                                                        font-semibold
                                                    `
                                                : `
                                                        text-[var(--text)]
                                                        hover:bg-[var(--surface-hover)]
                                                        hover:text-[var(--primary)]
                                                    `
                                            }
                                        `}
                                    >
                                        <NavigationIcon
                                            type={
                                                item.icon
                                            }
                                        />
                                        <span>
                                            {item.label}
                                        </span>
                                    </NavLink>
                                )
                            )}
                        </nav>
                    </Container>
                </div>
            )}
        </header>
    );
};
export default Navbar;