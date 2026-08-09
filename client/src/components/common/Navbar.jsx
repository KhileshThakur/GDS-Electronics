import {
    NavLink,
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import { useState } from "react";
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
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {

        e.preventDefault();

        const value = search.trim();

        if (!value) return;

        navigate(
            `/products?search=${encodeURIComponent(value)}`
        );

    };


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

    const clearSearch = () => {

        setSearch("");

        if (
            location.pathname === "/products"
        ) {
            navigate("/products", {
                replace: true
            });
        }

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

                    {/* =================================
    SEARCH
================================= */}

                    <form
                        onSubmit={handleSearch}
                        className="min-w-0 w-full col-span-full felx items-center justify-center lg:row-start-1 lg:col-start-2 lg:col-span-1"
                    >

                        <div className="
    relative
    w-full
">

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }

                                    if (
                                        e.key === "Escape" &&
                                        search
                                    ) {
                                        clearSearch();
                                    }

                                }}
                                placeholder="Search products..."
                                className="
            w-full
            h-10

            pl-4
            pr-20

            rounded-[var(--radius-md)]

            border
            border-[var(--border)]

            bg-[var(--surface)]
            text-[var(--text)]

            text-sm

            outline-none

            placeholder:text-[var(--text-muted)]

            focus:border-[var(--primary)]

            transition
        "
                            />

                            {/* Clear */}

                            {search && (

                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                    className="
                absolute
                right-11
                top-1/2
                -translate-y-1/2

                w-7
                h-7

                flex
                items-center
                justify-center

                rounded-full

                text-[var(--text-muted)]

                hover:bg-[var(--background)]
                hover:text-[var(--text)]

                transition
            "
                                >
                                    ×
                                </button>

                            )}

                            {/* Search */}

                            <button
                                type="button"
                                onClick={handleSearch}
                                aria-label="Search"
                                className="
        absolute
        right-1
        top-1/2
        -translate-y-1/2

        w-8
        h-8

        flex
        items-center
        justify-center

        rounded-[var(--radius-sm)]

        bg-[var(--primary)]
        text-white

        hover:bg-[var(--primary-dark)]

        transition
    "
                            >
                                <SearchIcon />
                            </button>

                        </div>

                    </form>


                </div>

            </Container>


            {/* =================================
                CUSTOMER NAVIGATION
            ================================= */}

            {
                !isAdminView && (

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

                )
            }

        </header >

    );

};


export default Navbar;