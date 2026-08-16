import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";

import { useState } from "react";

import Logo from "./Logo";
import UserMenu from "./UserMenu";

import {
    customerNavigation
} from "../../utils/navigation";

import Container from "../ui/Container";

import {
    SearchIcon,
    NavigationIcon
} from "../../assets/icons/Icons";


const Navbar = () => {

    const [search, setSearch] =
        useState("");

    const navigate =
        useNavigate();


    const handleSearch = (e) => {

        e.preventDefault();

        const value =
            search.trim();

        if (!value) {
            navigate("/products");
            return;
        }

        navigate(
            `/products?search=${encodeURIComponent(value)}`
        );
    };


    const clearSearch = () => {
        setSearch("");
        navigate("/products");
    };


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


            {/* ================================
                MAIN HEADER
            ================================= */}

            <Container>

                <div className="
                    py-3
                    sm:py-4

                    grid

                    grid-cols-[auto_minmax(0,1fr)_auto]

                    items-center

                    gap-x-3
                    sm:gap-x-5
                    lg:gap-x-8

                    gap-y-3
                ">


                    {/* LOGO */}

                    <Link
                        to="/"
                        className="
                            min-w-0
                            max-w-full

                            overflow-hidden

                            flex
                            items-center

                            justify-self-start
                        "
                    >
                        <Logo size={45} />
                    </Link>


                    {/* SEARCH */}

                    <div className="
                        min-w-0
                        w-full

                        row-start-2
                        col-span-full

                        flex
                        items-center

                        lg:row-start-1
                        lg:col-start-2
                        lg:col-span-1
                    ">

                        <form
                            onSubmit={handleSearch}
                            className="
                                h-11
                                w-full

                                flex
                                items-center

                                overflow-hidden

                                rounded-full

                                bg-[var(--background)]

                                border
                                border-[var(--border)]

                                transition-all

                                focus-within:border-[var(--primary)]
                                focus-within:ring-2
                                focus-within:ring-[var(--primary)]/10
                            "
                        >

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search products..."
                                aria-label="Search products"
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


                            {search && (

                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                    className="
                                        w-10
                                        h-full
                                        shrink-0

                                        flex
                                        items-center
                                        justify-center

                                        text-[var(--text-light)]
                                        hover:text-[var(--text)]

                                        transition
                                    "
                                >
                                    ×
                                </button>

                            )}


                            <button
                                type="submit"
                                aria-label="Search products"
                                className="
                                    h-full
                                    w-12
                                    sm:w-14

                                    shrink-0

                                    flex
                                    items-center
                                    justify-center

                                    bg-[var(--primary)]
                                    text-white

                                    hover:bg-[var(--primary-dark)]

                                    transition-colors
                                "
                            >
                                <SearchIcon />
                            </button>

                        </form>

                    </div>


                    {/* USER MENU */}

                    <div className="
                        shrink-0

                        row-start-1
                        col-start-3

                        justify-self-end
                    ">
                        <UserMenu />
                    </div>

                </div>

            </Container>


            {/* ================================
                CUSTOMER NAVIGATION
            ================================= */}

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
                            item => (

                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/"}
                                    className={({ isActive }) => `
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

                                        ${
                                            isActive
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
                                        type={item.icon}
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

        </header>
    );
};


export default Navbar;