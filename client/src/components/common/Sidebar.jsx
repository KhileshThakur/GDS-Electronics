import {
    NavLink
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
                        bg-black/50
                        backdrop-blur-[2px]
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
                    shrink-0
                    w-60

                    h-full

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
                    ease-out

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
                    shrink-0

                    min-h-16

                    px-5
                    py-4

                    flex
                    items-center

                    border-b
                    border-white/10
                ">

                    <div>

                        <p className="
                            mb-1

                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]

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
                    min-h-0

                    px-3
                    py-4

                    overflow-y-auto
                    overflow-x-hidden

                    scrollbar-thin
                    scrollbar-track-transparent
                    scrollbar-thumb-white/10
                    hover:scrollbar-thumb-white/20
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
                                    end={item.path === "/admin"}
                                    onClick={onClose}
                                    className={({ isActive }) => `
        group
        relative

        min-h-11
        w-full

        px-3.5

        flex
        items-center
        gap-3

        rounded-xl

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
                    hover:bg-white/5
                    hover:text-white
                `
                                        }
    `}
                                >

                                    {({ isActive }) => (

                                        <>

                                            {/* Active indicator */}

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

                    transition-opacity
                    duration-200

                    ${isActive
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                    }
                `}
                                            />


                                            {/* Icon */}

                                            <span className="
                flex
                h-5
                w-5
                shrink-0

                items-center
                justify-center

                text-current
            ">

                                                <NavigationIcon
                                                    type={item.icon}
                                                />

                                            </span>


                                            {/* Label */}

                                            <span className="
                min-w-0
                truncate
            ">
                                                {item.label}
                                            </span>

                                        </>

                                    )}

                                </NavLink>

                            )
                        )}

                    </div>

                </nav>


                {/* =================================
                    Sidebar Footer
                ================================= */}

                <div className="
                    shrink-0

                    px-4
                    py-4

                    border-t
                    border-white/10

                    bg-[var(--sidebar)]
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